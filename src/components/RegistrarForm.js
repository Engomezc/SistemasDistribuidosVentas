
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import VentasService from "../services/VentasService";
import '../App.css'; 

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
    <div className="form-container">
      <h2 className="form-title">{isEditMode ? "Actualizar Venta" : "Registrar Venta"}</h2>
      <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input type="text" name="codigoVenta" value={venta.codigoVenta} onChange={handleInputChange} placeholder="Codigo de Venta" required/>
      </div>
      <div className="form-group">
        <input type="text" name="cedulaCliente" value={venta.cedulaCliente} onChange={handleInputChange} placeholder="Cedula del cliente" required/>
      </div>
      <div className="form-group">
        <input type="text" name="cedulaUsuario" value={venta.cedulaUsuario} onChange={handleInputChange} placeholder="Cedula de usuario" required/>
      </div>
      <div className="form-group">
        <input type="number" name="ivaVenta" value={venta.ivaVenta} onChange={handleInputChange} placeholder="Iva venta" required/>
      </div>
      <div className="form-group">
        <input type="number" name="totalVenta" value={venta.totalVenta} onChange={handleInputChange} placeholder="Total venta" required />
      </div>
      <div className="form-group">
        <input type="number" name="valorVenta" value={venta.valorVenta} onChange={handleInputChange} placeholder="Valor venta" required/>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-registrar">{isEditMode ? "Actualizar Venta" : "Registrar Venta"}</button>
        <button className="btn-registrar" type="button" onClick={() => navigate('/ventas ')}>Volver al listado</button>
      </div>        
      </form>
    </div>
  );
};

export default RegistrarForm;
