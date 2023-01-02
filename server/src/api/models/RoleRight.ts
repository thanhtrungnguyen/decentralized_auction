import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IRoleRight {
  user: string;
  role: string;
}

export interface IRoleRightDocument extends IRoleRight, Document {
  createdAt: Date;
  updatedAt: Date;
}

const roleRightSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    role: { type: Schema.Types.ObjectId, required: true, ref: 'Role' }
  },
  { timestamps: true, versionKey: false }
);

const RoleRight = mongoose.model<IRoleRightDocument>('RoleRight', roleRightSchema, 'RoleRight');

export default RoleRight;
