import './cart-icon.styles.scss';
import React from 'react';
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

import { useActions, useAppSelector } from '../../hooks';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon: React.FC = () => {
  const { toggleCartHidden } = useActions();

  const itemCount = useAppSelector(selectCartItemsCount);

  return (
    <div className="cart-icon" onClick={() => toggleCartHidden()}>
      <ShoppingBagIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
