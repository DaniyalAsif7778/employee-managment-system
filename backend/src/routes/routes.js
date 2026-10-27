import express from 'express';
 
import {
  login,
  getCurrentUser,
  logout,
  registerOrgnaization,
  sendOTP
} from '../controllers/auth/auth.controller.js';
 import { verifyJwt } from '../middlewares/verifyJwt.js';
const router = express.Router();

router.route('/health').get((req, res) => {
  res.json('EMS is running');
});

router.route('/register-org').post(
   registerOrgnaization
);

router.route('/login').post(login);
router.route('/auth/me').get(verifyJwt, getCurrentUser);
router.route('/logout').post(logout);
router.route('/sendEmail').post(sendOTP);
export const userRouter = router;
