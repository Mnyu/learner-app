import { UserResponse } from '@/types/user';
import { atom } from 'recoil';

export const userState = atom<UserResponse>({
  key: 'userState',
  default: {
    name: '',
    email: '',
    role: '',
  },
});
