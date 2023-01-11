import mongoose, { Document, Schema } from 'mongoose';

import { IIndividualDocument } from './Individual';

export interface IOrganization {
  name: string;
  taxCode: string;
  taxCodeGrantedDate: string;
  taxCodeGrantedPlace: string;
  addressOrganization: string;
  individual: IIndividualDocument['_id'];
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
    addressOrganization: { type: String, required: true },
    individual: { type: Schema.Types.ObjectId, required: true, ref: 'Individual' }
  },
  { timestamps: true, versionKey: false }
);

const Organization = mongoose.model<IOrganizationDocument>('Organization', organizationSchema, 'Organization');

export default Organization;
