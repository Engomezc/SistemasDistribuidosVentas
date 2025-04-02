// src/pages/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div className="welcome-message">
        <h1>¡Bienvenidos a la tienda!</h1>
      </div>
      <div className="menu">
        <h2>Menú de opciones:</h2>
        <div className="menu-options">
          <Link className="menu-item" to="/ventas">Ventas</Link>
          <Link className="menu-item" to="/productos">Productos</Link>
          <Link className="menu-item" to="/clientes">Clientes</Link>
        </div>
      </div>
      <div className="select-message">
        <p>Seleccione un módulo para gestionar las ventas, productos o clientes.</p>
      </div>
    </div>  
  );
};

export default Inicio;
