import React from 'react';
import StripeCheckOut, { Token } from 'react-stripe-checkout';

interface StripeButton {
  price: number;
}

const stripePublishableKey = process.env
  .REACT_APP_STRIPE_PUBLISHABLE_KEY as string;

const StripeCheckoutButton: React.FC<StripeButton> = ({ price }) => {
  const onToken = (token: Token) => {
    console.log(token);
  };

  const priceForStripe = price * 100;

  if (!stripePublishableKey) {
    throw new Error(
      'Stripe Publishable Key is undefined. Please check env variable'
    );
    return null;
  }

  return (
    <StripeCheckOut
      token={onToken}
      stripeKey={stripePublishableKey}
      name="CRWN Clothing Ltd."
      label="Pay Now"
      panelLabel="Pay Now"
      description={`Your total is $${price}`}
      amount={priceForStripe}
    />
  );
};

export default StripeCheckoutButton;
