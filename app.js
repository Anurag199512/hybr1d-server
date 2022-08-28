const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');

const app = express();
dotenv.config();

const port = process.env.port || 3000;

// importing routes
const routes = require('./Routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', routes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.all('*', (req, res) => {
  res.status(404).send({ success: false, error: 'API does not exist' });
});

app.listen(port, () => {
  console.log('Server is active on port:', port);
});
