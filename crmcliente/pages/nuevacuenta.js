import React from 'react';
import Layout from '../components/Layout';

export default function NuevaCuenta() {
   return (
      <>
         <Layout>
            <h1 className="text-center text-2xl text-white">
               Crear Nueva Cuenta
            </h1>
            <div className="flex justify-center mt-5">
               <div className="w-full max-w-sm">
                  <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                     <div className="mb-4">
                        <label
                           className="block br-gray-700 text-sm font-bold mb-2"
                           htmlFor="nombre"
                        >
                           Nombre
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                           id="nombre"
                           type="text"
                           placeholder="Nombre Usuario"
                        />
                     </div>
                     <div className="mb-4">
                        <label
                           className="block br-gray-700 text-sm font-bold mb-2"
                           htmlFor="apellido"
                        >
                           Apellido
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                           id="apellido"
                           type="text"
                           placeholder="Apellido Usuario"
                        />
                     </div>
                     <div className="mb-4">
                        <label
                           className="block br-gray-700 text-sm font-bold mb-2"
                           htmlFor="email"
                        >
                           Email
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                           id="email"
                           type="email"
                           placeholder="Email Usuario"
                        />
                     </div>
                     <div>
                        <label
                           className="block br-gray-700 text-sm font-bold mb-2"
                           htmlFor="password"
                        >
                           Password
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                           id="password"
                           type="password"
                           placeholder="Password Usuario"
                        />
                     </div>
                     <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value="Iniciar Sesión"
                     />
                  </form>
               </div>
            </div>
         </Layout>
      </>
   );
}
