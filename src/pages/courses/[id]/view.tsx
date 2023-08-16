import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { CourseProps } from '@/types/course';
import { useRouter } from 'next/router';
import { APP_URL, APP_URL_SERVER_SIDE } from '@/config';
import { useState } from 'react';
import Loading from '@/components/Loading';

const view = ({ course }: CourseProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const image = course?.image || '/home.svg';

  const purchaseCourse = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${APP_URL}/api/courses/${course?._id}`
      );
      alert('Course Purchased');
      router.push('/courses/purchased');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert('Error purchasing course');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <section className='hero'>
        <div className='course-view-center'>
          <div className='course-view-img-container'>
            <img src={image} alt='Home' className='img course-view-img' />
          </div>
          <div className='course-view-title'>
            <h3>{course?.title}</h3>
            <p>{course?.description}</p>
            <h4>Rs {course?.price}</h4>
            <a className='btn hero-btn' onClick={purchaseCourse}>
              Purchase Course
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
export default view;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const courseProps = {
    props: {
      course: {},
    },
  };
  try {
    const courseId = context.params?.id;
    const cookies = context.req.headers.cookie;
    const response = await axios.get(
      `${APP_URL_SERVER_SIDE}/api/courses/${courseId}`,
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    courseProps.props.course = response.data.course;
  } catch (error) {
    //console.error(error);
  }
  return courseProps;
}
