import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// REDUX SELECTORS
import { selectIsCollectionsLoaded } from 'redux/shop/shop.selectors';

// CHILD COMPONENTS
import WithSpinner from 'components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
});

export default compose(connect(mapStateToProps), WithSpinner)(CollectionPage);
