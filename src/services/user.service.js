const _ = require('lodash');
const User = require('../models/user');
const { UserError, ERRORS } = require('../exceptions/user');

const signUp = async (payload) => {
  const { email } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new UserError(ERRORS.DUPLICATE);

  const user = new User(payload);

  return await user.save();
};

const confirmSignUp = async ({ email, token }) => {
  const user = await User.findOneAndUpdate(
    { email, token },
    { status: 'verified' },
    { new: true }
  );

  if (!user) throw new UserError(ERRORS.UNAUTHORIZED);

  return user;
};

const login = async ({ email, password }) => {
  const basicFields = [
    'user_id',
    'user_name',
    'email',
    'bios',
    'status',
    'token',
  ];

  const user = await User.findOne({ email, status: 'verified' }).select([
    ...basicFields,
    'password',
  ]);

  if (!user) throw new UserError(ERRORS.NOT_FOUND);

  await user.comparePassword(password);

  return _.omit(user.toObject(), 'password');
};

const logout = async ({ token }) => {
  const user = await User.findOneAndUpdate({ token }, { token: '' });

  if (!user) throw new UserError(ERRORS.NOT_FOUND);

  return user;
};

module.exports = { signUp, confirmSignUp, login, logout };
