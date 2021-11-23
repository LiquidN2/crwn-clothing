import {
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export interface ShopItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  uid?: string;
}

export class ItemDoc {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly imageUrl: string,
    readonly price: number,
    readonly uid?: string
  ) {}

  toObj(): ShopItem {
    const { id, name, imageUrl, price } = this;
    const itemDocObj: ShopItem = { id, name, imageUrl, price };
    if (this.uid) itemDocObj.uid = this.uid;
    return itemDocObj;
  }
}

export const itemConverter = {
  toFirestore(item: WithFieldValue<ItemDoc>): DocumentData {
    return {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ItemDoc {
    const data = snapshot.data(options);

    return new ItemDoc(
      data.id,
      data.name,
      data.imageUrl,
      data.price,
      snapshot.id
    );
  },
};
