import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atoms/userAtom';

const logout = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const logout = async () => {
    try {
      const response = await axios.get(`${NEXT_URL}/api/user/logout`);
      setUser({ name: '', email: '', role: '' });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  logout();
  return <></>;
};
export default logout;
