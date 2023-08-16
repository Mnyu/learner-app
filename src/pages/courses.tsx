import CoursesList from '@/components/Courses';
import { NEXT_URL } from '@/config';
import { CoursesProps } from '@/types/course';
import axios from 'axios';

const courses = ({ courses }: CoursesProps) => {
  return <CoursesList courses={courses} title='Courses' mode='view' />;
};

export default courses;

export async function getServerSideProps() {
  const coursesProps = {
    props: {
      courses: [],
    },
  };
  try {
    const response = await axios.get(`${NEXT_URL}/api/courses/all`);
    coursesProps.props.courses = response.data.courses;
  } catch (error) {
    //console.error(error);
  }
  return coursesProps;
}
