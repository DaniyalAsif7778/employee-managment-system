import { Organization } from '../../models/ organization.models.js';
import { User, Otp } from '../../models/user.models.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { generateTokens } from '../../utils/generateTokens.js';
const registerOrgnaization = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    orgName,
    orgSlug,
    address,
    companySize,
    organizationEmail,
  } = req.body;

  // admin registeration

  if (
    [
      fullName,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      orgName,
      orgSlug,
      address,
      companySize,
      organizationEmail,
    ].some((field) => field == '')
  ) {
    throw new ApiError(400, 'fill all fields');
  }

  const organizationSearch = await Organization.findOne({
    $or: [{ orgName }, { organizationEmail }],
  });
  console.log(organizationSearch);

  if (organizationSearch) {
    throw new ApiError(400, 'Orgnaization already exists');
  }

  const adminUser = await User.findOne({
    $or: [{ email }, { username }, { password }],
  });

  if (adminUser) {
    throw new ApiError(400, 'admin already exists');
  }
  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const org_avatarLocalPath = req.files?.org_avatar[0]?.path;
  let org_coverImageLocalPath;

  if (req.files?.org_coverImage.length >= 0) {
    org_coverImageLocalPath = req.files?.org_coverImage[0].path;
    console.log(org_coverImageLocalPath);
  }

  if (!avatarLocalPath) {
    throw new ApiError(404, 'avatar must required');
  }
  if (!org_avatarLocalPath) {
    throw new ApiError(404, 'org_avatar must required');
  }

  const org_avatarCloudinary = await uploadOnCloudinary(org_avatarLocalPath);
  const org_CoverImageCloudinary = await uploadOnCloudinary(
    org_coverImageLocalPath
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

  Number(companySize);
  const organization = await Organization.create({
    organizationName: orgName,
    organizationSlug: orgSlug,
    organizationEmail: organizationEmail,
    companySize,
    address,
    org_avatar: org_avatarCloudinary?.url || '',
    org_coverImage: org_CoverImageCloudinary?.url || '',
  });
  const admin = await User.create({
    fullName,
    username,
    email,
    phoneNumber,
    password,
    organizationEmail,
    organization: organization._id,
    role: 'Admin',
    avatar: avatarCloudinary?.url || '',
  }).select('-password -refreshToken');
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
          admin,
          organization,
        },
      },
      'admin and org created successfully'
    )
  );
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const newUserName = username.replace(' ', '').toLowerCase();

  if (!username) {
    throw new ApiError(401, 'user is required');
  }
  const user = await User.findOne({ username: newUserName });
  console.log(user);

  if (!user) {
    throw new ApiError(401, 'unAthorized Request');
  }

  let { accessToken, refreshToken } = await generateTokens(user._id);

  const adminAndOrg = await User.aggregate([
    {
      $match: {
        username: newUserName,
      },
    },

    {
      $lookup: {
        from: 'organizations',
        localField: 'organization',
        foreignField: '_id',
        as: 'organization',
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        email: 1,
        role: 1,
        refreshToken: 1,
        accessToken: accessToken,
        organization: { $first: '$organization' },
      },
    },
  ]);

  if (!adminAndOrg) {
    throw new ApiError(402, 'nothing found');
  }
  console.log(adminAndOrg[0]._id);
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: adminAndOrg,
        },
        'login successfully'
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
const verifyOTP = asyncHandler(async ( ) => {

 

});
export { registerOrgnaization, loginAdmin, sendOTP, verifyOTP };
