import { Course } from '@/types/course';
import { atom } from 'recoil';

export const courseState = atom<{ course: null | Course }>({
  key: 'courseState',
  default: {
    course: null,
  },
});
