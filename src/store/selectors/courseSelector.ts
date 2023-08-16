import { selector } from 'recoil';
import { courseState } from '../atoms/courseAtom';

export const courseSelector = selector({
  key: 'courseSelector',
  get: ({ get }) => {
    const course = get(courseState);
    return course.course;
  },
});
