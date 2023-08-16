import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { Course } from '@/db/models/course';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getAllPublishedCourses(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getAllPublishedCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const courses = await Course.find({ isPublished: true });
  return res.status(StatusCodes.OK).json({ courses });
};

export default handler;
