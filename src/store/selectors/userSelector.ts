import { selector } from 'recoil';
import { userState } from '../atoms/userAtom';

export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.name;
  },
});

export const userRoleSelector = selector({
  key: 'userRoleSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.role;
  },
});
