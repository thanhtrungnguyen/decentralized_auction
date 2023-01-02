import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IIndividual {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  province: string;
  district: string;
  wards: string;
  address: string;
  cardNumber: string;
  cardGrantedDate: string;
  cardGrantedPlace: string;
  frontSideImage: string;
  backSideImage: string;
  user: string;
}

export interface IIndividualDocument extends IIndividual, Document {
  createdAt: Date;
  updatedAt: Date;
}

const individualSchema: Schema = new Schema(
  {
    individualId: { type: String, required: true, unique: true, default: crypto.randomUUID() },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    wards: { type: String, required: true },
    address: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cardGrantedDate: { type: String, required: true },
    cardGrantedPlace: { type: String, required: true },
    frontSideImage: { type: String, required: true },
    backSideImage: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const Individual = mongoose.model<IIndividualDocument>('Individual', individualSchema, 'Individual');

export default Individual;
