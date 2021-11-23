import React from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { StyledCustomButton } from '../custom-button/custom-button.styles';

import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import {
  CartDropdownContainer,
  CartItems,
  EmptyCartMessage,
} from './cart-dropdown.styles';

const CartDropDown: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} {...item} />)
        ) : (
          <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
        )}
      </CartItems>
      <StyledCustomButton type="button" onClick={() => navigate('/checkout')}>
        Go to Checkout
      </StyledCustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropDown;
