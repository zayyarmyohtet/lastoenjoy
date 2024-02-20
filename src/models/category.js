const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 45,
    },
    created_by: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Category', schema, 'categories');
