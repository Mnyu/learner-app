import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { serialize, CookieSerializeOptions } from 'cookie';
import { UserResponse, loginUserPayload } from '@/types/user';
import { User } from '@/db/models/user';
import { connectDB } from '@/db/connect';
import { createJWT } from '@/lib/auth';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return login(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedInput = loginUserPayload.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new Error('INPUT VALIDATION');
  }
  const { email, password } = parsedInput.data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  const token = await createJWT({ userId: user._id.toString() });
  const response: UserResponse = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const cookie = serialize('token', token, { path: '/', httpOnly: true });

  res.setHeader('Set-Cookie', cookie);
  res.status(StatusCodes.OK).json(response);
};

export default handler;
