// import { UserDoc } from '../../models/User';
import { ActionType } from './user.actionType';
import { UserType } from './user.reducer';

interface SetCurrentUserAction {
  type: ActionType.SET_CURRENT_USER;
  payload: UserType | null;
}

export type UserActions = SetCurrentUserAction;

export const setCurrentUser = (
  user: UserType | null
): SetCurrentUserAction => ({
  type: ActionType.SET_CURRENT_USER,
  payload: user,
});
