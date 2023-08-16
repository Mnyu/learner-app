import axios from 'axios';
import { CoursesProps } from '@/types/course';
import CoursesList from '@/components/Courses';
import { GetServerSidePropsContext } from 'next';

const created = ({ courses }: CoursesProps) => {
  return (
    <CoursesList courses={courses} title='My Created Courses' mode='edit' />
  );
};
export default created;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const DOMAIN = process.env.DOMAIN;
  const coursesProps = {
    props: {
      courses: [],
    },
  };
  try {
    const cookies = context.req.headers.cookie;
    const response = await axios.get(`${DOMAIN}/api/courses/`, {
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
