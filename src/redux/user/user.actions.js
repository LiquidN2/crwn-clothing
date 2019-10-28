import { SET_CURRENT_USER } from './user.constant';

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    currentUser: user,
  };
};
