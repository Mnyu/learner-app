import Link from 'next/link';

const register = () => {
  return (
    <section className='section-center'>
      <form className='form'>
        <h4>Register</h4>
        <div className='form-row'>
          <input
            type='text'
            className='form-input'
            name='name'
            id='name'
            required
            placeholder='Enter Name'
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
