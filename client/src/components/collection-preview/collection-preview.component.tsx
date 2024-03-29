import React from 'react';
import { Link } from 'react-router-dom';

import CollectionItem, {
  CollectionItemProps,
} from '../collection-item/collection-item.component';

import { ShopCollection } from '../../models/Collection';

import {
  CollectionPreviewContainer,
  CollectionPreviewTitle,
  CollectionPreviewItems,
} from './collection-preview.styles';

export interface CollectionPreviewProps extends ShopCollection {
  items: CollectionItemProps[];
}

const CollectionPreview: React.FC<CollectionPreviewProps> = ({
  title,
  routeName,
  items,
}) => (
  <CollectionPreviewContainer>
    <Link to={routeName}>
      <CollectionPreviewTitle>{title}</CollectionPreviewTitle>
    </Link>
    <CollectionPreviewItems>
      {items
        .filter((item, index) => index < 4)
        .map(item => (
          <CollectionItem key={item.id} {...item} />
        ))}
    </CollectionPreviewItems>
  </CollectionPreviewContainer>
);

export default CollectionPreview;
