/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import User from '../controller/UserController';
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

// Authentication and authorization
router.post('/login', Validator('login'), UserMiddle.checkUserExists, Auth.checkCredentials, User.login);
// router.post('/createuser', Validator('createuser'), verifyAccessToken, UserMiddle.checkISAdmin, UserMiddle.checkDuplicatesExists, User.createUser);
// router.put('/updateuser/:id', Validator('createuser'), verifyAccessToken, UserMiddle.checkISAdmin, User.updateUser);

router.get('/allusers', verifyAccessToken, UserMiddle.checkISAdmin, User.findAll);
router.get('/oneuser/:id', verifyAccessToken, UserMiddle.checkISAdmin, User.findOne);
// router.delete('/deleteuser/:id', verifyAccessToken, UserMiddle.checkISAdmin, User.deleteUser);

export default router;
