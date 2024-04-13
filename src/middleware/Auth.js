/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { decodeToken, getErrorMessage, decodeJWT } from '../helpers';
import { User } from '../db/models';
import { MESSAGES } from '../constants/ResponceMessages';

dotenv.config();

const Auth = {
  verifyAccessToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
      });
    }
    const token = authorization.split(' ')[1];

    if (!token || token === 'undefined') {
      return res.status(401).send({
        error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
      });
    }
    decodeJWT(token, async (err, decoded) => {
      const phonenumber = decoded?.phonenumber;
      if (err || !phonenumber) {
        return res.status(403).send({
          error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
        });
      }
      let user = await User.findOne({ where: { phonenumber } });
      user = user?.dataValues;
      if (!user) {
        return res.status(403).send({
          error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
        });
      }
      req.authUser = user;
      next();
    });
  },

  checkCredentials: async (req, res, next) => {
    const { user, body: { password } } = req;
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).send({
        error: getErrorMessage('message', 'Password is incorrect'),
      });
    }
    next();
  },
};

export default Auth;
