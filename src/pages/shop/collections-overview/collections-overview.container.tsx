import React from 'react';
import withSpinner from '../../../components/with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';
import { useAppSelector } from '../../../hooks';
import { selectCollectionsLoading } from '../../../redux/shop';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);

const CollectionsOverviewContainer: React.FC = () => {
  const collectionsLoading = useAppSelector(selectCollectionsLoading);
  return <CollectionsOverviewWithSpinner isLoading={collectionsLoading} />;
};

export default CollectionsOverviewContainer;
