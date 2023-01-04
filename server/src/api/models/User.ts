import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { defaultConfig } from '../../config/default';

export interface IUser {
  username: string;
  password: string;
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
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true, default: 'active' },
    role: { type: String, required: true, enum: ['admin', 'manager', 'seller', 'bidder'] }
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre('save', async function (next) {
  let user = this as IUserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(defaultConfig.jwt.saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model<IUserDocument>('User', userSchema, 'User');

export default User;
