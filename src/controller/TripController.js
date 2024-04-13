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
  Trip,
} from '../db/models';
import driver from '../db/models/driver';

const { Op } = require('sequelize');

dotenv.config();

const TripController = {

  requestTrip: async (req, res) => {
    const tripId = uuid();
    const { body } = req;
    const tripObject = {
      tripid: tripId,
      driverid: body.driverid,
      clientphonenumber: body.clientphonenumber,
      clientname: body.clientname,
      triporigin: body.triporigin,
      tripdestination: body.tripdestination,
      tripstatus: 'PENDING',
    };

    let newTrip = await Trip.create(tripObject);
    newTrip = newTrip?.dataValues;

    if (!newTrip) return res.status(500).send({ error: getErrorMessage('message', 'Could not create trip request') });
    res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });
  },

  getAlltriprequests: async (req, res) => {
    const trips = await Trip.findAll();
    res.status(200).json({
      trips,
    });
  },
  getDrivertriprequests: async (req, res) => {
    const driverTrips = await Trip.findAll({ where: { driverid: req.query.driverid } });
    res.status(200).json({
      driverTrips,
    });
  },
  // getDriverData: async (req, res) => {
  //   const {
  //     params: { id },
  //   } = req;
  //   let driver = await Driver.findOne({
  //     include: [
  //       {
  //         model: Wallet,
  //       },
  //     ],
  //     where: { driverid: id },
  //   });
  // driver = driver ? driver.dataValues : null;
  // if (!driver) {
  //   res.status(STATUSES.NOTFOUND).json({ message: MESSAGES.NOT_FOUND });
  // } else {
  //   res.json({
  //     driver,
  //   });
  // }
  //  },

  aproveOrReject: async (req, res) => {
    const { body } = req;
    const tripObject = {
      tripstatus: body.status,
    };

    const trip = await Trip.update(tripObject, { where: { tripid: req.params.id } });
    if (trip[0] === 0) {
      return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
    }
    return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: `${MESSAGES.STATUS_CHANGED} ${tripObject.status === 'APPROVED' ? ' approved' : ' rejected'}` });
  },

};

export default TripController;
