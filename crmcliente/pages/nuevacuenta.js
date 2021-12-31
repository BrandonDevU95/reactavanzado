import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function NuevaCuenta() {
   const formik = useFormik({
      initialValues: {
         nombre: '',
         apellido: '',
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         nombre: Yup.string().required('El nombre es obligatorio'),
         apellido: Yup.string().required('El apellido es obligatorio'),
         email: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio'),
         password: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
      }),
      onSubmit: (values) => {
         console.log(values);
      },
   });

   return (
      <>
         <Layout>
            <h1 className="text-center text-2xl text-white">
               Crear Nueva Cuenta
            </h1>
            <div className="flex justify-center mt-5">
               <div className="w-full max-w-sm">
                  <form
                     className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                     onSubmit={formik.handleSubmit}
                  >
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
                           value={formik.values.nombre}
                           onChange={formik.handleChange}
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
                           value={formik.values.apellido}
                           onChange={formik.handleChange}
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
                           value={formik.values.email}
                           onChange={formik.handleChange}
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
                           value={formik.values.password}
                           onChange={formik.handleChange}
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
