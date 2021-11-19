import './cart-dropdown.styles.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropDown: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} {...item} />)
        ) : (
          <span className="empty-cart-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton type="button" onClick={() => navigate('/checkout')}>
        Go to Checkout
      </CustomButton>
    </div>
  );
};

export default CartDropDown;
