import axios from 'axios';
import { CoursesProps } from '@/types/course';
import CoursesList from '@/components/Courses';
import { GetServerSidePropsContext } from 'next';

const purchased = ({ courses }: CoursesProps) => {
  return (
    <CoursesList
      courses={courses}
      title='My Purchased Courses'
      mode='purchased'
    />
  );
};
export default purchased;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const DOMAIN = process.env.DOMAIN;
  const coursesProps = {
    props: {
      courses: [],
    },
  };
  try {
    const cookies = context.req.headers.cookie;
    const response = await axios.get(`${DOMAIN}/api/courses/purchased`, {
      headers: {
        Cookie: cookies,
      },
    });
    coursesProps.props.courses = response.data.courses;
  } catch (error) {
    //console.error(error);
  }
  return coursesProps;
}
