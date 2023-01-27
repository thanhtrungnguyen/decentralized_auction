import mongoose, { Document, Schema } from 'mongoose';
import { IAuctionDocument } from './Auction';
import { IUserDocument } from './User';

export interface IAuctionRegistration {
  auction: IAuctionDocument['_id'];
  user: IUserDocument['_id'];
  walletAddress: string;
}

export interface IAuctionRegistrationDocument extends IAuctionRegistration, Document {
  createdAt: Date;
  updatedAt: Date;
}

const auctionRegistrationSchema: Schema = new Schema(
  {
    auction: { type: Schema.Types.ObjectId, required: true, ref: 'Auction' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    walletAddress: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const AuctionRegistration = mongoose.model<IAuctionRegistrationDocument>('AuctionRegistration', auctionRegistrationSchema, 'AuctionRegistration');

export default AuctionRegistration;
