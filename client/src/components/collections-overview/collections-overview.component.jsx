import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionPreview from 'components/collection-preview/collection-preview.component';

// REDUX SELECTORS
import { selectCollectionsForPreview } from 'redux/shop/shop.selectors';

// STYLES
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => {
  return (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...rest }) => {
        return <CollectionPreview key={id} {...rest} />;
      })}
      {/* {Object.entries(collections).map(([key, { id, ...rest }]) => {
        return <CollectionPreview key={id} {...rest} />;
      })} */}
    </CollectionsOverviewContainer>
  );
};

CollectionsOverview.propTypes = {
  collections: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  // collections: selectShopCollections,
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
