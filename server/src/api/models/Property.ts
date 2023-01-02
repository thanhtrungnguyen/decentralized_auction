import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IProperty {
  name: string;
  description: string;
  status: string;
  depositAmount: number;
  priceStep: number;
  startBid: number;
  placeViewProperty: string;
  startViewPropertyTime: Date;
  endViewPropertyTime: Date;
  idCategory: string;
  idUser: string;
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema: Schema = new Schema(
  {
    propertyId: { type: String, required: true, unique: true, default: crypto.randomUUID() },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    depositAmount: { type: Number, required: true },
    priceStep: { type: Number, required: true },
    startBid: { type: Number, required: true },
    placeViewProperty: { type: String, required: true },
    startViewPropertyTime: { type: Date, required: true },
    endViewPropertyTime: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    idUser: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Property = mongoose.model<IPropertyDocument>('Property', propertySchema, 'Property');

export default Property;
