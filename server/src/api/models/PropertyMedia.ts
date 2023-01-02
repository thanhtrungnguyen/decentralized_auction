import mongoose, { Document, Schema } from 'mongoose';

export interface IPropertyMedia {
  property: string;
  mediaUrl: string;
}

export interface IPropertyMediaDocument extends IPropertyMedia, Document {
  createdAt: Date;
  updatedAt: Date;
}

const propertyMediaSchema: Schema = new Schema(
  {
    property: { type: Schema.Types.ObjectId, required: true },
    mediaUrl: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const PropertyMedia = mongoose.model<IPropertyMediaDocument>('PropertyMedia', propertyMediaSchema, 'PropertyMedia');

export default PropertyMedia;
