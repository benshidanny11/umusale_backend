/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */

import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import { Driver, SupPlan } from '../db/models';
import { getErrorMessage } from '../helpers';

export default {
  // Supper user

  checkDriverExists: async (req, res, next) => {
    const { driverid } = req.body;
    try {
      let driver = await Driver.findOne({ where: { driverid } });
      driver = driver?.dataValues;
      if (driver) {
        next();
      } else {
        res.status(STATUSES.NOTFOUND).send({
          status: STATUSES.NOTFOUND,
          error: getErrorMessage('message', 'Driver does not exist'),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkPlanExists: async (req, res, next) => {
    const { planid } = req.body;
    try {
      let plan = await SupPlan.findOne({ where: { planid } });
      plan = plan?.dataValues;
      if (plan) {
        req.plan = plan;
        next();
      } else {
        res.status(STATUSES.NOTFOUND).send({
          status: STATUSES.NOTFOUND,
          error: getErrorMessage('message', 'Plan does not exist'),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
