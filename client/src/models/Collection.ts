import {
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { ItemDoc, ShopItem } from './ShopItem';

export interface ShopCollection {
  id: string;
  title: string;
  routeName: string;
  items: ShopItem[];
  uid?: string;
}

export class CollectionDoc {
  constructor(
    readonly title: string,
    readonly items: ItemDoc[],
    readonly id?: string
  ) {}
}

export const collectionConverter = {
  toFirestore(collection: WithFieldValue<CollectionDoc>): DocumentData {
    return {
      title: collection.title,
      items: collection.items,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CollectionDoc {
    const data = snapshot.data(options)!;

    return new CollectionDoc(data.title, data.items, snapshot.id);
  },
};
