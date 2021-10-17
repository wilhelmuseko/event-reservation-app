const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.get('/event/get_info', async (req, res) => {
  try {
    res.json({
      name: 'asdfasdf',
    });
  } catch (error) {
    console.error(error.message);
  }
});
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
