// src/models/pet.model.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);