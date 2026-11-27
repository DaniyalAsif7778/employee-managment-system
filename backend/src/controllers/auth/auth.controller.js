import process from 'process';
import { User } from '../../models/auth/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { generateTokens } from '../../utils/generateTokens.js';
import { Organization } from '../../models/organization/organization.model.js';
import { Otp } from '../../models/auth/otp.model.js';
import { Admin } from '../../models/roles/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
 import { normalizeRole, safeUser } from '../../utils/auth.utils.js';
import { generateSecureOTP } from '../../utils/generateOtp.js';
import mongoose from 'mongoose';
import { sendDynamicEmail } from '../../services/emailService.js';
const persistentCookieAge = 30 * 24 * 60 * 60 * 1000;

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax', // 'none' allows cross-domain HTTPS; 'lax' works on localhost HTTP
  path: '/',
};

const login = asyncHandler(async (req, res) => {
  const email =
    typeof req.body?.email === 'string'
      ? req.body.email.trim().toLowerCase()
      : '';
   const password =
    typeof req.body?.password === 'string' ? req.body.password : '';
   const requestedRole = normalizeRole(req.body?.role);
  const rememberMe = req.body?.rememberMe === true;

  if (!email || !password || !requestedRole) {
    throw new ApiError(400, 'Email, password, and role are required');
  }

  const user = await User.findOne({ email })
    .select('+password')
    .populate('organization');
   if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = await generateTokens(
    user._id,
    rememberMe
  );
  const ageOptions = rememberMe ? { maxAge: persistentCookieAge } : {};

  return res
    .cookie('accessToken', accessToken, { ...cookieOptions, ...ageOptions })
    .cookie('refreshToken', refreshToken, { ...cookieOptions, ...ageOptions })
    .status(200)
    .json(new ApiResponse(200, { user: [safeUser(user)] }, 'Login successful'));
});



const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: [safeUser(req.user)] }, 'Session restored')
    );
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } });
  }

  return res
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, 'Logout successful'));
});

const registerOrgnaization = asyncHandler(async (req, res) => {
  const { fullName, email, password, orgName, address, industry, companySize } =
    req.body;

  // admin registeration

  const [organizationSearch, adminUser] = await Promise.all([
    Organization.findOne({
      $or: [{ orgName }, { email }, { address }],
    }),
    User.findOne({
      $or: [{ email }],
    }),
  ]);
    if (adminUser) {
    return res
      .status(401)
      .json(
        new ApiError(401, 'InValid Creadentials', [
          { email: 'email is invalid' },
        ])
      );
  }

  if (organizationSearch) {
    return res.status(400).json(
      new ApiError(400, 'Orgnaization already exists', [
        {
          orgName: 'Organization name is already taken',
          address: 'Address is already taken',
        },
      ])
    );
  }
  const orgId = new mongoose.Types.ObjectId();
  const adminId = new mongoose.Types.ObjectId();

  // 2. SLUG VARS & NAME PARSING
  const slug = orgName.replace(/\s+/g, '-').toLowerCase();

  // 3. RUN ALL 3 QUERIES CONCURRENTLY (NO SESSIONS)
  const [organization, admin, user] = await Promise.all([
    Organization.create({
      _id: orgId,
      orgName,
      orgSlug: slug,
      adminEmail: email,
      companySize,
      industry,
      address,
      org_avatar: '',
      org_CoverImage: '',
     }),
    Admin.create({
      _id: adminId,
      fullName,
      organization: orgId,
      role: 'admin',
       email,

      avatar: '',
    }),
    User.create({
      user: adminId,
      fullName,
      organization: orgId,
      email,
      password,
      status: 'unVerified',

      role: 'admins',
      profileId: adminId,
    }),
  ]);

 
  if (!organization || !admin || !user) {
    throw new ApiError(500, 'Something went wrong during entity creation.');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: admin, organization },
        'Admin and organization created successfully'
      )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
 
  if (!email) {
    throw new ApiError(401, 'Email is required');
  }
  const user = await User.findOne({ email });
 
  if (!user) {
    throw new ApiError(404, 'Email is not registered');
  }
  const { hashedOTP } = await generateSecureOTP();
  console.log(hashedOTP);

  if (!hashedOTP) {
    throw new ApiError(404, 'Something went wrong. Please try again later.');
  }
 
  const verificationOtp = await Otp.create({
    user: user._id,
    otp: hashedOTP,
    type: 'EMAIL_VERIFICATION',
  });
 
  if (!verificationOtp) {
    throw new ApiError(500, 'Something went wrong. Please try again later.');
  }
  const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const fullVerificationUrl = `${baseUrl}/verifyOtp?token=${verificationOtp.otp}`;
 
   const sendEmail = await sendDynamicEmail(
    user.email,
    `Welcome to our platform, ${user.fullName}!`,
    'verifyEmail',
    {
      name: user.fullName,
      email: user.email,
      role: user.role,
      year: '2026',
      verificationUrl: fullVerificationUrl,
    }
  );
  if (!sendEmail) {
    throw new ApiError(
      500,
      'Something went wrong while sending the email. Please try again later.'
    );
  }

  return res.status(200).json(
    new ApiResponse(
      201,
      {
        response: 'ok',
        email,
      },
      'otp sent successfully'
    )
  );
});

