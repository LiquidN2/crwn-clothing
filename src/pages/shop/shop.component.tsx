import React, { useState } from 'react';
import SHOP_DATA from '../../dev-data/shop.data';
import CollectionPreview, {
  CollectionPreviewProps,
} from '../../components/collection-preview/collection-preview.component';

const ShopPage: React.FC = () => {
  const [collections, setCollections] =
    useState<CollectionPreviewProps[]>(SHOP_DATA);

  return (
    <div className="shop-page">
      {collections.map(collection => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default ShopPage;
