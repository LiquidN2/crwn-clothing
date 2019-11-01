import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearItem, addItem, removeItem } from 'redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={cartItem.imageUrl} alt="item" />
      </div>
      <span className="name">{cartItem.name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem.id)}>
          &#10094;
        </div>
        <span className="value">{cartItem.quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">${cartItem.price}</span>
      <span className="remove-button" onClick={() => clearItem(cartItem.id)}>
        &#10005;
      </span>
    </div>
  );
};

CheckoutItem.propTypes = {
  cartItem: PropTypes.object,
  clearItem: PropTypes.func,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId)),
  clearItem: itemId => dispatch(clearItem(itemId)),
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
