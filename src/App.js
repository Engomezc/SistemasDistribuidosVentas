import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VentasList from './components/VentasList';
import RegistrarForm from './components/RegistrarForm';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Ventas</h1>
        <Routes>
          {}
          <Route path="/" element={<VentasList />} />
          
          {}
          <Route path="/registrar" element={<RegistrarForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
