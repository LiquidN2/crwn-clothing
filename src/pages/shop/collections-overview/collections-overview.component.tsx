import React from 'react';

import CollectionPreview from '../../../components/collection-preview/collection-preview.component';
import { useAppSelector } from '../../../hooks';
import { selectCollectionsAsArray } from '../../../redux/shop/shop.selectors';
import { ShopCollection } from '../../../redux/shop/shop.data';
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview: React.FC = () => {
  const collections = useAppSelector<ShopCollection[]>(
    selectCollectionsAsArray
  );

  return (
    <CollectionsOverviewContainer>
      {collections.map(collection => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </CollectionsOverviewContainer>
  );
};

export default CollectionsOverview;
