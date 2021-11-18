import './cart-icon.styles.scss';
import React from 'react';
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

const CartIcon: React.FC = () => {
  return (
    <div className="cart-icon">
      <ShoppingBagIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
