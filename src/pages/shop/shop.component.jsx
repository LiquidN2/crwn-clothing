import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// REDUX SELECTORS
import { selectShopCollections } from '../../redux/shop/shop.selectors';

const Shop = ({ collections }) => {
  return (
    <div className="shop-page">
      {collections.map(({ id, ...rest }) => {
        return <CollectionPreview key={id} {...rest} />;
      })}
    </div>
  );
};

Shop.propTypes = {
  collections: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(Shop);
