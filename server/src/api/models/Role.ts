import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IRole {
  name: string;
}

export interface IRoleDocument extends IRole, Document {
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema: Schema = new Schema(
  {
    roleId: { type: String, required: true, unique: true, default: crypto.randomUUID() },
    name: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Role = mongoose.model<IRoleDocument>('Role', roleSchema, 'Role');

export default Role;
