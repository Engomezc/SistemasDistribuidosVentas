import React, { useEffect, useState } from "react";
import ProductosService from "../services/ProductosService";
import RegistrarFormP from "./RegistrarFormP";
import { Link } from 'react-router-dom';
import '../App.css';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setproductoEditado] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await ProductosService.obtenerProductos();
      setProductos(data);
    };
    obtenerProductos();
  }, []);
  

  const handleEditarProducto = (producto) => {
    setproductoEditado(producto);
  };

  const handleEliminarProducto = async (codigoProducto) => {
    try {
      await ProductosService.eliminarProducto(codigoProducto);
      alert("Producto eliminada correctamente");
      setProductos(productos.filter((producto) => producto.codigoProducto !== codigoProducto));
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div className="ventas-container">
      <h2 className="titulo">Modulo de Productos</h2>
      <Link to="/productos">
        <button className="btn-registrar">Registrar nuevo producto</button>
      </Link>
      <table className="ventas-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>NIT Proveedor</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Iva</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigoProducto}>
              <td>{producto.codigoProducto}</td>
              <td>{producto.nombreProducto}</td>
              <td>{producto.nitProveedor}</td>
              <td>{producto.precioCompra}</td>
              <td>{producto.precioVenta}</td>
              <td>{producto.ivaCompra}</td>
              <td>
                <button className="btn-editar" onClick={() => handleEditarProducto(producto)}>Editar</button>
                <button className="btn-eliminar" onClick={() => handleEliminarProducto(producto.codigoProducto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {productoEditado && <RegistrarFormP productoEditado={productoEditado} setproductoEditado={setproductoEditado} />}
    </div>
  );
};

export default ProductosList;