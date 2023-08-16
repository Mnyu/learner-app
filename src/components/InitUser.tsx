import { UserResponse } from '@/types/user';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atoms/userAtom';
import { useEffect } from 'react';

const InitUser = () => {
  const DOMAIN = process.env.DOMAIN;
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    let user: UserResponse = {
      name: '',
      email: '',
      role: '',
    };
    try {
      const response = await axios.get(`${DOMAIN}/api/user/me`);
      user = response.data;
    } catch (error) {
      console.log('User is unauthorized');
    }
    setUser(user);
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default InitUser;
