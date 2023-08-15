import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/db/connect';
import { Course } from '@/db/models/course';
import { UserCourses } from '@/db/models/userCourses';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getCourse(req, res);
  } else if (req.method === 'POST') {
    return purchaseCourse(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const purchaseCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: courseId } = req.query;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error(`No course exists with id: ${courseId}`);
  }
  const userId = req.headers.user;
  let userCourses = await UserCourses.findOne({ user: userId });
  if (userCourses) {
    userCourses.purchasedCourses.push(course._id);
    await userCourses.save();
  } else {
    userCourses = await UserCourses.create({
      user: userId,
      purchasedCourses: [course._id],
    });
  }
  res.status(StatusCodes.OK).json(userCourses.purchasedCourses);
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

export default handler;
