const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    progress: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    progressLabel: {
      type: String,
      default: '',
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    targetSales: {
      type: Number,
      default: 0,
    },
    parents: [],
    parent: { type: mongoose.Schema.ObjectId, default: null },
    children: [],
  },
  { timestamps: true },
);

module.exports = mongoose.model('category', categorySchema);
