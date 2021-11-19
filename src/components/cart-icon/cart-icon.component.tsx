import './cart-icon.styles.scss';
import React from 'react';
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

import { useActions } from '../../hooks';

const CartIcon: React.FC = () => {
  const { toggleCartHidden } = useActions();

  return (
    <div className="cart-icon" onClick={() => toggleCartHidden()}>
      <ShoppingBagIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
