/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */

import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import { Driver } from '../db/models';
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

};
