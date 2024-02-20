const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema(
  {
    login_id: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => v && v.length === 2,
        message: () => 'It must be 8 characters long.',
      },
    },
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      maxlength: 45,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

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

module.exports = mongoose.model('Admin', schema);
