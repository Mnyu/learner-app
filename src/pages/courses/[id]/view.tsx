import { NEXT_URL } from '@/config';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { CourseProps } from '@/types/course';
import { useRouter } from 'next/router';

const view = ({ course }: CourseProps) => {
  const router = useRouter();
  const image = course?.image || '/home.svg';

  const purchaseCourse = async () => {
    try {
      const response = await axios.post(
        `${NEXT_URL}/api/courses/${course?._id}`
      );
      alert('Course Purchased');
      router.push('/courses/purchased');
    } catch (error) {
      console.log(error);
      alert('Error purchasing course');
    }
  };

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
