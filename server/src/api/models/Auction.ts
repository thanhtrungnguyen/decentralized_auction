import mongoose, { Document, Schema } from 'mongoose';
import { IPropertyDocument } from './Property';

export interface IAuction {
  name: string;
  startRegistrationTime: string;
  endRegistrationTime: string;
  startAuctionTime: string;
  endAuctionTime: string;
  duePaymentTime: string;
  registrationFee: string;
  status: string;
  property: IPropertyDocument['_id'];
}

export interface IAuctionDocument extends IAuction, Document {
  createdAt: Date;
  updatedAt: Date;
}

const auctionSchema: Schema = new Schema(
  {
    name: { type: String },
    startRegistrationTime: { type: String },
    endRegistrationTime: { type: String },
    startAuctionTime: { type: String },
    endAuctionTime: { type: String },
    duePaymentTime: { type: String },
    registrationFee: { type: String },
    status: { type: String, required: true },
    property: { type: Schema.Types.ObjectId, required: true, ref: 'Property' }
  },
  { timestamps: true, versionKey: false }
);

const Auction = mongoose.model<IAuctionDocument>('Auction', auctionSchema, 'Auction');

export default Auction;
