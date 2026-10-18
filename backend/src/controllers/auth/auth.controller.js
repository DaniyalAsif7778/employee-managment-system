import process from 'process';
import { User } from '../../models/auth/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { generateTokens } from '../../utils/generateTokens.js';
import { Organization } from '../../models/organization/organization.model.js';
import { Otp } from '../../models/auth/otp.model.js';
import { Admin } from '../../models/roles/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { normalizeRole, safeUser } from '../../utils/auth.utils.js';
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
    confirmPassword,
    orgName,
    address,
    industry,
    companySize,
  } = req.body;

  // admin registeration

  if (
    [
      fullName,
      email,
      password,
      confirmPassword,
      orgName,
      address,
      industry,
      companySize,
    ].some((field) => field == '')
  ) {
    throw new ApiError(400, 'fill all fields');
  }

  const organizationSearch = await Organization.findOne({
    $or: [{ orgName }, { email }],
  });
  console.log(organizationSearch);

  if (organizationSearch) {
    throw new ApiError(400, 'Orgnaization already exists');
  }

  const usernameFromName = fullName.trim().replace(/\s+/g, '').toLowerCase();
  const adminUser = await User.findOne({
    $or: [{ email }, { username: usernameFromName }],
  });

  if (adminUser) {
    throw new ApiError(400, 'admin already exists');
  }
  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const org_avatarLocalPath = req.files?.org_avatar[0]?.path;
  let org_CoverImageLocalPath;

  if (req.files?.org_CoverImage?.length) {
    org_CoverImageLocalPath = req.files.org_CoverImage[0].path;
    console.log(org_CoverImageLocalPath);
  }

  if (!avatarLocalPath) {
    throw new ApiError(404, 'avatar must required');
  }
  if (!org_avatarLocalPath) {
    throw new ApiError(404, 'org_avatar must required');
  }

  const org_avatarCloudinary = await uploadOnCloudinary(org_avatarLocalPath);
  const org_CoverImageCloudinary = await uploadOnCloudinary(
    org_CoverImageLocalPath
  );
  const avatarCloudinary = await uploadOnCloudinary(avatarLocalPath);

  if (!avatarCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary avatar');
  }
  if (!org_avatarCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary orgavatar');
  }

  if (!org_CoverImageCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary orgCoverImage');
  }

  const organization = await Organization.create({
    orgName,

    adminEmail: email,
    companySize,
    industry,
    address,
    org_avatar: org_avatarCloudinary?.url || '',
    org_CoverImage: org_CoverImageCloudinary?.url || '',
  });
  const admin = await User.create({
    fullName,
    firstName: fullName.trim().split(/\s+/)[0] || '',
    lastName: fullName.trim().split(/\s+/).slice(1).join(' '),
    username: usernameFromName,
    email,
    password,
    organization: organization._id,
    role: 'admin',
    avatar: avatarCloudinary?.url || '',
  });
  await Admin.create({ user: admin._id, organization: organization._id });
  if (!organization) {
    throw new ApiError(404, 'Something went wrong');
  }
  if (!admin) {
    throw new ApiError(404, 'Something went wrong');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: admin._id.toString(),
          fullName: admin.fullName,
          firstName: admin.firstName,
          lastName: admin.lastName,
          username: admin.username,
          email: admin.email,
          avatar: admin.avatar,
          role: admin.role,
        },
        organization: {
          id: organization._id.toString(),
          orgName: organization.orgName,
          orgSlug: organization.orgSlug,
        },
      },
      'admin and org created successfully'
    )
  );
});

const sendOTP = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  console.log(fullName);

  if (!fullName) {
    throw new ApiError(401, 'sent user id');
  }
  const user = await User.findOne({ fullName });
  console.log(user);

  if (!user) {
    throw new ApiError(401, 'unAuthorized Request');
  }
  const { encryptedOtp } = await user.generateOtp();
  console.log(encryptedOtp);

  if (!encryptedOtp) {
    throw new ApiError(404, 'error in otp generation');
  }
  console.log(encryptedOtp);

  const verificationOtp = await Otp.create({
    otp: encryptedOtp,
  });
  console.log(verificationOtp);

  const link = `http://localhost:8000/api/vi/ems/verifyotp?id=${user._id}&token=${verificationOtp.otp}`;
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your OTP</title>
  <style>
    /* Absolute reset for consistent client rendering */
    body, table, td, a { text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    /* Interactive Button Transitions */
    .btn-verify:hover { background-color: #4338ca !important; }
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
              <span style="color: #0f172a; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">Your Company</span>
            </td>
          </tr>

          <!-- Primary Header Text -->
          <tr>
            <td align="left" style="padding-bottom: 16px;">
              <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; line-height: 32px;">Verify your identity</h1>
            </td>
          </tr>

          <!-- Contextual Explanatory Copy -->
          <tr>
            <td align="left" style="padding-bottom: 32px; color: #334155; font-size: 15px; line-height: 24px;">
              Hello,<br><br>
              Use the security button below to verify your account. This One-Time Password (OTP) is valid for <strong style="color: #0f172a; font-weight: 600;">5 minutes</strong>. Do not share this code with anyone.
            </td>
          </tr>

          <!-- Standardized Bulletproof Button Block -->
          <tr>
            <td align="center" style="padding-bottom: 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #4f46e5;">
                    <a href="${link}" target="_blank" class="btn-verify" style="display: block; padding: 14px 40px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; letter-spacing: 0.2px; transition: background-color 0.2s ease;">
                      Verify Account
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Manual Code Fallback Container Block -->
          <tr>
            <td align="left" style="border-top: 1px solid #f1f5f9; padding-top: 32px; padding-bottom: 36px;">
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 13px; line-height: 20px;">
                If the button above does not work, copy and paste your code manually on the verification page:
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 16px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 700; color: #0f172a; letter-spacing: 6px; padding-left: 6px;">123456</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Technical Footer -->
          <tr>
            <td align="center" style="color: #94a3b8; font-size: 12px; line-height: 20px;">
              If you did not request this email, you can safely ignore it. <br>
              &copy; 2026 Your Company. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const response = await sendEmail('EMS verify otp', htmlTemplate);

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
