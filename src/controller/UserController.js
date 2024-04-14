/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { STATUSES } from '../constants/ResponseStatuses';

import {
  generateAccessToken,
  getErrorMessage,
  sendSms,
} from '../helpers';

import {
  User,
} from '../db/models';
import { MESSAGES } from '../constants/ResponceMessages';

const { Op } = require('sequelize');
// import { serverConfig } from '../config';

dotenv.config();

const UserController = {
  login: async (req, res) => {
    const {
      user: {
        id, email, role, phonenumber, status,
      },
    } = req;
    if (status === 'ACTIVE') {
      const userData = {
        id, email, role, phonenumber,
      };
      const accesstoken = await generateAccessToken(userData);

      return res.json({ accesstoken, userData });
    }
    return res.status(STATUSES.BAD_REQUEST).json(getErrorMessage('message', 'This account is no longer active'));
  },

  findAll: async (req, res) => {
    const { email: emailCurrentUser } = req.authUser;
    const users = await User.findAll({
      attributes: [
        'id',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'role',
        'updatedAt',
        'createdAt',
      ],
      where: {
        email: {
          [Op.ne]: emailCurrentUser,
        },
      },
    });
    res.status(200).json({
      users,
    });
  },
  findOne: async (req, res) => {
    const {
      params: { id },
    } = req;
    let user = await User.findOne({
      where: { id },
      attributes: [
        'id',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'role',
        'updatedAt',
        'createdAt',
      ],
    });
    user = user ? user.dataValues : null;
    if (!user) {
      res.status(STATUSES.NOTFOUND).json({ message: MESSAGES.NOT_FOUND });
    } else {
      res.json({
        user,
      });
    }
  },

};

export default UserController;
