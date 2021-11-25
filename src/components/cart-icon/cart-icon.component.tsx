import React from 'react';

import { useActions, useAppSelector } from '../../hooks';
import { selectCartItemsCount } from '../../redux/cart';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon: React.FC = () => {
  const { toggleCartHidden } = useActions();

  const itemCount = useAppSelector(selectCartItemsCount);

  return (
    <CartIconContainer onClick={() => toggleCartHidden()}>
      <ShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
