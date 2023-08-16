import CourseDetail from '@/components/CourseDetail';
import { useSetRecoilState } from 'recoil';
import { courseState } from '@/store/atoms/courseAtom';

const AddCourse = () => {
  const setCourseState = useSetRecoilState(courseState);
  setCourseState({ course: null });
  return <CourseDetail />;
};
export default AddCourse;
