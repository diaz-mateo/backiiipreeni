// src/routes/mocks.router.js
const express = require('express');
const router = express.Router();
const { generateUsers, generatePets } = require('../utils/mocking');
const mongoose = require('mongoose');

const User = require('../models/user.model');
const Pet = require('../models/pet.model');

/**
 * GET /api/mocks/mockingusers
 * Genera por defecto 50 usuarios y los devuelve (no inserta en DB).
 * Opcionalmente query ?amount=100
 */
router.get('/mockingusers', async (req, res) => {
  try {
    const amount = parseInt(req.query.amount) || 50;
    const users = await generateUsers(amount);
    // Simular formato de respuesta de Mongo: devolver documentos con _id y demás.
    res.status(200).json({ status: 'success', payload: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error generando usuarios' });
  }
});

/**
 * GET /api/mocks/mockingpets
 * Mueve/crea tu endpoint anterior de mockingpets aquí.
 * Opcional ?amount=20
 */
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

/**
 * POST /api/mocks/generateData
 * Body: { users: <num>, pets: <num> }
 * Genera e inserta en la DB la cantidad solicitada.
 */
router.post('/generateData', async (req, res) => {
  try {
    const { users: usersCount = 0, pets: petsCount = 0 } = req.body || {};

    const created = { users: 0, pets: 0 };

    // Generar usuarios e insertar
    if (Number(usersCount) > 0) {
      const usersToInsert = await generateUsers(Number(usersCount));
      // transformamos para quitar _id y dejar que mongoose cree sus propios _id o usar los que generamos:
      // Usaré los objetos tal cual (con _id generados) para que el formato quede como "Mongo".
      await User.insertMany(usersToInsert);
      created.users = usersToInsert.length;
    }

    // Generar pets e insertar
    if (Number(petsCount) > 0) {
      const petsToInsert = generatePets(Number(petsCount));
      // Insertar pets en DB
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