import axios from 'axios';

class ClientesService {
  API_URL = "http://localhost:8089/api/clientes"; 

  async registrarCliente(cliente) {
    try {
      const response = await axios.post(`${this.API_URL}/guardar`, cliente);
      console.log("Respuesta del servidor:", response);
      return response.data; 
    } catch (error) {
      console.error("Error al registrar el cliente:", error);
      throw new Error("Error al registrar el cliente");
    }
  }

  async obtenerCliente() {
    try {
      const response = await axios.get(`${this.API_URL}/listar`);
      return response.data.data; 
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      throw new Error("Error al obtener los clientes");
    }
  }

  async actualizarCliente(cliente) {
    try {
      const response = await axios.put(`${this.API_URL}/${cliente.cedulaCliente}`, cliente);
      return response.data; 
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw new Error("Error al actualizar el cliente");
    }
  }


  async eliminarCliente(cedulaCliente) {
    try {
      const response = await axios.delete(`${this.API_URL}/${cedulaCliente}`);
      return response.data; 
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      throw new Error("Error al eliminar el cliente");
    }
  }
}

export default new ClientesService();
