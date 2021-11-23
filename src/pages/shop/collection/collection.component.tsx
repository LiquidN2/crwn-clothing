import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import CollectionItem from '../../../components/collection-item/collection-item.component';
import { useAppSelector } from '../../../hooks';
import { selectCollection } from '../../../redux/shop/shop.selectors';
import { CollectionRouteName } from '../../../redux/shop/shop.data';

import {
  CollectionPageContainer,
  CollectionItems,
  CollectionTitle,
} from './collection.styles';

const Collection: React.FC = () => {
  const params = useParams<'collectionRouteName'>();
  const collectionRouteName = params.collectionRouteName as CollectionRouteName;

  const collection = useAppSelector(selectCollection(collectionRouteName));

  if (!collection) return <Navigate to="/shop" />;

  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItems>
        {items.length
          ? items.map(item => <CollectionItem key={item.id} {...item} />)
          : null}
      </CollectionItems>
    </CollectionPageContainer>
  );
};

export default Collection;
