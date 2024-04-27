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
  Subscription,
} from '../db/models';

dotenv.config();

const SubscriptionController = {

  createSubscription: async (req, res) => {
    try {
      const subid = uuid();
      const { body } = req;

      const subObject = {
        subid,
        driverid: body.driverid,
        planid: body.planid,
        subprice: body.subid,
        paymentmethod: body.paymentmethod,
        startdate: body.startdate,
        enddate: body.enddate,
        substatus: 'ACTIVE',
      };

      let newSub = await Subscription.create(subObject);
      newSub = newSub?.dataValues;

      if (!newSub) return res.status(500).send({ error: getErrorMessage('message', 'Could not create subscription') });
      res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });
    } catch (e) {
      res.status(STATUSES.INTERNAL_SERVER).json({ status: STATUSES.INTERNAL_SERVER, message: MESSAGES.INTERNAL_SERVER });
    }
  },

};

export default SubscriptionController;
