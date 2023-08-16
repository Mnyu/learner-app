import { NEXT_URL } from '@/config';
import { userState } from '@/store/atoms/userAtom';
import { UserResponse } from '@/types/user';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

const teach = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const handleGetStarted = async () => {
    try {
      const response = await axios.put(`${NEXT_URL}/api/user/me`);
      const user: UserResponse = response.data;
      setUser(user);
      router.push('/add-course');
    } catch (error) {
      console.log(error);
      router.push('/login');
    }
  };
  return (
    <main>
      <section className='hero'>
        <div className='hero-center'>
          <div className='hero-title'>
            <h3>Create an Engaging Course</h3>
            <p>
              Whether you've been teaching for years or are teaching for the
              first time, you can make an engaging course. We've compiled
              resources and best practices to help you get to the next level, no
              matter where you're starting.
            </p>
            <a className='btn hero-btn' onClick={handleGetStarted}>
              Get Started
            </a>
          </div>
          <div className='img-container'>
            <img src='/teach.svg' alt='teach' />
          </div>
        </div>
      </section>
    </main>
  );
};
export default teach;
