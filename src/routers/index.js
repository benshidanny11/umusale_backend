import express from 'express';
import User from './_user';
import Driver from './_driver';
import Trip from './_trip';

const api = express();

api.use('/api/v1/user', User);
api.use('/api/v1/driver', Driver);
api.use('/api/v1/trip', Trip);

api.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to Umuhuza app',
  });
});
api.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Page not found',
  });
});

export default api;
