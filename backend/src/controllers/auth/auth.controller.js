import jwt from 'jsonwebtoken'
import process from 'process'
import { User } from '../../models/auth/user.model.js'
import { ApiResponse } from '../../utils/ApiResponse.js'
import { asyncHandler } from '../../utils/asyncHanlder.js'
import { generateTokens } from '../../utils/generateTokens.js'

const persistentCookieAge = 30 * 24 * 60 * 60 * 1000
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
}

const normalizeRole = (role) => String(role ?? '').trim().toLowerCase()

const safeUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  firstName: user.firstName ?? '',
  lastName: user.lastName ?? '',
  phone: user.phone ?? '',
  avatar: user.avatar ?? '',
  role: normalizeRole(user.role),
  organization: user.organization ?? null,
})

const sendAuthError = (res, statusCode, message) =>
  res.status(statusCode).json(new ApiResponse(statusCode, null, message))

const login = asyncHandler(async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  const requestedRole = normalizeRole(req.body?.role)
  const rememberMe = req.body?.rememberMe === true
console.log(email,password, requestedRole, rememberMe ,"data");

  if (!email || !password || !requestedRole) {
    return sendAuthError(res, 400, 'Email, password, and role are required')
  }

  const user = await User.findOne({ email }).select('+password').populate('organization')
  if (!user || !(await user.isPasswordCorrect(password))) {
    return sendAuthError(res, 401, 'Invalid email or password')
  }

  if (normalizeRole(user.role) !== requestedRole) {
    return sendAuthError(res, 403, 'Selected role does not match this account')
  }

  const { accessToken, refreshToken } = await generateTokens(user._id, rememberMe)
  const ageOptions = rememberMe ? { maxAge: persistentCookieAge } : {}

  return res
    .cookie('accessToken', accessToken, { ...cookieOptions, ...ageOptions })
    .cookie('refreshToken', refreshToken, { ...cookieOptions, ...ageOptions })
    .status(200)
    .json(new ApiResponse(200, { user: [safeUser(user)] }, 'Login successful'))
})

const getCurrentUser = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken
  const refreshToken = req.cookies?.refreshToken
  const accessSecret = process.env.ACCESS_TOKEN_SECRET
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET || accessSecret

  let user = null
  if (accessToken && accessSecret) {
    try {
      const decoded = jwt.verify(accessToken, accessSecret)
      user = await User.findById(decoded._id).populate('organization')
    } catch {
      user = null
    }
  }

  if (!user && refreshToken && refreshSecret) {
    try {
      const decoded = jwt.verify(refreshToken, refreshSecret)
      user = await User.findOne({ _id: decoded._id, refreshToken })
        .select('+refreshToken')
        .populate('organization')
      if (user) {
        const renewedAccessToken = await user.generateAccessToken()
        res.cookie('accessToken', renewedAccessToken, cookieOptions)
      }
    } catch {
      user = null
    }
  }

  if (!user) {
    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
    return sendAuthError(res, 401, 'Session is missing or expired')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user: [safeUser(user)] }, 'Session restored'))
})

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken
  if (refreshToken) {
    await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } })
  }

  return res
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, 'Logout successful'))
})

export { login, getCurrentUser, logout }