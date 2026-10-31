import process from 'process';
import { User } from '../../models/auth/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { generateTokens } from '../../utils/generateTokens.js';
import { emailQueue } from '../../qeue/emailQeue.js';
import { Organization } from '../../models/organization/organization.model.js';
import { Otp } from '../../models/auth/otp.model.js';
import { Admin } from '../../models/roles/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
// import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { normalizeRole, safeUser } from '../../utils/auth.utils.js';
import { generateSecureOTP } from '../../utils/generateOtp.js';
import mongoose from 'mongoose';
 const persistentCookieAge = 30 * 24 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
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

  if (normalizeRole(user.role) !== requestedRole) {
    throw new ApiError(403, 'Selected role does not match this account');
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
  console.log(adminUser, organizationSearch);
  // &&  adminUser?.isPasswordCorrect(password)
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
      status: 'unVerified',
    }),
    Admin.create({
      _id: adminId,
      fullName,
      organization: orgId,
      role: 'admin',
      status: 'unVerified',
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

  console.log(organization, admin, user);

  if (!organization || !admin || !user) {
    throw new ApiError(500, 'Something went wrong during entity creation.');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: admin, organization },
        'Admin, user account, and organization created successfully'
      )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
   const { email } = req.body;
  console.log(email, 'usr email for otp');

  if (!email) {
    throw new ApiError(401, 'Email is required');
  }
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new ApiError(404, 'Email is not registered');
  }
  const { hashedOTP } = await generateSecureOTP();
  console.log(hashedOTP);

  if (!hashedOTP) {
    throw new ApiError(404, 'error in otp generation');
  }
  console.log(hashedOTP);

  const verificationOtp = await Otp.create({
    user: user._id,
    otp: hashedOTP,
  });

  if (!verificationOtp) {
    throw new ApiError(500, 'Error in creating  OTP');
  }
  const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const fullVerificationUrl = `${baseUrl}/verify-otp?token=${verificationOtp}`;

  // 2. Add the job to the queue (Runs instantly via Redis)
 await emailQueue.add('send-welcome-email', {
    toEmail: email,
    subject: `Welcome to our platform, ${user.fullName}!`,
    templateName: 'verifyEmail', // Looks up src/templates/welcome.html
    templateData: {
      name:user.fullName,
      email: user.email,
      role: user.role,
      year: '2026',
      verificationUrl: fullVerificationUrl,
    },
  });
  console.log('job created'   );

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

const verifyOTP = asyncHandler(async () => {});
export {
  login,
  getCurrentUser,
  logout,
  registerOrgnaization,
  verifyEmail,
  verifyOTP,
};
