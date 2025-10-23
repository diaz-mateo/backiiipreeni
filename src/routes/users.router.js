const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// GET /api/users  -> listar todos (con paginado simple opcional)
router.get('/', async (req, res) => {
  try {
    // opcional: ?limit=50&skip=0
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const users = await User.find().skip(skip).limit(limit).lean();
    res.status(200).json({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/users/:id -> obtener por id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', payload: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;