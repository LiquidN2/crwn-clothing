import {
  SET_CURRENT_USER,
  // GOOGLE_SIGN_IN_START,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  // EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_FAILURE,
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

    case EMAIL_SIGN_IN_SUCCESS:
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        error: null,
      };

    case EMAIL_SIGN_IN_FAILURE:
    case GOOGLE_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
