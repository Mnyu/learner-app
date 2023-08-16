import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>LEARNER</div>
        <div className='links-container'>
          <ul className='links'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/courses'>Courses</Link>
            </li>
            <li>
              <Link href='/add-course'>Add Course</Link>
            </li>
            <li>
              <Link href='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
