import { Organization } from '../../models/ organization.models.js';
import { User } from '../../models/user.models.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
const registerOrgnaization = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { organization, admin } = req.body;

  // admin registeration

  const {
    fullName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    avatar,
  } = admin;
  const {
    orgName,
    orgSlug,
    address,
    companySize,
    organizationEmail,
    org_avatar,
    org_coverImage,
  } = organization;

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
      avatar,
      org_avatar,
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

  Number(companySize);
  const orgAfterCreation = await Organization.create({
    organizationName: orgName,
    organizationSlug: orgSlug,
    organizationEmail: organizationEmail,
    companySize,
    address,
    org_avatar: '',
    org_coverImage: '',
  });
  const adminAfterCreation = await User.create({
    fullName,
    username,
    email,
    phoneNumber,
    password,
    organizationEmail,
    organization: orgAfterCreation._id,
    role: 'Admin',
    avatar: '',
  });
  if (!orgAfterCreation) {
    throw new ApiError(404, 'Something went wrong');
  }
  if (!adminAfterCreation) {
    throw new ApiError(404, 'Something went wrong');
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const org_avatarLocalPath = req.files?.avatar[0]?.path;
  const org_coverImageLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(404, 'avatar must required');
  }
  if (!org_avatarLocalPath) {
    throw new ApiError(404, 'org_avatar must required');
  }

  if (!org_coverImageLocalPath) {
    throw new ApiError(404, 'org_CoverImage must required');
  }

  const org_avatarCloudinary = uploadOnCloudinary(org_avatar);
  const org_CoverImageCloudinary = uploadOnCloudinary(org_coverImage);
  const avatarCloudinary = uploadOnCloudinary(avatar);

  if (!avatarCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary avatar');
  }
  if (!org_avatarCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary orgavatar');
  }

  if (!org_CoverImageCloudinary) {
    throw new ApiError(404, 'error on uploding clodinary orgCoverImage');
  }

  const organizationWithImages = Organization.findOneAndUpdate(
    orgAfterCreation._id,
    {
      $set: {
        org_avatar: org_avatarCloudinary?.url || '',
        org_coverImage: org_CoverImageCloudinary?.url || '',
      },
    },
    { validateBeforeSave: true }
  );
const userWithImage = User.findOneAndUpdate(
   adminAfterCreation._id ,
    {
      $set: {
       avatar:avatarCloudinary?.url || ""
      } 
    },
    { validateBeforeSave: true }
  );
  res.status(200).json(
    new ApiResponse(
      200,
      {
        Admin:userWithImage,
         Organization:organizationWithImages,
      },
      'admin and org created successfully'
    )
  );
});

const loginAdmin = asyncHandler(async () => {});
export { registerOrgnaization, loginAdmin };
