/**
 * Servicio de Login
 * Principios: 
 * - SRP: Solo responsable del proceso de login
 * - ISP: Interface pequeña y específica
 * - DIP: Depende de abstracciones (apiClient, userSessionService)
 */

import apiClient from '../http/apiClient';
import userSessionService from '../userSession.service';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/api/usuarios/logout',
};

class LoginService {
  constructor(httpClient = apiClient, sessionService = userSessionService) {
    this.httpClient = httpClient;
    this.sessionService = sessionService;
  }

  /**
   * Inicia sesión con credenciales
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.LOGIN, {
        correo: email,
        contrasena: password,
      });

      // Guardar sesión
      const userData = {
        id: response.usuarioId,
        rol: response.rol,
        nombre: response.nombre || 'Usuario',
      };
      this.sessionService.save(userData);

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Cierra la sesión actual
   */
  async logout() {
    try {
      await this.httpClient.post(ENDPOINTS.LOGOUT);
    } catch {
      // Ignorar errores de logout del servidor
    } finally {
      this.sessionService.clear();
    }

    return {
      success: true,
      message: 'Sesión cerrada exitosamente',
    };
  }

  /**
   * Verifica si hay sesión activa
   */
  isAuthenticated() {
    return this.sessionService.isActive();
  }
}

export const loginService = new LoginService();
export default loginService;
