const mongoose = require('mongoose');

const ProductosSchemma = new mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true,
   },
   existencia: {
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

ProductosSchemma.index({ nombre: 'text' });

module.exports = mongoose.model('Productos', ProductosSchemma);
