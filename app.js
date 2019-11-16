const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// JSON body parser (parse request body and populate req.body)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Allow CORS
app.use(cors());

app.get('/test', (req, res) => {
  return res.status(200).json({
    status: 'success'
  });
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  // console.log(body);

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      return res.status(500).send({ error: stripeErr });
    }

    return res.status(200).send({ success: stripeRes });
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
