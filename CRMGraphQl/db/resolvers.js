const Usuario = require('../models/Usuarios');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
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
      obtenerClienteVendedor: async (_, {}, ctx) => {
         try {
            const clientes = await Cliente.find({
               vendedor: ctx.usuario.id.toString(),
            });
            return clientes;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerCliente: async (_, { id }, ctx) => {
         try {
            const cliente = await Cliente.findById(id);

            if (!cliente) {
               throw new Error('Cliente no encontrado');
            }

            if (cliente.vendedor.toString() !== ctx.usuario.id.toString()) {
               throw new Error('No tienes permisos para ver este cliente');
            }

            return cliente;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerPedidos: async () => {
         try {
            const pedidos = await Pedido.find({});
            return pedidos;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerPedidosVendedor: async (_, {}, ctx) => {
         try {
            const pedidos = await Pedido.find({
               vendedor: ctx.usuario.id.toString(),
            });
            return pedidos;
         } catch (error) {
            console.log(error);
         }
      },
      obtenerPedido: async (_, { id }, ctx) => {
         try {
            const pedido = await Pedido.findById(id);

            if (!pedido) {
               throw new Error('Pedido no encontrado');
            }

            if (pedido.vendedor.toString() !== ctx.usuario.id.toString()) {
               throw new Error('No tienes permisos para ver este pedido');
            }

            return pedido;
         } catch (error) {
            console.log(error);
         }
      },
      obtenetPedidoEstado: async (_, { estado }, ctx) => {
         try {
            const pedidos = await Pedido.find({
               estado,
               vendedor: ctx.usuario.id.toString(),
            });
            return pedidos;
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
      actualizarCliente: async (_, { id, input }, ctx) => {
         try {
            let cliente = await Cliente.findById(id);

            if (!cliente) {
               throw new Error('Cliente no encontrado');
            }

            if (cliente.vendedor.toString() !== ctx.usuario.id.toString()) {
               throw new Error(
                  'No tienes permisos para actualizar este cliente'
               );
            }

            cliente = await Cliente.findOneAndUpdate({ _id: id }, input, {
               new: true,
            });
            return cliente;
         } catch (error) {
            console.log(error);
         }
      },
      eliminarCliente: async (_, { id }, ctx) => {
         try {
            const cliente = await Cliente.findById(id);

            if (!cliente) {
               throw new Error('Cliente no encontrado');
            }

            if (cliente.vendedor.toString() !== ctx.usuario.id.toString()) {
               throw new Error('No tienes permisos para eliminar este cliente');
            }

            await Cliente.findOneAndDelete({ _id: id });
            return 'Cliente Eliminado';
         } catch (error) {
            console.log(error);
         }
      },
      nuevoPedido: async (_, { input }, ctx) => {
         try {
            const { cliente } = input;
            const existeCliente = await Cliente.findById(cliente);
            if (!existeCliente) {
               throw new Error('Cliente no encontrado');
            }

            if (
               existeCliente.vendedor.toString() !== ctx.usuario.id.toString()
            ) {
               throw new Error('No tienes permisos para realizar este pedido');
            }

            for await (const articulo of input.pedido) {
               const { id } = articulo;
               const producto = await Producto.findById(id);

               if (!producto) {
                  throw new Error('Producto no encontrado');
               }

               if (articulo.cantidad > producto.existencia) {
                  throw new Error(
                     `El producto ${producto.nombre} no tiene existencia suficiente`
                  );
               } else {
                  producto.existencia -= articulo.cantidad;
                  await producto.save();
               }
            }

            const nuevoPedido = new Pedido(input);
            nuevoPedido.vendedor = ctx.usuario.id;
            const resultado = await nuevoPedido.save();
            return resultado;
         } catch (error) {
            console.log(error.message);
         }
      },
      actualizarPedido: async (_, { id, input }, ctx) => {
         const { cliente } = input;
         try {
            let existePedido = await Pedido.findById(id);

            if (!existePedido) {
               throw new Error('Pedido no encontrado');
            }

            const existeCliente = await Cliente.findById(cliente);
            if (!existeCliente) {
               throw new Error('Cliente no encontrado');
            }

            if (
               existeCliente.vendedor.toString() !== ctx.usuario.id.toString()
            ) {
               throw new Error(
                  'No tienes permisos para actualizar este pedido'
               );
            }

            if (input.pedido) {
               for await (const articulo of input.pedido) {
                  const { id } = articulo;
                  const producto = await Producto.findById(id);

                  if (!producto) {
                     throw new Error('Producto no encontrado');
                  }

                  if (articulo.cantidad > producto.existencia) {
                     throw new Error(
                        `El producto ${producto.nombre} no tiene existencia suficiente`
                     );
                  } else {
                     producto.existencia -= articulo.cantidad;
                     await producto.save();
                  }
               }
            }

            const resultado = await Pedido.findOneAndUpdate(
               { _id: id },
               input,
               {
                  new: true,
               }
            );
            return resultado;
         } catch (error) {
            console.log(error);
         }
      },
      eliminarPedido: async (_, { id }, ctx) => {
         try {
            const pedido = await Pedido.findById(id);

            if (!pedido) {
               throw new Error('Pedido no encontrado');
            }

            if (pedido.vendedor.toString() !== ctx.usuario.id.toString()) {
               throw new Error('No tienes permisos para eliminar este pedido');
            }

            await Pedido.findOneAndDelete({ _id: id });
            return 'Pedido Eliminado';
         } catch (error) {
            console.log(error);
         }
      },
   },
};

module.exports = resolvers;
