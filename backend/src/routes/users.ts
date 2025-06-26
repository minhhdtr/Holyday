import express, { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import jst from 'jsonwebtoken';
import User from '../models/user';
import verifyToken from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('firstName', 'First name is required').isString(),
    check('lastName', 'Last name is required').isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User(req.body);
      await user.save();

      const token = jst.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1y' });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 31536000000,
      });

      return res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
);

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default router;
