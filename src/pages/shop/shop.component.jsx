import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionsOverview from 'components/collections-overview/collections-overview.component';
import CollectionPage from 'pages/collection/collection.component';
import WithSpinner from 'components/with-spinner/with-spinner.component';

// FIREBASE
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from 'firebase/firebase.utils';

// REDUX ACTIONS
import { updateCollections } from 'redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const collectionsRef = firestore.collection('collections');
    collectionsRef.onSnapshot(async snapshot => {
      const collectionsMap = await convertCollectionsSnapshotToMap(
        collectionsRef,
        snapshot,
        'items'
      );

      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

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
  match: PropTypes.object,
  updateCollections: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(
  null,
  mapDispatchToProps
)(Shop);
