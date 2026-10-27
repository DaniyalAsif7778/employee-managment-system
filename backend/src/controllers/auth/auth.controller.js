import process from 'process';
import { User } from '../../models/auth/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { generateTokens } from '../../utils/generateTokens.js';

import { Organization } from '../../models/organization/organization.model.js';
import { Otp } from '../../models/auth/otp.model.js';
import { Admin } from '../../models/roles/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
// import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { sendEmail } from '../../utils/sendEmail.js';
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
  const {
    fullName,
    email,
    password,
    orgName,
    address,
    industry,
    companySize,
  } = req.body;

  // admin registeration


  const [organizationSearch ,adminUser  ] = await Promise.all([
    Organization.findOne({
      $or: [{ orgName }, { email }, { address }],
    }), 
    User.findOne({
      $or: [{ email }],
    }),
  ]);
  console.log(adminUser, organizationSearch);
// &&  adminUser?.isPasswordCorrect(password)
  if (adminUser ) {
    return res.status(401).json(new ApiError(401, 'InValid Creadentials', [{ email: 'email is invalid' }] ));
  }
   
  if (organizationSearch) {
        return res.status(400).json(new ApiError(400, 'Orgnaization already exists',  [{ orgName: 'Organization name is already taken'  , address:"Address is already taken"}] ));
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
      avatar: '',
    }),
    User.create({
      user: adminId,
      fullName,
      organization: orgId,
      email,
      password,
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

const sendOTP = asyncHandler(async (req, res) => {
  const { fullName, role, email } = req.body;

  if (!fullName || !role || !email) {
    throw new ApiError(401, 'all info is required');
  }

  const { hashedOTP } = await generateSecureOTP();
  console.log(hashedOTP);

  if (!hashedOTP) {
    throw new ApiError(404, 'error in otp generation');
  }
  console.log(hashedOTP);

  const verificationOtp = await Otp.create({
    otp: hashedOTP,
  });

  console.log(verificationOtp);

  const link = ` ${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-otp?token=${verificationOtp.otp}`;
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your OTP</title>
  <style>
    body, table, td, a { text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    /* Interactive Button Transitions matching your brand color */
    .btn-verify:hover { background-color: #007d70 !important; }
  </style>
</head>
<body>
  <!-- Centered viewport container wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 48px 16px;">
    <tr>
      <td align="center">
        <!-- Main Structured Card Frame -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02), 0 8px 10px -6px rgba(0, 0, 0, 0.02); padding: 40px;">
          
          <tr>
            <td align="left" style="padding-bottom: 36px;">
              <span style="color: #009F8E; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">${'EMS'}</span>
            </td>
          </tr>

          <!-- Primary Header Text -->
          <tr>
            <td align="left" style="padding-bottom: 16px;">
              <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; line-height: 32px;">Verify your identity</h1>
            </td>
          </tr>

          <!-- Contextual Explanatory Copy with Dynamic Role Injection -->
          <tr>
            <td align="left" style="padding-bottom: 32px; color: #334155; font-size: 15px; line-height: 24px;">
              Hello,<br><br>
              You have been invited to join the platform as a data-verified <strong style="color: #009F8E; font-weight: 600;">${role}</strong>. Use the security button below to verify your account. This verification link is valid for <strong style="color: #009F8E; font-weight: 600;">5 minutes</strong>. Do not forward or share this link with anyone.
            </td>
          </tr>

          <!-- Standardized Bulletproof Button Block with brand primary color #009F8E -->
          <tr>
            <td align="center" style="padding-bottom: 12px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #009F8E;">
                    <a href="${link}" target="_blank" class="btn-verify" style="display: block; padding: 14px 40px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; letter-spacing: 0.2px; transition: background-color 0.2s ease;">
                      Verify Account
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Technical Footer -->
          <tr>
            <td align="center" style="border-top: 1px solid #f1f5f9; margin-top: 24px; padding-top: 32px; color: #94a3b8; font-size: 12px; line-height: 20px;">
              If you did not request this email, you can safely ignore it. <br>
              &copy; 2026 EMS. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const response = await sendEmail('EMS verify otp', htmlTemplate, email);

  res.status(200).json(
    new ApiResponse(
      201,
      {
        response,
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
  sendOTP,
  verifyOTP,
};
