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
  getNextDate,
} from '../helpers';

import {
  Subscription,
} from '../db/models';

dotenv.config();

const SubscriptionController = {

  createSubscription: async (req, res) => {
    try {
      const subid = uuid();
      const currentDate = new Date();
      const { body } = req;
      const { plan } = req;
      const nextDate = getNextDate(currentDate, plan.validitydays);
      const subObject = {
        subid,
        driverid: body.driverid,
        planid: body.planid,
        subprice: plan.planplice,
        paymentmethod: body.paymentmode,
        startdate: currentDate.toString(),
        enddate: nextDate.toString(),
        nextbillingdate: nextDate.toString(),
        substatus: 'ACTIVE',
        paymentstatus: 'PENDING',
      };

      let newSub = await Subscription.create(subObject);
      newSub = newSub?.dataValues;

      if (!newSub) return res.status(500).send({ error: getErrorMessage('message', 'Could not create subscription') });
      res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });

      // // TODO: supscription history.
    } catch (e) {
      console.log(e);
      res.status(STATUSES.INTERNAL_SERVER).json({ status: STATUSES.INTERNAL_SERVER, message: MESSAGES.INTERNAL_SERVER });
    }
  },
  renewSubscription: async (req, res) => {
    try {
      const subid = uuid();
      const currentDate = new Date();
      const { body } = req;
      const { plan } = req;
      /*
              subid,
        driverid: body.driverid,
        planid: body.planid,
      */
      const currentSub = await Subscription.findOne({ where: { planid: req.params.id } });
      const nextDate = getNextDate(new Date(currentSub.enddate), plan.validitydays);
      const subObject = {
        paymentmethod: body.paymentmode,
        startdate: currentDate.toString(),
        enddate: nextDate.toString(),
        nextbillingdate: nextDate.toString(),
        substatus: 'ACTIVE',
        paymentstatus: 'PENDING',
      };

      const updatedSub = await Subscription.update(subObject, { where: { subid: req.params.id } });

      if (!updatedSub[0]) {
        return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
      }
      return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.UPDATED });
    } catch (e) {
      console.log(e);
      res.status(STATUSES.INTERNAL_SERVER).json({ status: STATUSES.INTERNAL_SERVER, message: MESSAGES.INTERNAL_SERVER });
    }
  },

};

export default SubscriptionController;
