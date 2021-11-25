import React from 'react';
import withSpinner from '../../../components/with-spinner/with-spinner.component';
import Collection from './collection.component';
import { useAppSelector } from '../../../hooks';
import { selectCollectionsLoading } from '../../../redux/shop';

const CollectionWithSpinner = withSpinner(Collection);

const CollectionContainer: React.FC = () => {
  const collectionsLoading = useAppSelector(selectCollectionsLoading);
  return <CollectionWithSpinner isLoading={collectionsLoading} />;
};

export default CollectionContainer;
