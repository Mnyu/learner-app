import { z } from 'zod';

export const createCoursePayload = z.object({
  title: z.string().min(3).max(50).nonempty(),
  description: z.string().min(1).max(2000).nonempty(),
  image: z.string().max(200).default(''),
  price: z.number().positive(),
  isPublished: z.boolean().default(true),
});

export const updateCoursePayload = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().min(1).max(2000).optional(),
  image: z.string().max(200).default('').optional(),
  price: z.number().positive().optional(),
  isPublished: z.boolean().default(true).optional(),
});

export type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
  image: string;
};

export type Courses = {
  courses: Course[];
};
