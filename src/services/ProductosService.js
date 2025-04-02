import axios from 'axios';

class ProductosService {
  API_URL = "http://localhost:8089/api/productos"; 

  async registrarProducto(producto) {
    try {
      const response = await axios.post(`${this.API_URL}/guardar`, producto);
      console.log("Respuesta del servidor:", response);
      return response.data; 
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      throw new Error("Error al registrar el producto");
    }
  }

  async obtenerProductos() {
    try {
      const response = await axios.get(`${this.API_URL}/listar`);
      return response.data.data; 
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw new Error("Error al obtener los productos");
    }
  }

  async actualizarProducto(producto) {
    try {
      const response = await axios.put(`${this.API_URL}/${producto.codigoProducto}`, producto);
      return response.data; 
    } catch (error) {
      console.error("Error al actualizar el prpducto:", error);
      throw new Error("Error al actualizar el producto");
    }
  }

  async eliminarProducto(codigoProducto) {
    try {
      const response = await axios.delete(`${this.API_URL}/${codigoProducto}`);
      return response.data; 
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw new Error("Error al eliminar el producto");
    }
  }
}

export default new ProductosService();
