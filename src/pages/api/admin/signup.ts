import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { UserResponse, registerUserPayload } from '@/types/user';
import { User } from '@/db/models/user';
import { connectDB } from '@/db/connect';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createUser(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  const parsedInput = registerUserPayload.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new Error('INPUT VALIDATION');
  }
  const user = await User.create({ ...parsedInput.data });

  const response: UserResponse = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  res.status(StatusCodes.CREATED).json(response);
};

export default handler;
