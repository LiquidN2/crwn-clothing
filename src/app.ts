import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import Stripe from 'stripe';

const app = express();

// INSTANTIATE STRIPE
const stripeSecretKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw Error(
    'Stripe secret key is undefined. Please configure your env variable'
  );
}
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// HANDLE STRIPE PAYMENT
app.post('/create-payment-intent', async (req: Request, res: Response) => {
  const cartTotal = req.body.cartTotal as number;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: 'aud',
    payment_method_types: ['card'],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

// HANDLE SERVING REACT APP IN PRODUCTION VIA STATIC FILE
const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  // Set Static folder
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

export default app;
