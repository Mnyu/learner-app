import Link from 'next/link';

const login = () => {
  return (
    <section className='section-center'>
      <form className='form'>
        <h4>Login</h4>
        <div className='form-row'>
          <input
            type='text'
            className='form-input'
            name='email'
            id='email'
            required
            placeholder='Enter Email'
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
