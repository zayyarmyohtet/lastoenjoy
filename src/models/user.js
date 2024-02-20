const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { AuthError, ERRORS } = require('../exceptions/auth');

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4,
    },
    user_name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 45,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 100,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
      maxlength: 400,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    user_type: {
      type: String,
      enum: ['normal', 'premium'],
      required: true,
      default: 'normal',
    },
    status: {
      type: String,
      enum: ['no_verify', 'verified', 'suspended'],
      required: true,
      default: 'no_verify',
    },
    updated_by: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

schema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.log(err);
    throw new AuthError(ERRORS.UNAUTHORIZED);
  }
};

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', schema);
