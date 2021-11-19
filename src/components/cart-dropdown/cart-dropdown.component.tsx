import './cart-dropdown.styles.scss';
import React from 'react';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropDown: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <CustomButton type="button">Go to Checkout</CustomButton>
    </div>
  );
};

export default CartDropDown;
