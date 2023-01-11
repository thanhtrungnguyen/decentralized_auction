import mongoose, { Document, Schema } from 'mongoose';
import { IUserDocument } from './User';

export interface IInformationOperator {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  user: IUserDocument['_id'];
}

export interface IInformationOperatorDocument extends IInformationOperator, Document {
  createdAt: Date;
  updatedAt: Date;
}

const informationOperatorSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const InformationOperator = mongoose.model<IInformationOperatorDocument>('InformationOperator', informationOperatorSchema, 'InformationOperator');

export default InformationOperator;
