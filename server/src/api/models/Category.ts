import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface ICategory {
  name: string;
  status: boolean;
}

export interface ICategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: true }
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model<ICategoryDocument>('Category', categorySchema, 'Category');

export default Category;
