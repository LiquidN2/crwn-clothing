import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/create-payment-intent', async (req: Request, res: Response) => {
  const cartTotal = req.body.cartTotal as number;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: 'aud',
    payment_method_types: ['card'],
  });

  console.log(paymentIntent.client_secret);

  res.send({ clientSecret: paymentIntent.client_secret });
});

const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

export default app;
