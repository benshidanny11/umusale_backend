/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import Plan from '../controller/PlanController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';
// import Paginate from '../middleware/Paginate';

const {
  verifyAccessToken,
  verifyUserVerificationToken,
  verifyUPasswordResetToken,
} = Auth;

const router = express.Router();

router.post('/createplan', Validator('plan'), verifyAccessToken, UserMiddle.checkISAdmin, Plan.createPlan);
router.get('/allplans', verifyAccessToken, UserMiddle.checkISAdmin, Plan.findAll);
router.put('/updateplan/:id', Validator('plan'), verifyAccessToken, UserMiddle.checkISAdmin, Plan.updatePlan);
export default router;