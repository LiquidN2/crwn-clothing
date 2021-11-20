import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { useAppSelector } from '../../hooks';
import { selectCollections } from '../../redux/shop/shop.selectors';

const ShopPage: React.FC = () => {
  const collections = useAppSelector(selectCollections);

  return (
    <div className="shop-page">
      {collections.map(collection => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default ShopPage;
