import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { UserCourses } from '@/db/models/userCourses';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getAllPurchasedCourses(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getAllPurchasedCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = req.headers.user;
  const userCourses = await UserCourses.findOne({ user: userId }).populate(
    'purchasedCourses'
  );
  const courses =
    userCourses && userCourses.purchasedCourses
      ? userCourses.purchasedCourses
      : [];
  return res.status(StatusCodes.OK).json({ courses });
};

export default handler;
