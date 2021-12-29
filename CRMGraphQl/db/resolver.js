const resolvers = {
   Mutation: {
      nuevoUsuario: (_, { input }) => {
         console.log('Creando...');
      },
   },
};

module.exports = resolvers;
