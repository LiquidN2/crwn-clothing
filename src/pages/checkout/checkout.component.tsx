import React, { useEffect } from 'react';

import { useActions, useAppSelector } from '../../hooks';
import {
  selectCartHidden,
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  CheckoutPageContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal,
  CheckoutTestWarning,
} from './checkout.styles';

const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartHidden = useAppSelector(selectCartHidden);
  const { toggleCartHidden } = useActions();

  useEffect(() => {
    // Hide cart dropdown upon page load
    if (cartHidden) return;
    toggleCartHidden();
  }, []);

  return (
    <CheckoutPageContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map(item => (
        <CheckoutItem key={item.id} {...item} />
      ))}

      <CheckoutTotal>
        <span>TOTAL: ${cartTotal}</span>
      </CheckoutTotal>

      {cartTotal ? (
        <CheckoutTestWarning>
          *Please use the following test credit card for payments*
          <br />
          4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </CheckoutTestWarning>
      ) : null}
      {cartTotal ? <StripeCheckoutButton price={cartTotal} /> : null}
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
