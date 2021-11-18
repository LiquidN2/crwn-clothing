// import { UserDoc } from '../../models/User';
import { ActionType } from './user.actionType';
import { UserType } from './user.reducer';

interface SetCurrentUser {
  type: ActionType.SET_CURRENT_USER;
  payload: UserType | null;
}

export type UserAction = SetCurrentUser;

export const SetCurrentUser = (user: UserType | null): SetCurrentUser => ({
  type: ActionType.SET_CURRENT_USER,
  payload: user,
});
