import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { Course } from '@/db/models/course';
import { createCoursePayload } from '@/types/course';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getCourses(req, res);
  } else if (req.method === 'POST') {
    return createCourse(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getCourses = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers.user;
  const courses = await Course.find({ creator: userId });
  return res.status(StatusCodes.OK).json({ courses });
};

const createCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedInput = createCoursePayload.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new Error('Input validation failed');
  }
  const userId = req.headers.user;
  const coursePayload = { ...parsedInput.data, creator: userId };
  const course = await Course.create(coursePayload);
  res.status(StatusCodes.CREATED).json({ course });
};

export default handler;
