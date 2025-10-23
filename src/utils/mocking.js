// src/utils/mocking.js
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

async function hashPassword(plain = 'coder123') {
  const saltRounds = 10;
  return await bcrypt.hash(plain, saltRounds);
}

async function generateUsers(n = 50) {
  const hashed = await hashPassword('coder123');
  const users = [];
  for (let i = 0; i < n; i++) {
    const role = Math.random() < 0.15 ? 'admin' : 'user';
    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: hashed,
      role,
      pets: []
    });
  }
  return users;
}

function generatePets(n = 20) {
  const pets = [];
  for (let i = 0; i < n; i++) {
    pets.push({
      _id: new mongoose.Types.ObjectId(),
      name: faker.animal.dog(),
      species: faker.animal.type ? faker.animal.type() : faker.animal.dog(),
      age: faker.number.int({ min: 1, max: 15 })
    });
  }
  return pets;
}

module.exports = {
  generateUsers,
  generatePets
};