const mongoose = require('mongoose');

const ClientesSchemma = new mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true,
   },
   apellido: {
      type: String,
      required: true,
      trim: true,
   },
   empresa: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
   },
   telefono: {
      type: String,
      trim: true,
   },
   creado: {
      type: Date,
      default: Date.now,
   },
   vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      trim: true,
   },
});

module.exports = mongoose.model('Ciente', ClientesSchemma);
