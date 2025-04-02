// src/components/ClientesList.js
import React, { useEffect, useState } from "react";
import ClientesService from "../services/ClientesService";
import RegistrarFormC from "./RegistrarFormC";
import { Link } from 'react-router-dom';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteEditado, setClienteEditado] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      const data = await ClientesService.obtenerCliente();
      setClientes(data);
    };
    obtenerCliente();
  }, []);
  

  const handleEditarCliente = (cliente) => {
    setClienteEditado(cliente);
  };

  const handleEliminarCliente = async (cedulaCliente) => {
    try {
      await ClientesService.eliminarCliente(cedulaCliente);
      alert("Cliente eliminado correctamente");
      setClientes(clientes.filter((cliente) => cliente.cedulaCliente !== cedulaCliente));
    } catch (error) {
      alert("Error al eliminar el cliente");
    }
  };

  return (
    <div className="ventas-container">
      <h2 className="titulo">Lista de Clientes</h2>
      <Link to="/clientes">
        <button className="btn-registrar">Registrar nuevo Cliente</button>
      </Link>
      <table className="ventas-table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.cedulaCliente}>
              <td>{cliente.cedulaCliente}</td>
              <td>{cliente.nombreCliente}</td>
              <td>{cliente.emailCliente}</td>
              <td>{cliente.direccionCliente}</td>
              <td>{cliente.telefonoCliente}</td>
              <td>
                <button className="btn-editar" onClick={() => handleEditarCliente(cliente)}>Editar</button>
                <button className="btn-eliminar" onClick={() => handleEliminarCliente(cliente.codigoCliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {clienteEditado && <RegistrarFormC clienteEditado={clienteEditado} setClienteEditado={setClienteEditado} />}
    </div>
  );
};

export default ClientesList;