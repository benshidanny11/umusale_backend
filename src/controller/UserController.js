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
    return res.status(400).json(getErrorMessage('message', 'This account is no longer active'));
  },

  // createUser: async (req, res) => {
  //   const { body } = req;
  //   const password = generatePassword().encriptedPasword;
  //   const userObject = {
  //     id: uuid(),
  //     email: body.email,
  //     phonenumber: body.phonenumber,
  //     password,
  //     firstname: body.firstname,
  //     lastname: body.lastname,
  //     role: body.role,
  //   };
  //   let newUser = await User.create(userObject);
  //   newUser = newUser?.dataValues;
  //   if (!newUser) return res.sendStatus(500);
  //   await sendSms({
  //     receiver: body.phonenumber,
  //     sender: 'E-RANGA',
  //     body: `Hello ${body.lastname}! Your credentials are Username: ${body.phonenumber}, Password: ${generatePassword().plainPassword}`,
  //   });
  //   res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });
  // },

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

  // updateUser: async (req, res) => {
  //   const { body } = req;
  //   const data = {
  //     email: body.email,
  //     phonenumber: body.phonenumber,
  //     firstname: body.firstname,
  //     lastname: body.lastname,
  //     role: body.role,
  //   };
  //   const user = await User.update(data, { where: { id: req.params.id } });
  //   if (user[0] === 0) {
  //     return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
  //   }
  //   return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.UPDATED });
  // },
  // deleteUser: async (req, res) => {
  //   const { id } = req.params;
  //   const user = await User.findOne({ where: { id } });
  //   if (!user) {
  //     return res.status(STATUSES.NOTFOUND).send({ status: STATUSES.NOTFOUND, message: MESSAGES.NOT_FOUND });
  //   }
  //   await user.destroy();
  //   return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.DELETED });
  // },

};

export default UserController;
