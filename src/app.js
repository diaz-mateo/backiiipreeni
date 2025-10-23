// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Importar routers
const mocksRouter = require('./routes/mocks.router');
const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');

// ✅ Montar routers
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

// ✅ Endpoint de prueba de conexión
app.get('/api/test', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ ok: true, mensaje: 'Conexión a MongoDB exitosa 🚀' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Error conectando a MongoDB' });
  }
});

// ✅ Configurar servidor y conexión a MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

// ✅ Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

module.exports = app;