import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// REDUX SELECTORS
import { selectIsCollectionsFetching } from 'redux/shop/shop.selectors';

// CHILD COMPONENTS
import WithSpinner from 'components/with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

// export default connect(mapStateToProps)(WithSpinner(CollectionsOverview));
export default compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);
