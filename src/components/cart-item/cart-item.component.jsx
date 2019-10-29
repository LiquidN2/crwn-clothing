import React from 'react';
import PropTypes from 'prop-types';

import './cart-item.styles.scss';

const CartItem = ({ item: { name, price, quantity, imageUrl } }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
};

export default CartItem;
