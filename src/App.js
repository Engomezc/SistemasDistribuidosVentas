import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Cambié Switch por Routes
import Inicio from './pages/Inicio';
import VentasList from './components/VentasList';
import ProductosList from './components/ProductosList';
import ClientesList from './components/ClientesList';
import RegistrarForm from './components/RegistrarForm';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
          {}
          <Route path="/" element={<Inicio />} />         {/* Cambié component por element */}
          
          {}
          <Route path="/registrar" element={<RegistrarForm />} />
          <Route path="/ventas" element={<VentasList />} /> {/* Cambié component por element */}
          <Route path="/productos" element={<ProductosList />} /> {/* Cambié component por element */}
          <Route path="/clientes" element={<ClientesList />} /> {/* Cambié component por element */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
