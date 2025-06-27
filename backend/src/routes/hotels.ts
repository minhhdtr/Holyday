import { Request, Response, Router } from 'express';
import { param, validationResult } from 'express-validator';
import Hotel from '../models/hotel';
import { BookingType, HotelSearchResponse } from '../shared/type';
import Stripe from 'stripe';
import verifyToken from '../middleware/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const router = Router();

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, 'i') },
      { country: new RegExp(queryParams.destination, 'i') },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOptions) {
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 };
        break;
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 };
        break;
      case 'starRatingDesc':
        sortOptions = { starRating: -1 };
        break;
      case 'starRatingAsc':
        sortOptions = { starRating: 1 };
        break;
    }

    const pageSize = 10;
    const pageNumber = parseInt(req.query.page as string) || 1;
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total: total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get(
  '/:id',
  [param('id').notEmpty().withMessage('Hotel ID is required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params.id.toString();
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

router.post('/:hotelId/booking/payment-intent', verifyToken, async (req: Request, res: Response) => {
  const { numberOfNights } = req.body;
  const hotelId = req.params.hotelId;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(400).json({ message: 'Hotel not found' });
  }
  const amount = hotel.pricePerNight * numberOfNights;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    metadata: {
      hotelId: hotelId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: 'Failed to create payment intent' });
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    amount: amount,
  };
  res.json(response);
});

router.post('/:hotelId/bookings', verifyToken, async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

    if (!paymentIntent) {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    if (paymentIntent.metadata.hotelId !== req.params.hotelId) {
      return res.status(400).json({ message: 'Hotel ID mismatch' });
    }
    if (paymentIntent.metadata.userId !== req.userId) {
      return res.status(400).json({ message: 'User ID mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: `Payment not successful: ${paymentIntent.status}` });
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
      },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    await hotel.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
