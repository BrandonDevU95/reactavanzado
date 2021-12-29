const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
   const { id, email, nombre, apellido } = usuario;
   return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

const resolvers = {
   Query: {
      obtenerCursos: () => 'Hola mundo',
   },
   Mutation: {
      nuevoUsuario: async (_, { input }) => {
         const { email, password } = input;
         const existeUsuario = await Usuario.findOne({ email });
         if (existeUsuario) {
            throw new Error('El usuario ya existe');
         }

         const salt = await bcryptjs.genSalt(10);
         input.password = await bcryptjs.hash(password, salt);

         try {
            const usuario = new Usuario(input);
            usuario.save();
            return usuario;
         } catch (error) {
            console.log(error);
         }
      },
      autenticarUsuario: async (_, { input }) => {
         const { email, password } = input;
         //Si existe Usuario
         const existeUsuario = await Usuario.findOne({ email });
         if (!existeUsuario) {
            throw new Error('El usuario no existe');
         }
         //revisar si el password es correcto
         const passwordCorrecto = await bcryptjs.compare(
            password,
            existeUsuario.password
         );
         if (!passwordCorrecto) {
            throw new Error('El password es incorrecto');
         }
         //Crear el token
         return {
            token: crearToken(existeUsuario, process.env.SECRETA, '24h'),
         };
      },
   },
};

module.exports = resolvers;
