import { Request, Response, Router } from 'express';
import verifyToken from '../middleware/auth';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/type';

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const result = hotels.map((hotel) => {
      const booking = hotel.bookings.filter((booking) => booking.userId === req.userId);

      const hotelWithUserBooking: HotelType = {
        ...hotel.toObject(),
        bookings: booking,
      };

      return hotelWithUserBooking;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;