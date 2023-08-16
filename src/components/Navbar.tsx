import {
  userNameSelector,
  userRoleSelector,
} from '@/store/selectors/userSelector';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atoms/userAtom';
import axios from 'axios';

const Navbar = () => {
  const router = useRouter();
  const userRole = useRecoilValue(userRoleSelector);
  const userName = useRecoilValue(userNameSelector);
  const setUser = useSetRecoilState(userState);
  const isAdmin = userRole === 'admin';

  const logout = async () => {
    try {
      const response = await axios.get(`${NEXT_URL}/api/user/logout`);
      setUser({ name: '', email: '', role: '' });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>LEARNER</div>
        {userRole && (
          <div className='user-name'>
            Welcome <span>{userName}</span>
          </div>
        )}
        <div className='links-container'>
          <ul className='links'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/courses'>Courses</Link>
            </li>
            {isAdmin ? (
              <li>
                <Link href='/add-course'>Add Course</Link>
              </li>
            ) : (
              <li>
                <Link href='/teach'>Teach on Learner</Link>
              </li>
            )}
            {userRole ? (
              <li>
                <a className='logout' onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link href='/login'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
