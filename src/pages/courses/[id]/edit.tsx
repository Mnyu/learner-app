import CourseDetail from '@/components/CourseDetail';
import { NEXT_URL } from '@/config';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { CourseProps } from '@/types/course';
import { useRouter } from 'next/router';

const Course = (courseProps: CourseProps) => {
  return <CourseDetail {...courseProps} />;
};
export default Course;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const courseProps = {
    props: {
      course: {},
    },
  };
  try {
    const courseId = context.params?.id;
    const cookies = context.req.headers.cookie;
    const response = await axios.get(`${NEXT_URL}/api/courses/${courseId}`, {
      headers: {
        Cookie: cookies,
      },
    });
    courseProps.props.course = response.data.course;
  } catch (error) {
    //console.error(error);
  }
  return courseProps;
}
