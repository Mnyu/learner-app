import { UserResponse } from '@/types/user';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { userState } from '@/store/atoms/userAtom';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { APP_URL } from '@/config';
import Loading from '@/components/Loading';

const register = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearFormValues = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerPayload = { name, email, password };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${APP_URL}/api/user/register`,
        registerPayload
      );
      const user: UserResponse = response.data;
      setUser(user);
      clearFormValues();
      router.push('/courses');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert('Error in registration.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='section-center'>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Register</h4>
        <div className='form-row'>
          <input
            type='text'
            className='form-input'
            name='name'
            id='name'
            required
            placeholder='Enter Name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <input
            type='text'
            className='form-input'
            name='email'
            id='email'
            required
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <input
            type='password'
            className='form-input'
            name='password'
            id='password'
            required
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-block'
          style={{ marginTop: '0.5rem' }}
        >
          Register
        </button>
        <div className='login-register'>
          <p>
            Already have an account?{' '}
            <Link href='/login' className='login-register-link'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default register;
