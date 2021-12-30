const Usuario = require('../models/Usuarios');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
   const { id, email, nombre, apellido } = usuario;
   return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

const resolvers = {
   Query: {
      obtenerUsuario: async (_, { token }) => {
         const usuarioId = await jwt.verify(token, process.env.SECRETA);
         return usuarioId;
      },
      obtenerProductos: async () => {
         try {
            const productos = await Producto.find({});
            return productos;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerProducto: async (_, { id }) => {
         try {
            const producto = await Producto.findById(id);

            if (!producto) {
               throw new Error('Producto no encontrado');
            }

            return producto;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerClientes: async () => {
         try {
            const clientes = await Cliente.find({});
            return clientes;
         } catch (error) {
            console.log(error);
         }
      },
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
      nuevoProducto: async (_, { input }) => {
         try {
            const producto = new Producto(input);
            const resultado = await producto.save();
            return resultado;
         } catch (error) {
            console.log(error);
         }
      },
      actualizarProducto: async (_, { id, input }) => {
         try {
            let producto = await Producto.findById(id);

            if (!producto) {
               throw new Error('Producto no encontrado');
            }

            producto = await Producto.findOneAndUpdate({ _id: id }, input, {
               new: true,
            });
            return producto;
         } catch (error) {
            console.log(error);
         }
      },
      eliminarProducto: async (_, { id }) => {
         try {
            let producto = await Producto.findById(id);

            if (!producto) {
               throw new Error('Producto no encontrado');
            }

            await Producto.findOneAndDelete({ _id: id });
            return 'Producto Eliminado';
         } catch (error) {
            console.log(error);
         }
      },
      nuevoCliente: async (_, { input }, ctx) => {
         try {
            const { email } = input;
            const existeCliente = await Cliente.findOne({ email });
            if (existeCliente) {
               throw new Error('El cliente ya existe');
            }
            const cliente = new Cliente(input);
            cliente.vendedor = ctx.usuario.id;

            try {
               const resultado = await cliente.save();
               return resultado;
            } catch (error) {
               console.log(error);
            }
         } catch (error) {
            console.log(error);
         }
      },
   },
};

module.exports = resolvers;
