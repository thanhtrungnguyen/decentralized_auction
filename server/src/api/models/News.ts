import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface INews {
  title: string;
  description: string;
  status: string;
}

export interface INewsDocument extends INews, Document {
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema = new Schema(
  {
    newsId: { type: String, required: true, unique: true, default: crypto.randomUUID() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const News = mongoose.model<INewsDocument>('News', newsSchema, 'News');

export default News;
