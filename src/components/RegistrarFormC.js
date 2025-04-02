import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ClientesService from "../services/ClientesService";
import '../App.css'; 

const RegistrarFormC = ({ clienteEditado, setclienteEditado }) => {
  const [cliente, setCliente] = useState({
    cedulaCliente: "",
    nombreCliente: "",
    emailCliente: "",
    direccionCliente: "",
    telefonoCliente: ""  
  });

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (clienteEditado) {
      setCliente(clienteEditado);
      setIsEditMode(true);
    }
  }, [clienteEditado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados:", cliente); 
      if (isEditMode) {
        await ClientesService.actualizarCliente(cliente);
        alert("Cliente actualizado correctamente");
      } else {
        await ClientesService.registrarCliente(cliente);
        alert("Cliente registrado correctamente");
      }

      setCliente({
        cedulaCliente: "",
        nombreCliente: "",
        emailCliente: "",
        direccionCliente: "",
        telefonoCliente: ""   
      });

      if (isEditMode) {
        setIsEditMode(false);
        setclienteEditado(null);
      }
    } catch (error) {
      alert("Error al procesar el cliente");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isEditMode ? "Actualizar Cliente" : "Registrar Cliente"}</h2>
      <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input type="text" name="cedulaCliente" value={cliente.cedulaCliente} onChange={handleInputChange} placeholder="Cedula Cliente" required/>
      </div>
      <div className="form-group">
        <input type="text" name="nombreCliente" value={cliente.nombreCliente} onChange={handleInputChange} placeholder="Nombre" required/>
      </div>
      <div className="form-group">
        <input type="email" name="emailCliente" value={cliente.emailCliente} onChange={handleInputChange} placeholder="Email" required/>
      </div>
      <div className="form-group">
        <input type="number" name="direccionCliente" value={cliente.direccionCliente} onChange={handleInputChange} placeholder="Dirección" required/>
      </div>
      <div className="form-group">
        <input type="number" name="telefonoCliente" value={cliente.telefonoCliente} onChange={handleInputChange} placeholder="Telefono" required />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-registrar">{isEditMode ? "Actualizar Cliente" : "Registrar Cliente"}</button>
        <button className="btn-registrar" type="button" onClick={() => navigate('/clientes ')}>Volver al listado</button>
      </div>        
      </form>
    </div>
  );
};

export default RegistrarFormC;
