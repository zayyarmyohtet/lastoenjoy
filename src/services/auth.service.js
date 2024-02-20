const jwt = require('jsonwebtoken');
const { AuthError, ERRORS } = require('../exceptions/auth');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AuthError(ERRORS.UNAUTHORIZED);
  }
};

module.exports = { generateToken, verifyToken };
