import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', async(req: Request, res: Response) => {
  // res.send('Hello World!');
  res.json({message: 'Hello World!'});
});

app.listen(7000, () => {
  console.log('Server is running on http://localhost:7000');
});