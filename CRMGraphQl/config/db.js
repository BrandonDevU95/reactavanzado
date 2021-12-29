const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO, {
         useNewUrlParser: true,
      });
      console.log('Conectado a MongoDB');
   } catch (error) {
      console.log(error);
      process.exit(1); //Detiene la aplicación
   }
};

module.exports = conectarDB;
