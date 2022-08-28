const express = require('express');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log('Server is active on port:', port);
});
