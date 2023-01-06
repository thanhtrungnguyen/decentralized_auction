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
    name: { type: String, required: true },
    startRegistrationTime: { type: String, required: true },
    endRegistrationTime: { type: String, required: true },
    startAuctionTime: { type: String, required: true },
    endAuctionTime: { type: String, required: true },
    duePaymentTime: { type: String, required: true },
    registrationFee: { type: String, required: true },
    status: { type: String, required: true },
    property: { type: Schema.Types.ObjectId, required: true, ref: 'Property' }
  },
  { timestamps: true, versionKey: false }
);

const Auction = mongoose.model<IAuctionDocument>('Auction', auctionSchema, 'Auction');

export default Auction;
