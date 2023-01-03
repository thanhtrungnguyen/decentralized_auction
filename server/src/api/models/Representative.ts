import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IRepresentative {
  individual: string;
  organization: string;
  position: string;
}

export interface IRepresentativeDocument extends IRepresentative, Document {
  createdAt: Date;
  updatedAt: Date;
}

const representativeSchema: Schema = new Schema(
  {
    individual: { type: Schema.Types.ObjectId, required: true, ref: 'Individual' },
    organization: { type: Schema.Types.ObjectId, required: true, ref: 'Organization' },
    position: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Representative = mongoose.model<IRepresentativeDocument>('Representative', representativeSchema);

export default Representative;
