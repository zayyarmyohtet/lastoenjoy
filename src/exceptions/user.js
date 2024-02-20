const ERRORS = {
  NOT_FOUND: { code: 404, message: 'Not Found' },
  UNAUTHORIZED: { code: 403, message: 'Not authorized' },
  DUPLICATE: { code: 409, message: 'User already exist' },
};

class UserError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = 'UserError';
    this.code = code;
  }
}

module.exports = { UserError, ERRORS };
