// src/models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  pets: { type: [mongoose.Schema.Types.ObjectId], default: [] } // referencia a Pets opcional
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);