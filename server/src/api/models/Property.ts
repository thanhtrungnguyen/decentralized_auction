import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { IUserDocument } from './User';
import { ICategoryDocument } from './Category';

export interface IProperty {
  name: string;
  description: string;
  status: string;
  depositAmount: string;
  priceStep: string;
  startBid: string;
  placeViewProperty: string;
  startViewPropertyTime: Date;
  endViewPropertyTime: Date;
  mediaUrl: Array<string>;
  category: ICategoryDocument['_id'];
  user: IUserDocument['_id'];
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    depositAmount: { type: String, required: true },
    priceStep: { type: String, required: true },
    startBid: { type: String, required: true },
    placeViewProperty: { type: String, required: true },
    startViewPropertyTime: { type: Date, required: true },
    endViewPropertyTime: { type: Date, required: true },
    mediaUrl: { type: Array(String), required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const Property = mongoose.model<IPropertyDocument>('Property', propertySchema, 'Property');

export default Property;
