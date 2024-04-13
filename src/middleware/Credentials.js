/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import { allowedOrigins } from '../config';

export default (req, res, next) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};
