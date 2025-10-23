const express = require('express');
const Pet = require('../models/pet.model');
const router = express.Router();

// GET /api/pets  -> listar todos
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const pets = await Pet.find().skip(skip).limit(limit).lean();
    res.status(200).json({ status: 'success', payload: pets });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/pets/:id -> obtener por id
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).lean();
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet no encontrado' });
    res.json({ status: 'success', payload: pet });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;