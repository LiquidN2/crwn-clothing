export interface UserType {
  id: string;
  email?: string;
  displayName?: string;
  createdAt?: Date;
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
}
