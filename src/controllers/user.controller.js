const authService = require('../services/auth.service');
const userService = require('../services/user.service');

const signUp = async (req, res, next) => {
  const payload = req.body;

  const token = authService.generateToken({ email: payload.email });
  await userService.signUp({ ...payload, token });

  res.set('Authorization', token);

  return res
    .status(201)
    .json({ message: `Verification had been sent to ${payload.email}` });
};

const confirmSignUp = async (req, res, next) => {
  const { email, token } = req.body;

  authService.verifyToken(token);

  const user = await userService.confirmSignUp({ email, token });

  return res.json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.login({ email, password });
  const token = authService.generateToken({ email });

  res.set('Authorization', token);

  return res.json({ user });
};

const logout = async (req, res, next) => {
  const { authorization } = req.headers;

  await userService.logout({ token: authorization });

  return res.json({ message: 'Logout successfully' });
};

module.exports = { signUp, confirmSignUp, login, logout };
