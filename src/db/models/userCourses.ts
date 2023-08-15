import mongoose from 'mongoose';

const UserCoursesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

export const UserCourses = mongoose.model('UserCourses', UserCoursesSchema);
