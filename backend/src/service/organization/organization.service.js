import { Organization } from '../../models/ organization.models.js';
import { User } from '../../models/user.models.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHanlder.js';

const registerOrgnaization = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { organization, admin } = req.body;

  // admin registeration

  const { fullName, username, email, phoneNumber, password, confirmPassword } =
    admin;
  const { orgName, orgSlug, address, companySize, organizationEmail } =
    organization;

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

  Number(companySize);
  const orgAfterCreation = await Organization.create({
    organizationName: orgName,
    organizationSlug: orgSlug,
    organizationEmail: organizationEmail,
    companySize,
    address,
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
  });
  if (!orgAfterCreation) {
    throw new ApiError(404, 'Something went wrong');
  }
  if (!adminAfterCreation) {
    throw new ApiError(404, 'Something went wrong');
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        adminAfterCreation,
        orgAfterCreation,
      },
      'admin and org created successfully'
    )
  );
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;



});
export { registerOrgnaization, loginAdmin };
 