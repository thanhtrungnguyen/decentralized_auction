import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { IUserDocument } from './User';

export interface IIndividual {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  province: string;
  district: string;
  districtId: string;
  cityId: string;
  city: string;
  wards: string;
  wardsId: string;
  address: string;
  cardNumber: string;
  cardGrantedDate: string;
  cardGrantedPlace: string;
  frontSideImage: string;
  backSideImage: string;
  user: IUserDocument['_id'];
}

export interface IIndividualDocument extends IIndividual, Document {
  createdAt: Date;
  updatedAt: Date;
}

const individualSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    city: { type: String, required: true },
    cityId: { type: String, required: true },
    province: { type: String },
    district: { type: String, required: true },
    districtId: { type: String, required: true },
    wards: { type: String, required: true },
    wardsId: { type: String, required: true },
    address: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cardGrantedDate: { type: String, required: true },
    cardGrantedPlace: { type: String, required: true },
    frontSideImage: { type: String },
    backSideImage: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const Individual = mongoose.model<IIndividualDocument>('Individual', individualSchema, 'Individual');

export default Individual;
