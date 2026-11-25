import jwt from 'jsonwebtoken';
import process from 'process';
import { User } from '../models/auth/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHanlder.js';

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax', // 'none' allows cross-domain HTTPS; 'lax' works on localhost HTTP
  path: '/',
};

const verifyToken = (token, secret) => {
  if (!token || !secret) {
    return null;
  }

  try {
    const payload = jwt.verify(token, secret);
    return typeof payload === 'object' && payload !== null ? payload : null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }

    throw error;
  }
};

const verifyResetToken = asyncHandler(async (req, res, next) => {
  const resetSecret = process.env.RESET_PASSWORD_TOKEN_SECRET;
  console.log(resetSecret, 'secret');
  console.log(
    req.cookies?.resetToken || req.headers.authorization?.split(' ')[1],
    'token'
  );
  const resetPayload = verifyToken(
    req.cookies?.resetToken || req.headers.authorization?.split(' ')[1],
    resetSecret
  );
  if (!resetPayload?._id) {
    res.clearCookie('resetToken', cookieOptions);
    throw new ApiError(401, 'Session is missing or expired');
  }
  let user = resetPayload?._id
    ? await User.findById(resetPayload._id)
    : undefined;
  console.log('user', user);

  console.log(resetPayload, 'payload');

  if (!user) {
    res.clearCookie('resetToken', cookieOptions);
    throw new ApiError(401, 'Session is missing or expired');
  }

  req.user = user;
  return next();
});

export { verifyResetToken };
