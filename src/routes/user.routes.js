const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { validate } = require('../middlewares/validator');
const schemas = require('../validations/schemas/user');

router.post('/login', validate(schemas.LOGIN), controller.login);
router.post('/logout', controller.logout);
router.post('/signup', validate(schemas.SIGN_UP), controller.signUp);
router.post(
  '/signup-confirm',
  validate(schemas.CONFIRM_SIGN_UP),
  controller.confirmSignUp
);

module.exports = router;
