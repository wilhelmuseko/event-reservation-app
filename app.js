const express = require('express');
const app = express();
const locationRoutes = require('./routes/location');
const { NotFoundError } = require('./error-utils/custom-error');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/location', locationRoutes);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: {
      error_code: error.errorCode,
      message: error.message,
    },
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
