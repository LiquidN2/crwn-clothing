import './collections-overview.styles.scss';
import React from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { useAppSelector } from '../../hooks';
import { selectCollections } from '../../redux/shop/shop.selectors';

const CollectionsOverview: React.FC = () => {
  const collections = useAppSelector(selectCollections);

  return (
    <div className="collections-overview">
      {collections.map(collection => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
