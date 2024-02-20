const Joi = require('joi');
const _ = require('lodash');

/**
 * Validate request object using Joi.
 * Use to validate request's body, query, and param properties.
 */
exports.validate = (schema) => (req, res, next) => {
  if (!schema) return next();
  if (!Joi.isSchema(schema)) throw new Error('Invalid Joi schema');

  const schemaKeys = Object.keys(schema.describe().keys);
  const reqPropsToValidate = _.pick(req, schemaKeys);

  const { error, value } = schema.validate(reqPropsToValidate);

  if (error) return next(error);

  _.merge(req, value);

  return next();
};
