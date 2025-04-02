// src/components/VentasList.js
import React, { useEffect, useState } from "react";
import VentasService from "../services/VentasService";
import RegistrarForm from "./RegistrarForm";
import { Link } from 'react-router-dom'; // Importar Link

const ClientesList = () => {
  const [ventas, setVentas] = useState([]);
  const [ventaEditada, setVentaEditada] = useState(null);

  useEffect(() => {
    const obtenerVentas = async () => {
      const data = await VentasService.obtenerVentas();
      setVentas(data);
    };
    obtenerVentas();
  }, []);
  

  const handleEditarVenta = (venta) => {
    setVentaEditada(venta);
  };

  const handleEliminarVenta = async (codigoVenta) => {
    try {
      await VentasService.eliminarVenta(codigoVenta);
      alert("Venta eliminada correctamente");
      setVentas(ventas.filter((venta) => venta.codigoVenta !== codigoVenta)); // Eliminar de la lista
    } catch (error) {
      alert("Error al eliminar la venta");
    }
  };

  return (
    <div>
      <h2>Modulo de Ventas</h2>
      <Link to="/ventas">
        <button>Registrar nueva venta</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Código Venta</th>
            <th>Cédula Cliente</th>
            <th>Cédula Usuario</th>
            <th>Iva Venta</th>
            <th>Total Venta</th>
            <th>Valor Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.codigoVenta}>
              <td>{venta.codigoVenta}</td>
              <td>{venta.cedulaCliente}</td>
              <td>{venta.cedulaUsuario}</td>
              <td>{venta.ivaVenta}</td>
              <td>{venta.totalVenta}</td>
              <td>{venta.valorVenta}</td>
              <td>
                <button onClick={() => handleEditarVenta(venta)}>Editar</button>
                <button onClick={() => handleEliminarVenta(venta.codigoVenta)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar el formulario de edición si se selecciona una venta */}
      {ventaEditada && <RegistrarForm ventaEditada={ventaEditada} setVentaEditada={setVentaEditada} />}
    </div>
  );
};

export default ClientesList;