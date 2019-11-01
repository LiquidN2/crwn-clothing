import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionPreview from 'components/collection-preview/collection-preview.component';

// REDUX SELECTORS
import { selectShopCollections } from 'redux/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...rest }) => {
        return <CollectionPreview key={id} {...rest} />;
      })}
    </div>
  );
};

CollectionsOverview.propTypes = {
  collections: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);
