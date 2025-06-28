import { Request, Response, Router } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/type';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Hotel name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('facilities').notEmpty().isArray().withMessage('Facilities are required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();

    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/:id', verifyToken, upload.array('imageFiles'), async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, updatedHotel, { new: true });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    const file = req.files as Express.Multer.File[];
    const uploadedImageUrl = await uploadImages(file);
    hotel.imageUrls = [...(updatedHotel.imageUrls || []), ...uploadedImageUrl];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
