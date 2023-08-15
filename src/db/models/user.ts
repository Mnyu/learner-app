import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserModelInterface } from '@/types/user';

const UserSchema = new mongoose.Schema<UserModelInterface>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true, // creates a unique index
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 1,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role not supported',
    },
    default: 'user',
  },
});

// Mongoose middleware
UserSchema.pre('save', async function () {
  //hashing
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Mongoose schema instance methods
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User =
  mongoose.models.User ||
  mongoose.model<UserModelInterface>('User', UserSchema);
