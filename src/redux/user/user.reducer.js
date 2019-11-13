import {
  SET_CURRENT_USER,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
} from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        error: null,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
