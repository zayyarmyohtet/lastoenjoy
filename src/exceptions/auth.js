const ERRORS = {
  UNAUTHORIZED: { code: 403, message: 'Not authorized' },
};

class AuthError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = 'AuthError';
    this.code = code;
  }
}

module.exports = { AuthError, ERRORS };
