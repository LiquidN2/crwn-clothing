import React, { FormEventHandler, useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import {
  CheckoutFormContainer,
  StyledPaymentElement,
  PayButton,
  Spinner,
  PaymentMessage,
} from './checkout-form.styles';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;

      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/checkout',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      error.type === 'card_error' ||
      (error.type === 'validation_error' && error.message)
    ) {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <CheckoutFormContainer id="payment-form" onSubmit={handleSubmit}>
      <StyledPaymentElement />
      <PayButton disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <Spinner /> : 'Pay now'}</span>
      </PayButton>
      {/* Show any error or success messages */}
      {message && (
        <PaymentMessage id="payment-message">{message}</PaymentMessage>
      )}
    </CheckoutFormContainer>
  );
};

export default CheckoutForm;
