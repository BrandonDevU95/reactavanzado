const mongoose = require('mongoose');

const ProductosSchemma = new mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true,
   },
   exiatencia: {
      type: Number,
      required: true,
      trim: true,
   },
   precio: {
      type: Number,
      required: true,
      trim: true,
   },
   creado: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Productos', ProductosSchemma);
