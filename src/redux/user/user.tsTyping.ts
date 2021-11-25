export interface UserType {
  email: string;
  displayName: string | null;
  createdAt: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  id?: string;
}

export enum AuthStatusType {
  Authenticated = 'autheticated',
  Authenticating = 'authenticating',
  Unauthenticated = 'unauthenticated',
  SigningOut = 'signing-out',
  SignOutSuccess = 'signout-success',
  SignOutError = 'signout-error',
  SigningUp = 'signing-up',
  SignUpSuccess = 'signup-success',
  SignUpError = 'signup-error',
  Unknown = 'unkown',
}

export type AuthStatus =
  | AuthStatusType.Authenticated
  | AuthStatusType.Authenticating
  | AuthStatusType.Unauthenticated
  | AuthStatusType.SigningOut
  | AuthStatusType.SignOutSuccess
  | AuthStatusType.SignOutError
  | AuthStatusType.SigningUp
  | AuthStatusType.SignUpSuccess
  | AuthStatusType.SignUpError
  | AuthStatusType.Unknown;

export interface UserState {
  currentUser: UserType | null;
  status: AuthStatus;
  error: string | undefined;
}
