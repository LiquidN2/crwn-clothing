import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionsOverviewContainer from 'components/collections-overview/collections-overview.container';
import CollectionPageContainer from 'pages/collection/collection.container';

// REDUX ACTIONS
import { fetchCollectionsStart } from 'redux/shop/shop.actions';

const Shop = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />

      <Route
        path={`${match.path}/:collectionRouteName`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

Shop.propTypes = {
  match: PropTypes.object,
  fetchCollectionsStart: PropTypes.func,
};

const mapDispatchToProps = {
  fetchCollectionsStart,
};

export default connect(null, mapDispatchToProps)(Shop);
