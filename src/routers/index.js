import express from 'express';
import User from './_user';
import Driver from './_driver';
import Trip from './_trip';
import Plan from './_plan';

const api = express();

api.use('/api/v1/user', User);
api.use('/api/v1/driver', Driver);
api.use('/api/v1/trip', Trip);
api.use('/api/v1/plan', Plan);

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
