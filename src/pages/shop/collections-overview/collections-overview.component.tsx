import './collections-overview.styles.scss';
import React from 'react';

import CollectionPreview from '../../../components/collection-preview/collection-preview.component';
import { useAppSelector } from '../../../hooks';
import { selectCollectionsAsArray } from '../../../redux/shop/shop.selectors';
import { ShopCollection } from '../../../redux/shop/shop.data';

const CollectionsOverview: React.FC = () => {
  const collections = useAppSelector<ShopCollection[]>(
    selectCollectionsAsArray
  );

  return (
    <div className="collections-overview">
      {collections.map(collection => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
