import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import "./App.css";
import ProductsDemo from "./pages/TableProductosPage";
import SideBarPage from "./pages/SideBarPage";
import Page from "./pages/Page";
import UsersDemo from "./pages/datatable";

import ProductoComponent from "./pages/pruductoComponent";
import CategoriaComponent from "./pages/categoriaComponent";
import ProveedorComponent from "./pages/proveedorComponent";
import InventarioComponent from "./pages/inventarioComponent";

import ClienteComponent from "./pages/clienteComponent";
import MembresiaComponent from "./pages/membresiaComponent";




function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/products" element={<ProductsDemo />} />
          <Route path="/users" element={<UsersDemo />} />
          <Route path="/home" element={<SideBarPage />} />


          <Route path="/producto" element={<ProductoComponent />} />
          <Route path="/categoria" element={<CategoriaComponent />} />
          <Route path="/proveedor" element={<ProveedorComponent />} />
          <Route path="/inventario" element={<InventarioComponent />} />

          <Route path="/cliente" element={<ClienteComponent />} />
          <Route path="/membresia" element={<MembresiaComponent />} />




        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;



