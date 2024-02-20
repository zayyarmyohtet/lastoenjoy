const { ValidationError } = require('joi');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const { code = 500, message = 'Internal server error' } = err;

  code === 500 && console.log(err);

  return res.status(code).json({ code, message });
};
