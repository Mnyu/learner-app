import { Types } from 'mongoose';
import { type } from 'os';
import { z } from 'zod';

export const registerUserPayload = z.object({
  name: z.string().min(1).max(50).nonempty(),
  email: z.string().email().max(50).nonempty(),
  password: z.string().min(1).max(20).nonempty(),
  role: z.enum(['admin', 'user']).optional(),
});

export const loginUserPayload = z.object({
  email: z.string().email().max(50).nonempty(),
  password: z.string().min(1).max(20).nonempty(),
});

export interface UserModelInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  createJWT: (jwtSecret: string, jwtLifeTime: string) => string;
  comparePassword: (candidatePassword: string) => boolean;
}

export type UserResponse = {
  name: string;
  email: string;
  role: string;
};

export type UserJwtPayload = {
  userId: string;
};
