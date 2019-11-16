import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import PropTypes from 'prop-types';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // stripe charges in cents
  const publishableKey = 'pk_test_PHtKHeNYUK5XRdJwRXugFdty00u6XC9agq';

  const onToken = async token => {
    try {
      await axios.post('/payment', {
        amount: priceForStripe,
        token,
      });
      alert('Payment successful');
    } catch (error) {
      console.log(`Payment error ${error}`);
      alert(
        'There was an issue with your payemnt. Please ensure you use the correct credit card.'
      );
    }
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

StripeCheckoutButton.propTypes = {
  price: PropTypes.number,
};

export default StripeCheckoutButton;
