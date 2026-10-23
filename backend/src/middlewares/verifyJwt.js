import jwt from 'jsonwebtoken';
import process from 'process';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHanlder.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
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

const verifyJwt = asyncHandler(async (req, res, next) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET || accessSecret;
  const accessPayload = verifyToken(req.cookies?.accessToken, accessSecret);

  let user = accessPayload?._id
    ? await User.findById(accessPayload._id).populate('organization')
    : null;

  if (!user) {
    const refreshPayload = verifyToken(
      req.cookies?.refreshToken,
      refreshSecret
    );
    if (refreshPayload?._id) {
      user = await User.findOne({
        _id: refreshPayload._id,
        refreshToken: req.cookies.refreshToken,
      })
        .select('+refreshToken')
        .populate('organization');

      if (user) {
        const renewedAccessToken = await user.generateAccessToken();
        res.cookie('accessToken', renewedAccessToken, cookieOptions);
      }
    }
  }

  if (!user) {
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    throw new ApiError(401, 'Session is missing or expired');
  }

  req.user = user;
  return next();
});

export { verifyJwt };
