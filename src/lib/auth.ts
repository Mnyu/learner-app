import type { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { UserJwtPayload } from '@/types/user';

export const createJWT = async (payload: UserJwtPayload) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new Error('Unable to create JWT.');
  }
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_LIFETIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyJWT = async (req: NextRequest) => {
  //TODO : Error handling here
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Missing user token');
  }
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error('Token has expired.');
  }
};
