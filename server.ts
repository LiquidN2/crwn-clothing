import dotenv from 'dotenv';

// LOAD ENV VARIABLES
const env = process.env.NODE_ENV || 'development';
if (env !== 'production') dotenv.config();

import app from './app';

// START LISTENING FOR UNCAUGHT EXCEPTION (should be placed at the top of the code)
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // close the server before shutting down the application
  process.exit(1);
});

const port = process.env.PORT || 5000;

// START SERVER
const server = app.listen(port, () => {
  console.log(`***** ${env.toUpperCase()} *****`);
  console.log(`✅ App running on port ${port}`);
});
