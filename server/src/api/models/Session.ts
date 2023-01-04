import { boolean } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { IUserDocument } from './User';

export interface ISessionDocument extends Document {
  user: IUserDocument['_id'];
  valid: boolean;
  createAt: Date;
  updateAt: Date;
}

const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Session = mongoose.model<ISessionDocument>('Session', sessionSchema);

export default Session;
