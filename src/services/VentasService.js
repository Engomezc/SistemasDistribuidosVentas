import axios from 'axios';

class VentasService {
  API_URL = "http://localhost:8089/api/ventas"; 

  async registrarVenta(venta) {
    try {
      const response = await axios.post(`${this.API_URL}/guardar`, venta);
      console.log("Respuesta del servidor:", response);
      return response.data; 
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      throw new Error("Error al registrar la venta");
    }
  }

  async obtenerVentas() {
    try {
      const response = await axios.get(`${this.API_URL}/listar`);
      return response.data.data; 
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
      throw new Error("Error al obtener las ventas");
    }
  }

  async actualizarVenta(venta) {
    try {
      const response = await axios.put(`${this.API_URL}/${venta.codigoVenta}`, venta);
      return response.data; 
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      throw new Error("Error al actualizar la venta");
    }
  }

  async eliminarVenta(codigoVenta) {
    try {
      const response = await axios.delete(`${this.API_URL}/${codigoVenta}`);
      return response.data; 
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      throw new Error("Error al eliminar la venta");
    }
  }
}

export default new VentasService();
