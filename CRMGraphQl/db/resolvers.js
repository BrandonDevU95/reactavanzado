const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');

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

         const existeUsuario = await Usuario.findOne({ email });
         if (!existeUsuario) {
            throw new Error('El usuario no existe');
         }
      },
   },
};

module.exports = resolvers;
