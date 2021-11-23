import {
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class UserDoc {
  constructor(
    readonly email: string,
    readonly displayName: string | null = null,
    readonly createdAt: Date,
    readonly emailVerified: boolean = false,
    readonly phoneNumber: string | null = null,
    readonly photoURL: string | null = null,
    readonly id?: string
  ) {}
}

export const userConverter = {
  toFirestore(user: WithFieldValue<UserDoc>): DocumentData {
    return {
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserDoc {
    const data = snapshot.data(options)!;

    return new UserDoc(
      data.email,
      data.displayName,
      data.createdAt.toDate(),
      data.emailVerified,
      data.phoneNumber,
      data.photoURL,
      snapshot.id
    );
  },
};
