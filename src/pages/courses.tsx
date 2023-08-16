const courses = () => {
  return (
    <section className='courses'>
      <div className='title'>
        <h2>Courses</h2>
        <div className='title-underline'></div>
      </div>
      <div className='courses-center'>
        <a key='1' href='/courses/1' className='course'>
          <img src='/home.svg' alt='' className='img' />
          <h5>Home</h5>
        </a>
        <a key='2' href='/courses/1' className='course'>
          <img src='/home.svg' alt='' className='img' />
          <h5>Home</h5>
        </a>
        <a key='3' href='/courses/1' className='course'>
          <img src='/home.svg' alt='' className='img' />
          <h5>Home</h5>
        </a>
      </div>
    </section>
  );
};
export default courses;
