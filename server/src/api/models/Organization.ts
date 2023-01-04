import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { IUserDocument } from './User';

export interface IOrganization {
  name: string;
  taxCode: string;
  taxCodeGrantedDate: string;
  taxCodeGrantedPlace: string;
  address: string;
  user: IUserDocument['_id'];
}

export interface IOrganizationDocument extends IOrganization, Document {
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    taxCodeGrantedDate: { type: String, required: true },
    taxCodeGrantedPlace: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const Organization = mongoose.model<IOrganizationDocument>('Organization', organizationSchema, 'Organization');

export default Organization;
