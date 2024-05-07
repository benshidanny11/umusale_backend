/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import Subscription from '../controller/SubscriptionController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';
import Global from '../middleware/_global';
// import Paginate from '../middleware/Paginate';

const {
  verifyAccessToken,
  verifyUserVerificationToken,
  verifyUPasswordResetToken,
} = Auth;
const router = express.Router();

router.post('/createplan', Validator('subscription'), verifyAccessToken, Global.checkDriverExists, Global.checkPlanExists, Subscription.createSubscription);
export default router;