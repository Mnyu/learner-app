import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { Course } from '@/db/models/course';
import { createCoursePayload } from '@/types/course';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getCourses(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getCourses = async (req: NextApiRequest, res: NextApiResponse) => {
  const courses = await Course.find({});
  return res.status(StatusCodes.OK).json({ courses });
};

export default handler;
