/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */

import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import { User } from '../db/models';
import { getErrorMessage } from '../helpers';

const { Op } = require('sequelize');

export default {
  // Supper user

  checkISAdmin: async (req, res, next) => {
    const user = req.authUser || req.user;
    if (user?.userrole === 'SUPPER_ADMIN') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
      });
    }
  },

  checkISDriver: async (req, res, next) => {
    const user = req.authUser || req.user;
    if (user?.userrole === 'DRIVER') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('message', MESSAGES.UNAUTHORIZED),
      });
    }
  },

  checkUserExists: async (req, res, next) => {
    const { phonenumber } = req.body;
    try {
      let user = await User.findOne({ where: { phonenumber } });
      user = user?.dataValues;
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(STATUSES.BAD_REQUEST).send({
          status: STATUSES.BAD_REQUEST,
          error: getErrorMessage('message', 'Phonenumber not exist'),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  checkDuplicatesExists: async (req, res, next) => {
    const { phonenumber } = req.body;

    try {
      let user = await User.findOne({
        where: {
          phonenumber,
        },
      });
      user = user?.dataValues;
      if (user) {
        res.status(STATUSES.BAD_REQUEST).send({
          status: STATUSES.BAD_REQUEST,
          error: getErrorMessage('message', 'User already exists'),
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  },
};
