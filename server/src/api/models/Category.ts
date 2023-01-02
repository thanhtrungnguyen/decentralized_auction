import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface ICategory {
  name: string;
  status: string;
}

export interface ICategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema = new Schema(
  {
    categoryId: { type: String, required: true, unique: true, default: crypto.randomUUID() },
    name: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model<ICategoryDocument>('Category', categorySchema, 'Category');

export default Category;
