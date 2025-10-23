// src/routes/mocks.router.js
const express = require('express');
const router = express.Router();
const { generateUsers, generatePets } = require('../utils/mocking');
const mongoose = require('mongoose');

const User = require('../models/user.model');
const Pet = require('../models/pet.model');

router.get('/mockingusers', async (req, res) => {
  try {
    const amount = parseInt(req.query.amount) || 50;
    const users = await generateUsers(amount);
    res.status(200).json({ status: 'success', payload: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error generando usuarios' });
  }
});

router.get('/mockingpets', (req, res) => {
  try {
    const amount = parseInt(req.query.amount) || 20;
    const pets = generatePets(amount);
    res.status(200).json({ status: 'success', payload: pets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error generando pets' });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const { users: usersCount = 0, pets: petsCount = 0 } = req.body || {};

    const created = { users: 0, pets: 0 };

    if (Number(usersCount) > 0) {
      const usersToInsert = await generateUsers(Number(usersCount));
      await User.insertMany(usersToInsert);
      created.users = usersToInsert.length;
    }

    if (Number(petsCount) > 0) {
      const petsToInsert = generatePets(Number(petsCount));
      await Pet.insertMany(petsToInsert);
      created.pets = petsToInsert.length;
    }

    res.status(201).json({ status: 'success', created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error generando e insertando datos', detail: err.message });
  }
});

module.exports = router;