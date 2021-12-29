const Usuario = require('../models/Usuarios');

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

         try {
            const usuario = new Usuario(input);
            usuario.save();
            return usuario;
         } catch (error) {
            console.log(error);
         }
      },
   },
};

module.exports = resolvers;
