import './checkout.styles.scss';
import React, { useEffect } from 'react';

import { useActions, useAppSelector } from '../../hooks';
import {
  selectCartHidden,
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

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
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map(item => (
        <CheckoutItem key={item.id} {...item} />
      ))}

      <div className="total">
        <span>TOTAL: ${cartTotal}</span>
      </div>
      {cartTotal ? (
        <div className="test-warning">
          *Please use the following test credit card for payments*
          <br />
          4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
      ) : null}
      {cartTotal ? <StripeCheckoutButton price={cartTotal} /> : null}
    </div>
  );
};

export default CheckoutPage;
