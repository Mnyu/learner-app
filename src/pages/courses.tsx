import CoursesList from '@/components/Courses';
import { NEXT_URL } from '@/config';
import { Courses } from '@/types/course';
import axios from 'axios';

const courses = ({ courses }: Courses) => {
  return <CoursesList courses={courses} />;
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