const verifyOTP = asyncHandler(async (req, res) => {
   const token = req.query.token;

  const session = await mongoose.startSession();
  session.startTransaction();

   const [verifyUser] = await Otp.aggregate([
    {
      $match: {
        otp: token,
        type: 'EMAIL_VERIFICATION',  
      },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'user',  
        as: 'user',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        status: {
          $switch: {
            branches: [
              {
                case: { $eq: ['$isConsumed', true] },
                then: {
                  success: false,
                  consumed: true,
                  message: 'This token is expired. Please try again.',
                },
              },
              {
                case: {
                  $gt: [
                    { $subtract: [new Date(), '$createdAt'] },
                    5 * 60 * 1000, // 5 Minutes
                  ],
                },
                then: {
                  success: false,
                  expired: true,
                  message: 'This token has already expired.',
                },
              },
              {
                case: { $eq: [{ $type: '$user' }, 'missing'] },
                then: {
                  success: false,
                
                  message: 'Unauthorized Request. User session mismatch.',
                },
              },
            ],
            default: { success: true, message: 'Verification successful!' },
          },
        },
      },
    },
    // Final stage mapping
    {
      $project: {
        _id: 1, // ◄ PRESERVED: Keeps original primary key layout intact
        userId: '$user._id', // Maps the un-nested user object ID
        success: '$status.success', // Targets the local evaluation field
        message: '$status.message', // Targets the local evaluation field
      },
    },
  ]).session(session);

 
   if (!verifyUser) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(401)
      .json(
        new ApiError(401, 'Unauthorized request', [
          { error: 'Unauthorized request.' },
        ])
      );
  }

  // Case B: Pipeline caught an active security block (expired or already consumed)
  if (!verifyUser.success) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      success: false,
      
      message: verifyUser.message,
    });
  }

  // Case C: Success path! Execute updates concurrently using clean primary keys
  await Promise.all([
    User.updateOne(
      { _id: verifyUser.userId },
      { $set: { status: 'verified' } }
    ).session(session),
    Otp.updateOne(
      { _id: verifyUser._id }, // ◄ FIXED: Uses the clean, native MongoDB identifier
      { $set: { isConsumed: true } }
    ).session(session),
  ]);

  await session.commitTransaction();
  session.endSession();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { verified: true }, 'OTP successfully verified.')
    );
});

const sendPasswordResetEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    throw new ApiError(401, 'Email is required');
  }
  const user = await User.findOne({ email, status: 'verified' });
 
  if (!user) {
    throw new ApiError(404, 'Invalid email taken');
  }

  const { rawOTP } = await generateSecureOTP();
  console.log(rawOTP);

  if (!rawOTP) {
    throw new ApiError(404, 'error in otp generation');
  }
 
  const verificationOtp = await Otp.create({
    user: user?._id,
    otp: rawOTP, 
    type: 'PASSWORD_RESET',
  });
  console.log(verificationOtp);
  const resetToken = await verificationOtp.generateResetToken();
  verificationOtp.resetToken = resetToken;
  await verificationOtp.save({ validateBeforeSave: false });

  if (!verificationOtp) {
    throw new ApiError(500, 'Error in creating  OTP');
  }
  const otp = verificationOtp?.otp;

  // 2. Add the job to the queue (Runs instantly via Redis)
  const sendEmail = await sendDynamicEmail(
    user.email,
    `Welcome to our platform, ${user.fullName}!`,
    'resetPassword',
    {
      name: user.fullName,
      email: user.email,
      role: user.role,
      year: '2026',
      verificationUrl: otp,
    }
  );
  if (!sendEmail) {
    throw new ApiError(
      500,
      'Something went wrong while sending the email. Please try again later.'
    );
  }

  return res
    .cookie('resetToken', resetToken, { ...cookieOptions })
    .status(200)
    .json(
      new ApiResponse(200, { verified: true }, 'OTP successfully verified.')
    );
});

const verifyPasswordResetOTP = asyncHandler(async (req, res) => {
  const token = req.body?.otp;
  const session = await mongoose.startSession();
  session.startTransaction();

  // Run the aggregation pipeline bound to your Atlas session
  const [verifyUser] = await Otp.aggregate([
    {
      $match: {
        otp: token,
        type: 'PASSWORD_RESET', // If your schema stores OTPs as numbers, wrap this in: Number(token)
      },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'user', // ◄ Double-check: Make sure the field on your OTP schema is exactly 'user'
        as: 'user',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        status: {
          $switch: {
            branches: [
              {
                case: { $eq: ['$isConsumed', true] },
                then: {
                  success: false,
                  message: 'This token has already been used.',
                },
              },
              {
                case: {
                  $gt: [
                    { $subtract: [new Date(), '$createdAt'] },
                    5 * 60 * 1000, // 5 Minutes
                  ],
                },
                then: {
                  success: false,
                  message: 'This token has already expired.',
                },
              },
              {
                case: { $eq: [{ $type: '$user' }, 'missing'] },
                then: {
                  success: false,
                  message: 'Unauthorized Request. ',
                },
              },
            ],
            default: { success: true, message: 'Verification successful!' },
          },
        },
      },
    },
    // Final stage mapping
    {
      $project: {
        _id: 1, // ◄ PRESERVED: Keeps original primary key layout intact
        userId: '$user._id', // Maps the un-nested user object ID
        success: '$status.success', // Targets the local evaluation field
        message: '$status.message', // Targets the local evaluation field
      },
    },
  ]).session(session);

 
  // Case A: The query returned empty because the token string doesn't match any document
  if (!verifyUser) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(401)
      .json(
        new ApiError(401, 'Unauthorized request', [
          { error: 'Invalid verification token.' },
        ])
      );
  }

  // Case B: Pipeline caught an active security block (expired or already consumed)
  if (!verifyUser.success) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      success: false,
      message: verifyUser.message,
    });
  }

  // Case C: Success path! Execute updates concurrently using clean primary keys
  await Promise.all([
    User.updateOne(
      { _id: verifyUser.userId },
      { $set: { status: 'verified' } }
    ).session(session),
    Otp.updateOne(
      { _id: verifyUser._id }, // ◄ FIXED: Uses the clean, native MongoDB identifier
      { $set: { isConsumed: true } }
    ).session(session),
  ]);

  await session.commitTransaction();
  session.endSession();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { verified: true }, 'OTP successfully verified.')
    );
});

const ResetUserPassword = asyncHandler(async (req, res) => {
  // 2. Capture the new password from the request body
  // 3. Verify the token and update the user's password in the database
  // 4. Return a success response or an error if the token is invalid or expired
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(400, 'New password is required');
  }
  const user = req.user; // Assuming the user is attached to the request in the verifyJwt middleware
  console.log(user, 'user from req');
  if (!user) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const updateUser = await User.findById(user._id);

  if (!updateUser) {
    throw new Error('User not found');
  }

  updateUser.password = newPassword;
  await updateUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { message: 'Password updated successfully' }));
});

export {
  login,
  getCurrentUser,
  logout,
  registerOrgnaization,
  verifyEmail,
  verifyOTP,
  sendPasswordResetEmail,
  verifyPasswordResetOTP,
  ResetUserPassword,
};
