// src/components/VentaForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import VentasService from "../services/VentasService";


const RegistrarForm = ({ ventaEditada, setVentaEditada }) => {
  const [venta, setVenta] = useState({
    codigoVenta: "",
    cedulaCliente: "",
    cedulaUsuario: "",
    ivaVenta: "",
    totalVenta: "",
    valorVenta: ""
    
  });

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (ventaEditada) {
      setVenta(ventaEditada);
      setIsEditMode(true);
    }
  }, [ventaEditada]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados:", venta); 
      if (isEditMode) {
        await VentasService.actualizarVenta(venta);
        alert("Venta actualizada correctamente");
      } else {
        await VentasService.registrarVenta(venta);
        alert("Venta registrada correctamente");
      }

      // Limpiar formulario después de la operación
      setVenta({
        codigoVenta: "",
        cedulaCliente: "",
        cedulaUsuario: "",
        ivaVenta: "",
        totalVenta: "",
        valorVenta: ""
        
      });

      if (isEditMode) {
        setIsEditMode(false);
        setVentaEditada(null);
      }
    } catch (error) {
      alert("Error al procesar la venta");
    }
  };

  return (
    <div>
      <h2>{isEditMode ? "Actualizar Venta" : "Registrar Venta"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <input type="text" name="codigoVenta" value={venta.codigoVenta} onChange={handleInputChange} />
        <input type="text" name="cedulaCliente" value={venta.cedulaCliente} onChange={handleInputChange} />
        <input type="text" name="cedulaUsuario" value={venta.cedulaUsuario} onChange={handleInputChange} />
        <input type="number" name="ivaVenta" value={venta.ivaVenta} onChange={handleInputChange} />
        <input type="number" name="totalVenta" value={venta.totalVenta} onChange={handleInputChange} />
        <input type="number" name="valorVenta" value={venta.valorVenta} onChange={handleInputChange} />
        <button type="submit">{isEditMode ? "Actualizar Venta" : "Registrar Venta"}</button>
      </form>
      <button onClick={() => navigate('/')}>Volver al listado</button>
    </div>
  );
};

export default RegistrarForm;
