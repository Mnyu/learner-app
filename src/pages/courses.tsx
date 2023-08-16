import CoursesList from '@/components/Courses';
import { APP_URL, APP_URL_SERVER_SIDE } from '@/config';
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
    const response = await axios.get(`${APP_URL_SERVER_SIDE}/api/courses/all`);
    coursesProps.props.courses = response.data.courses;
  } catch (error) {
    //console.error(error);
  }
  return coursesProps;
}
