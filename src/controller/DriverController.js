/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { STATUSES } from '../constants/ResponseStatuses';
import { MESSAGES } from '../constants/ResponceMessages';
import {
  getErrorMessage,
} from '../helpers';

import {
  Driver, User, Wallet,
} from '../db/models';

dotenv.config();

const DriverController = {

  createDriver: async (req, res) => {
    const driverId = uuid();

    const { body } = req;
    const driverObject = {
      driverid: driverId,
      phonenumber: body.phonenumber,
      name: body.name,
      profileimage: body.profileimage,
      drivingnglicenceid: body.drivingnglicenceid,
      drivinglicenceimage: body.drivinglicenceimage,
      status: 'PENDING',
    };

    const userData = {
      userid: uuid(),
      firstname: body.name,
      lastname: body.name,
      password: bcrypt.hashSync(body.password, 10),
      email: body.phonenumber,
      phonenumber: body.phonenumber,
      username: body.phonenumber,
      userrole: 'DRIVER',
      extid: driverId,
      status: 'ACTIVE',
    };

    const walletData = {
      walletid: uuid(),
      driverid: driverId,
      balance: 0.0,
      walletstatus: 'ACTIVE',
    };

    let newDriver = await Driver.create(driverObject);
    newDriver = newDriver?.dataValues;

    let newUser = await User.create(userData);
    newUser = newUser?.dataValues;

    let newWallet = await Wallet.create(walletData);
    newWallet = newWallet?.dataValues;

    if (!newDriver || !newUser || !newWallet) return res.status(500).send({ error: getErrorMessage('message', 'Could not create driver') });
    res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });
  },

  findAll: async (req, res) => {
    const drivers = await Driver.findAll();
    res.status(200).json({
      drivers,
    });
  },
  findAllAproved: async (req, res) => {
    const drivers = await Driver.findAll({ where: { status: 'APPROVED' } });
    res.status(200).json({
      drivers,
    });
  },
  getDriverData: async (req, res) => {
    const {
      params: { id },
    } = req;
    let driver = await Driver.findOne({
      include: [
        {
          model: Wallet,
        },
      ],
      where: { driverid: id },
    });
    driver = driver ? driver.dataValues : null;
    if (!driver) {
      res.status(STATUSES.NOTFOUND).json({ message: MESSAGES.NOT_FOUND });
    } else {
      res.json({
        driver,
      });
    }
  },

  updateDriver: async (req, res) => {
    const { body } = req;
    const driverObject = {
      phonenumber: body.phonenumber,
      name: body.name,
      profileimage: body.profileimage,
      drivingnglicenceid: body.drivingnglicenceid,
      drivinglicenceimage: body.drivinglicenceimage,
    };

    const userData = {
      firstname: body.name,
      lastname: body.name,
      email: body.phonenumber,
      phonenumber: body.phonenumber,
      username: body.phonenumber,
    };

    const driver = await Driver.update(driverObject, { where: { driverid: req.params.id } });
    const user = await User.update(userData, {
      where:
          { extid: req.params.id },
    });
    if (user[0] === 0 || driver[0] === 0) {
      return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
    }
    return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.UPDATED });
  },

  aproveDriver: async (req, res) => {
    const { body } = req;
    const driverObject = {
      status: body.status,
    };

    const driver = await Driver.update(driverObject, { where: { driverid: req.params.id } });
    if (driver[0] === 0) {
      return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
    }
    return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: `${MESSAGES.STATUS_CHANGED} ${driverObject.status === 'APPROVED' ? ' approved' : ' rejected'}` });
  },
  deleteDriverAccount: async (req, res) => {
    const driverObject = {
      status: 'DORMANT',
    };

    const userData = {
      status: 'DORMANT',
    };

    const driver = await Driver.update(driverObject, { where: { driverid: req.params.id } });
    const user = await User.update(userData, {
      where:
          { extid: req.params.id },
    });
    if (user[0] === 0 || driver[0] === 0) {
      return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_DELETED });
    }
    return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.DELETED });
  },

};

export default DriverController;
