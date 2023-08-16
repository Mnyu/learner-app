import { Courses } from '@/types/course';

const Courses = ({ courses }: Courses) => {
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
export default Courses;
