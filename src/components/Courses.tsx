import { courseState } from '@/store/atoms/courseAtom';
import { Course, CourseProps } from '@/types/course';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

const Courses = ({ courses, title }: CourseProps) => {
  const router = useRouter();
  const setCourse = useSetRecoilState(courseState);

  const openCourse = (course: Course) => {
    setCourse({ course });
    router.push(`/courses/${course._id}`);
  };

  if (courses.length === 0) {
    return (
      <section className='courses'>
        <div className='title'>
          <h2>No Courses Available</h2>
          <div className='title-underline'></div>
        </div>
      </section>
    );
  }
  return (
    <section className='courses'>
      <div className='title'>
        <h2>{title}</h2>
        <div className='title-underline'></div>
      </div>
      <div className='courses-center'>
        {courses.map((course) => {
          const id = course._id;
          const title = course.title;
          const image = course.image || '/home.svg';
          return (
            <a
              key={id}
              className='course'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                openCourse(course);
              }}
            >
              <img src={image} alt={title} className='img' />
              <h5>{title}</h5>
            </a>
          );
        })}
      </div>
    </section>
  );
};
export default Courses;
