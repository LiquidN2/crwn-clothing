import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import {
  CartItemContainer,
  ItemDetailsContainer,
  ItemName,
} from './cart-item.styles';

const CartItem = ({ item: { name, price, quantity, imageUrl } }) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt="item" />
      <ItemDetailsContainer>
        <ItemName>{name}</ItemName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
};

export default CartItem;
