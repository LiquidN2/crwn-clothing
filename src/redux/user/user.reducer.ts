import { ActionType } from './user.actionType';
import { UserActions } from './user.actions';

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

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserActions
): UserState => {
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
