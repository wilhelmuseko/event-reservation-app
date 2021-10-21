const express = require('express');
const app = express();
const locationRoutes = require('./routes/location');
const eventRoutes = require('./routes/event');
const { NotFoundError } = require('./error_utils/custom_error');
const { errorResponse } = require('./response_api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/location', locationRoutes);
app.use('/event', eventRoutes);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json(errorResponse(error));
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
