import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionsOverview from 'components/collections-overview/collections-overview.component';
import CollectionPage from 'pages/collection/collection.component';
import WithSpinner from 'components/with-spinner/with-spinner.component';

// REDUX ACTIONS
import { fetchCollectionsAsync } from 'redux/shop/shop.actions';

// REDUX SELECTORS
import { selectShopIsFetching } from 'redux/shop/shop.selectors';

// CHILD COMPONENTS WITH SPINNER
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    this.props.fetchCollectionsAsync();
  }

  render() {
    const { match, loading } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />

        <Route
          path={`${match.path}/:collectionRouteName`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

Shop.propTypes = {
  loading: PropTypes.bool,
  match: PropTypes.object,
  fetchCollectionsAsync: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: selectShopIsFetching,
});

const mapDispatchToProps = {
  fetchCollectionsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
