const normalizeRole = (role) =>
  String(role ?? '')
    .trim()
    .toLowerCase();

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
});

export { normalizeRole, safeUser };
