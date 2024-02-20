const Joi = require('joi');

const SIGN_UP = Joi.object({
  body: Joi.object({
    user_name: Joi.string().min(4).max(45).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().required(),
  }),
});

const CONFIRM_SIGN_UP = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  }),
});

const LOGIN = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = { SIGN_UP, CONFIRM_SIGN_UP, LOGIN };
