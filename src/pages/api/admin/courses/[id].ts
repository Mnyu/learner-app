import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { Course } from '@/db/models/course';
import { updateCoursePayload } from '@/types/course';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getCourse(req, res);
  } else if (req.method === 'PUT') {
    return updateCourse(req, res);
  } else if (req.method === 'DELETE') {
    return deleteCourse(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const getCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers.user;
  const { id: courseId } = req.query;
  const course = await Course.findOne({ _id: courseId, creator: userId });
  if (!course) {
    throw new Error(`No course exists with id: ${courseId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};

const updateCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers.user;
  const { id: courseId } = req.query;
  const parsedInput = updateCoursePayload.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new Error('Input validation failed');
  }
  const { title, description, price, isPublished } = { ...parsedInput.data };
  if (title === '' || description === '') {
    throw new Error(`Name or Description cannot be empty`);
  }
  if (price != undefined && price === 0) {
    throw new Error(`Price cannot be 0`);
  }
  const course = await Course.findOneAndUpdate(
    { _id: courseId, creator: userId },
    parsedInput.data,
    { new: true, runValidators: true }
  );
  if (!course) {
    throw new Error(`No course exists with id: ${courseId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};

const deleteCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers.user;
  const { id: courseId } = req.query;
  const course = await Course.findOneAndRemove({
    _id: courseId,
    creator: userId,
  });
  if (!course) {
    throw new Error(`No course exists with id: ${courseId}`);
  }
  res.status(StatusCodes.OK).json({});
};

export default handler;
