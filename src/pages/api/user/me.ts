import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/db/models/user';
import { connectDB } from '@/db/connect';
import { UserResponse } from '@/types/user';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getUser(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers.user;
  const user = await User.findOne({ _id: userId });
  const response: UserResponse = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  res.status(StatusCodes.OK).json(response);
};

export default handler;
