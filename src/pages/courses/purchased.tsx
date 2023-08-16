import axios from 'axios';
import { CoursesProps } from '@/types/course';
import CoursesList from '@/components/Courses';
import { GetServerSidePropsContext } from 'next';
import { APP_URL, APP_URL_SERVER_SIDE } from '@/config';

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
  const coursesProps = {
    props: {
      courses: [],
    },
  };
  try {
    const cookies = context.req.headers.cookie;
    const response = await axios.get(
      `${APP_URL_SERVER_SIDE}/api/courses/purchased`,
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    coursesProps.props.courses = response.data.courses;
  } catch (error) {
    //console.error(error);
  }
  return coursesProps;
}
