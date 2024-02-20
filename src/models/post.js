const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 600,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'reported'],
      required: true,
    },
    reported_user_ids: {
      type: [String],
    },
    category_id: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Post', schema);
