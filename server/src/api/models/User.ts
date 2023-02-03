import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { defaultConfig } from '../../config/constant-variables';

export interface IUser {
  username: string;
  password: string;
  verificationCode: string;
  passwordResetCode: string | null;
  verified: boolean;
  status: string;
  type: string;
  role: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationCode: { type: String, default: crypto.randomUUID() },
    passwordResetCode: { type: String || null, default: null },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, required: true, default: true },
    type: { type: String, required: true, enum: ['individual', 'organization', 'operator'] },
    role: { type: String, required: true, enum: ['admin', 'manager', 'seller', 'bidder'] }
  },
  { timestamps: true, versionKey: false }
);

export const privateFields = ['password', 'verificationCode', 'passwordResetCode', 'verified', '_v', 'createdAt', 'updatedAt'];

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(defaultConfig.jwt.saltWorkFactor);
  this.password = await bcrypt.hashSync(this.password, salt);
  return next();
});

// https://stackoverflow.com/questions/62066921/hashed-password-update-with-mongoose-express
userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    let data = this as any;
    if (data._update.password) {
      const salt = await bcrypt.genSalt(defaultConfig.jwt.saltWorkFactor);
      const hashed = await bcrypt.hash(data._update.password, salt);
      data._update.password = hashed;
    }
    next();
  } catch (err) {
    return next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model<IUserDocument>('User', userSchema, 'User');

export default User;
