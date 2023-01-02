import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  status: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model<IUserDocument>('User', userSchema, 'User');

export default User;
