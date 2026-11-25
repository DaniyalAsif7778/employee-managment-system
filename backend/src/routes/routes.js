import express from 'express';

import {
  login,
  getCurrentUser,
  logout,
  registerOrgnaization,
  sendPasswordResetEmail,
  verifyEmail,
  verifyOTP,
  ResetUserPassword,
  verifyPasswordResetOTP,
} from '../controllers/auth/auth.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';
import { verifyResetToken } from '../middlewares/verifyResetToken.js';
const router = express.Router();

router.route('/health').get((req, res) => {
  res.json('EMS is running');
});

router.route('/register-org').post(registerOrgnaization);

router.route('/login').post(login);
router.route('/auth/me').get(verifyJwt, getCurrentUser);
router.route('/logout').post(logout);
router.route('/sendEmail').post(verifyEmail);
router.route('/verifyOtp').post(verifyOTP);
router.route('/forgot-password').post(sendPasswordResetEmail);
router.route('/verify-password-reset-otp').post(verifyPasswordResetOTP);
router.route('/reset-password').post(verifyResetToken, ResetUserPassword);

export const userRouter = router;
