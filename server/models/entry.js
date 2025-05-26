const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  transport: String,
  diet: String,
  electricity: Number,
  carbon: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }); // <-- this adds createdAt + updatedAt automatically

module.exports = mongoose.model('Entry', entrySchema);
