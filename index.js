const express = require('express');
const app = express();
const locationRoutes = require('./routes/location');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/location', locationRoutes);

app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
