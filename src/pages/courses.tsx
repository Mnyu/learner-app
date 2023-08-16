import { NEXT_URL } from '@/config';
import { Course } from '@/types/course';
import axios from 'axios';

type CoursesProps = {
  courses: Course[];
};

const courses = ({ courses }: CoursesProps) => {
  return (
    <section className='courses'>
      <div className='title'>
        <h2>Courses</h2>
        <div className='title-underline'></div>
      </div>
      <div className='courses-center'>
        {courses.map((course) => {
          const id = course._id;
          const title = course.title;
          const image = course.image || '/home.svg';
          const link = `/courses/${id}`;
          return (
            <a key={id} href={link} className='course'>
              <img src={image} alt={title} className='img' />
              <h5>{title}</h5>
            </a>
          );
        })}
      </div>
    </section>
  );
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
    console.error(error);
  }
  return coursesProps;
}
