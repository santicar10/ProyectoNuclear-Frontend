/**
 * Servicio de Registro
 * Principios: 
 * - SRP: Solo responsable del proceso de registro
 * - ISP: Interface pequeña y específica
 * - DIP: Depende de abstracciones
 */

import apiClient from '../http/apiClient';

const ENDPOINTS = {
  REGISTER: '/api/usuarios/registro',
};

class RegisterService {
  constructor(httpClient = apiClient) {
    this.httpClient = httpClient;
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData 
   * @param {string} userData.name - Nombre del usuario
   * @param {string} userData.email - Correo del usuario
   * @param {string} userData.password - Contraseña
   */
  async register({ name, email, password }) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.REGISTER, {
        nombre: name,
        correo: email,
        contrasena: password,
      });

      return {
        success: true,
        data: response,
        message: 'Usuario registrado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const registerService = new RegisterService();
export default registerService;
