import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProductosService from "../services/ProductosService";
import '../App.css'; 

const RegistrarFormP = ({ productoEditado, setproductoEditado }) => {
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    nitProveedor: "",
    precioCompra: "",
    precioVenta: "",
    ivaCompra: ""    
  });

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (productoEditado) {
      setProducto(productoEditado);
      setIsEditMode(true);
    }
  }, [productoEditado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados:", producto); 
      if (isEditMode) {
        await ProductosService.actualizarProducto(producto);
        alert("Venta actualizada correctamente");
      } else {
        await ProductosService.registrarProducto(producto);
        alert("Venta registrada correctamente");
      }

      setProducto({
        codigoProducto: "",
        nombreProducto: "",
        nitProveedor: "",
        precioCompra: "",
        precioVenta: "",
        ivaCompra: ""    
        
      });

      if (isEditMode) {
        setIsEditMode(false);
        setproductoEditado(null);
      }
    } catch (error) {
      alert("Error al procesar el producto");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isEditMode ? "Actualizar Producto" : "Registrar Producto"}</h2>
      <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input type="text" name="codigoProducto" value={producto.codigoProducto} onChange={handleInputChange} placeholder="Codigo Producto" required/>
      </div>
      <div className="form-group">
        <input type="text" name="nombreProducto" value={producto.nombreProducto} onChange={handleInputChange} placeholder="Nombre del Producto" required/>
      </div>
      <div className="form-group">
        <input type="text" name="nitProveedor" value={producto.nitProveedor} onChange={handleInputChange} placeholder="Nit del Proveedor" required/>
      </div>
      <div className="form-group">
        <input type="number" name="precioCompra" value={producto.precioCompra} onChange={handleInputChange} placeholder="Precio Compra" required/>
      </div>
      <div className="form-group">
        <input type="number" name="precioVenta" value={producto.precioVenta} onChange={handleInputChange} placeholder="Precio venta" required />
      </div>
      <div className="form-group">
        <input type="number" name="Iva Compra" value={producto.ivaCompra} onChange={handleInputChange} placeholder="Iva Compra" required/>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-registrar">{isEditMode ? "Actualizar Producto" : "Registrar Producto"}</button>
        <button className="btn-registrar" type="button" onClick={() => navigate('/productos ')}>Volver al listado</button>
      </div>        
      </form>
    </div>
  );
};

export default RegistrarFormP;
