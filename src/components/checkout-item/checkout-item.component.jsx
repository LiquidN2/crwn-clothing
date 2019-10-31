import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({
  cartItem: { id, imageUrl, name, price, quantity },
  clearItem,
}) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={() => clearItem(id)}>
        &#10005;
      </span>
    </div>
  );
};

CheckoutItem.propTypes = {
  cartItem: PropTypes.object,
  id: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  clearItem: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  clearItem: itemId => dispatch(clearItem(itemId)),
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
