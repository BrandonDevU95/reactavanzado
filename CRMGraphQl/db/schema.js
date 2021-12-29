const { gql } = require('apollo-server');

//Schema
const typeDefs = gql`
   type Usuario {
      id: ID
      nombre: String
      apellido: String
      email: String
      creado: String
   }

   type Token {
      token: String
   }

   type Producto {
      id: ID
      nombre: String
      existencia: Int
      precio: Float
      creado: String
   }

   type Query {
      obtenerUsuario(token: String!): Usuario
   }

   input UsuarioInput {
      nombre: String!
      apellido: String!
      email: String!
      password: String!
   }

   input AutenticarInput {
      email: String!
      password: String!
   }

   input ProductoInput {
      nombre: String!
      existencia: Int!
      precio: Float!
   }

   type Mutation {
      #Usuarios
      nuevoUsuario(input: UsuarioInput): Usuario
      autenticarUsuario(input: AutenticarInput): Token

      #Productos
      nuevoProducto(input: ProductoInput): Producto
   }
`;

module.exports = typeDefs;
