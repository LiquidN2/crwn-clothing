import React, { useEffect, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { useActions, useAppSelector } from '../../hooks';
import {
  selectCartHidden,
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CheckoutForm from '../../components/checkout-form/checkout-form.component';

import {
  CheckoutPageContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal,
  CheckoutTestWarning,
} from './checkout.styles';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw Error(
    'Stripe publishable key is undefined. Please check your env variables'
  );
}
const stripePromise = loadStripe(stripePublishableKey);

const CheckoutPage: React.FC = () => {
  const [clientSecret, setClientSecret] = useState('');
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartHidden = useAppSelector(selectCartHidden);
  const { toggleCartHidden } = useActions();

  useEffect(() => {
    // Hide cart dropdown upon page load
    if (cartHidden) return;
    toggleCartHidden();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cartTotal || cartTotal < 0.5) return;

    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartTotal }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [cartTotal]);

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

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

      {cartTotal && clientSecret ? (
        <Elements options={stripeOptions} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
