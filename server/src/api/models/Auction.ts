import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { IUserDocument } from './User';

export interface IAuction {
  name: string;
  startRegistrationTime: number;
  endRegistrationTime: number;
  startAuctionTime: number;
  endAuctionTime: number;
  duePaymentTime: number;
  registrationFee: number;
  depositAmount: Date;
  startBid: Date;
  priceStep: Date;
  status: string;
  user: IUserDocument['_id'];
}

export interface IAuctionDocument extends IAuction, Document {
  createdAt: Date;
  updatedAt: Date;
}

const auctionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    depositAmount: { type: Number, required: true },
    priceStep: { type: Number, required: true },
    startBid: { type: Number, required: true },
    placeViewAuction: { type: String, required: true },
    startViewAuctionTime: { type: Date, required: true },
    endViewAuctionTime: { type: Date, required: true },
    idUser: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Auction = mongoose.model<IAuctionDocument>('Auction', auctionSchema, 'Auction');

export default Auction;
