import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionsOverviewContainer from 'components/collections-overview/collections-overview.container';
import CollectionPageContainer from 'pages/collection/collection.container';

// REDUX ACTIONS
// import { fetchCollectionsAsync } from 'redux/shop/shop.actions';
import { fetchCollectionsStart } from 'redux/shop/shop.actions';

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    // this.props.fetchCollectionsAsync();
    this.props.fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

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
  }
}

Shop.propTypes = {
  match: PropTypes.object,
  fetchCollectionsAsync: PropTypes.func,
  fetchCollectionsStart: PropTypes.func,
};

const mapDispatchToProps = {
  // fetchCollectionsAsync,
  fetchCollectionsStart,
};

export default connect(null, mapDispatchToProps)(Shop);
