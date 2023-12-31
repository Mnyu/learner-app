import { UserResponse } from '@/types/user';
import Link from 'next/link';
import { useState } from 'react';
import { userState } from '@/store/atoms/userAtom';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import axios from 'axios';
import { APP_URL } from '@/config';
import Loading from '@/components/Loading';

const login = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearFormValues = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginPayload = { email, password };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${APP_URL}/api/user/login`,
        loginPayload
      );
      const user: UserResponse = response.data;
      setUser(user);
      clearFormValues();
      router.push('/');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert('Login unsuccessful.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='section-center'>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Login</h4>
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
          Login
        </button>
        <div className='login-register'>
          <p>
            Don't have an account?{' '}
            <Link href='/register' className='login-register-link'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default login;
