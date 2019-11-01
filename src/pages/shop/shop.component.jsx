import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionsOverview from 'components/collections-overview/collections-overview.component';
import CollectionPage from 'pages/collection/collection.component';

const Shop = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        path={`${match.path}/:collectionRouteName`}
        component={CollectionPage}
      />
    </div>
  );
};

Shop.propTypes = {
  match: PropTypes.object,
};

export default Shop;
