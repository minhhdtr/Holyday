import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../shared/type';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;

// import mongoose, { Document, Model, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends Document {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
// }

// const userSchema = new Schema<IUser>({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true }
// });

// userSchema.pre<IUser>('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

// export default User;