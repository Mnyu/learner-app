import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    minLength: 1,
    maxLength: 2000,
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide creator'],
  },
});

export const Course =
  mongoose.models.Course || mongoose.model('Course', CourseSchema);
