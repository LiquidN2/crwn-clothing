import React from 'react';

import type { CartItem as CartItemType } from '../../redux/cart/cart.reducer';
import {
  CartItemContainer,
  CartItemImage,
  CartItemDetails,
  CartItemName,
  CartItemPrice,
} from './cart-item.styles';

export interface CartItemProps extends CartItemType {}

const CartItem: React.FC<CartItemProps> = ({
  name,
  imageUrl,
  price,
  quantity,
}) => {
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={name} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>
          {quantity} x ${price}
        </CartItemPrice>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
