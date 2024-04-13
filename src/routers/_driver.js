/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import Driver from '../controller/DriverController';
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

router.post('/createdriver', Validator('driver'), UserMiddle.checkDuplicatesExists, Driver.createDriver);
router.put('/updatedriver/:id', Validator('updateDriver'), verifyAccessToken, Driver.updateDriver);

router.get('/alldrivers', verifyAccessToken, UserMiddle.checkISAdmin, Driver.findAll);
router.get('/allaproveddrivers', Driver.findAllAproved);
router.get('/getdriverdata/:id', verifyAccessToken, UserMiddle.checkISDriver, Driver.getDriverData);
router.put('/aproveorrejectdriver/:id', Validator('aproveOrReject'), verifyAccessToken, UserMiddle.checkISAdmin, Driver.aproveDriver);

export default router;