import { ActionType } from './user.actionType';
import { UserAction } from './user.action';

export interface UserType {
  email: string;
  displayName: string | null;
  createdAt: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  id?: string;
}

export interface UserState {
  currentUser: UserType | null;
}

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
