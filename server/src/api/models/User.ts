import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { defaultConfig } from '../../config/constant-variables';

export interface IUser {
  email: string;
  password: string;
  verificationCode: string;
  passwordResetCode: string | null;
  verified: boolean;
  status: string;
  role: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationCode: { type: String, default: crypto.randomUUID() },
    passwordResetCode: { type: String || null },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, enum: ['admin', 'manager', 'seller', 'bidder'] }
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(defaultConfig.jwt.saltWorkFactor);
  this.password = await bcrypt.hashSync(this.password, salt);
  return next();
});

// https://stackoverflow.com/questions/62066921/hashed-password-update-with-mongoose-express
// userSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     const p = this.get
//     if (this._update.password) {
//       const hashed = await bcrypt.hash(this._update.password, 10);
//       this._update.password = hashed;
//     }
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model<IUserDocument>('User', userSchema, 'User');

export default User;
