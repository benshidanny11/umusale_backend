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
  SupPlan,
} from '../db/models';

dotenv.config();

const PlanController = {

  createPlan: async (req, res) => {
    try {
      const planid = uuid();
      const { body } = req;

      const planObject = {
        planid,
        plantname: body.planname,
        plandescription: body.plandescription,
        planplice: body.planprice,
        planstatus: 'ACTIVE',
      };

      let newPlan = await SupPlan.create(planObject);
      newPlan = newPlan?.dataValues;

      if (!newPlan) return res.status(500).send({ error: getErrorMessage('message', 'Could not create plan') });
      res.status(STATUSES.CREATED).json({ status: STATUSES.CREATED, message: MESSAGES.CREATED });
    } catch (e) {
      res.status(STATUSES.INTERNAL_SERVER).json({ status: STATUSES.INTERNAL_SERVER, message: MESSAGES.INTERNAL_SERVER });
    }
  },
  findAll: async (req, res) => {
    const plans = await SupPlan.findAll();
    res.status(200).json({
      plans,
    });
  },
  updatePlan: async (req, res) => {
    const { body } = req;
    const planObject = {
      plantname: body.planname,
      plandescription: body.plandescription,
      planplice: body.planprice,
    };
    const plan = await SupPlan.update(planObject, { where: { planid: req.params.id } });

    if (!plan[0]) {
      return res.status(STATUSES.BAD_REQUEST).send({ status: STATUSES.BAD_REQUEST, message: MESSAGES.NOT_UPDATED });
    }
    return res.status(STATUSES.OK).send({ status: STATUSES.OK, message: MESSAGES.UPDATED });
  },

};

export default PlanController;
