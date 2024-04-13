/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import Trip from '../controller/TripController';
import UserMiddle from '../middleware/user';
import Validator from '../middleware/_validator';
import Global from '../middleware/_global';
import Auth from '../middleware/Auth';

const {
  verifyAccessToken,
} = Auth;

const router = express.Router();

router.post('/requesttrip', Validator('trip'), Global.checkDriverExists, Trip.requestTrip);
router.get('/alltriprequests', verifyAccessToken, UserMiddle.checkISAdmin, Trip.getAlltriprequests);
router.get('/getdrivertriprequests', verifyAccessToken, Trip.getDrivertriprequests);
router.put('/approveorrejecttrip/:id', Validator('aproveOrReject'), verifyAccessToken, UserMiddle.checkISDriver, Trip.aproveOrReject);

export default router;