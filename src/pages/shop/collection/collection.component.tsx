import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import CollectionItem from '../../../components/collection-item/collection-item.component';
import { useAppSelector } from '../../../hooks';
import { selectCollection } from '../../../redux/shop/shop.selectors';
import { CollectionRouteName } from '../../../redux/shop/shop.data';

import './collection.styles.scss';

const Collection: React.FC = () => {
  const params = useParams<'collectionRouteName'>();
  const collectionRouteName = params.collectionRouteName as CollectionRouteName;

  const collection = useAppSelector(selectCollection(collectionRouteName));

  if (!collection) return <Navigate to="/shop" />;

  console.log(collection);

  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.length
          ? items.map(item => <CollectionItem key={item.id} {...item} />)
          : null}
      </div>
    </div>
  );
};

export default Collection;
