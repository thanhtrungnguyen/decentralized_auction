import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty {
  name: string;
  // description: string;
  // status: string;
  // depositAmount: number;
  // priceStep: number;
  // startBid: number;
  // placeViewProperty: string;
  // startViewPropertyTime: Date;
  // endViewPropertyTime: Date;
  // idUser: string;
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema: Schema = new Schema(
  {
    propertyId: { type: String, required: true, unique: false, default: 'das' },
    name: { type: String, required: true }
    // description: { type: String, required: true },
    // status: { type: String, required: true },
    // depositAmount: { type: Number, required: true },
    // priceStep: { type: Number, required: true },
    // startBid: { type: Number, required: true },
    // placeViewProperty: { type: String, required: true },
    // startViewPropertyTime: { type: Date, required: true },
    // endViewPropertyTime: { type: Date, required: true },
    // idUser: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Property = mongoose.model<IPropertyDocument>('Property', propertySchema);

export default Property;
