import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustumButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const itemBackgroundStyle = {
    backgroundImage: `url(${item.imageUrl})`,
  };

  return (
    <div className="collection-item">
      <div className="image" style={itemBackgroundStyle} />
      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>
      <CustumButton inverted onClick={() => addItem(item)}>
        ADD TO CART
      </CustumButton>
    </div>
  );
};

CollectionItem.propTypes = {
  item: PropTypes.object,
  addItem: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
