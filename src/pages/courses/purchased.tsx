import { NEXT_URL } from '@/config';
import axios from 'axios';
import { CourseProps } from '@/types/course';
import CoursesList from '@/components/Courses';
import { GetServerSidePropsContext } from 'next';

const purchased = ({ courses }: CourseProps) => {
  return <CoursesList courses={courses} title='My Purchased Courses' />;
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
    const response = await axios.get(`${NEXT_URL}/api/courses/purchased`, {
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
