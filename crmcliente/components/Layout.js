import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
   return (
      <>
         <Head>
            <title>CRM - Administración de Clientes</title>
            <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
               integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
               crossorigin="anonymous"
               referrerpolicy="no-referrer"
            />
            <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
               integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
               crossorigin="anonymous"
               referrerpolicy="no-referrer"
            />
         </Head>
         <Sidebar />
         {children}
      </>
   );
}
