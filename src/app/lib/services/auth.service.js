/**
 * Servicio de Autenticación
 * 
 * Maneja todas las operaciones relacionadas con autenticación:
 * - Login
 * - Registro
 * - Logout
 * - Recuperación de contraseña
 * - Perfil de usuario
 */

import httpService from './http.service';
import { API_ENDPOINTS, USER_STORAGE_KEY } from '@/app/lib/config/api.config';

class AuthService {
  /**
   * Guarda los datos del usuario en localStorage
   */
  saveUserData(userData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    }
  }

  /**
   * Obtiene los datos del usuario de localStorage
   */
  getUserData() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  /**
   * Limpia los datos del usuario de localStorage
   */
  clearUserData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated() {
    return !!httpService.getAuthToken();
  }

  /**
   * Inicia sesión con email y contraseña
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Datos del usuario y token
   * 
   * Endpoint: POST /auth/login
   * Body: { email, password }
   * Response: { token, user: { id, nombre, email, ... } }
   */
  async login(email, password) {
    try {
      const response = await httpService.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      // Guardar token y datos del usuario
      if (response.token) {
        httpService.setAuthToken(response.token);
      }
      
      if (response.user) {
        this.saveUserData(response.user);
      }

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
   * Registra un nuevo usuario
   * 
   * @param {string} name - Nombre del usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Datos del usuario registrado
   * 
   * Endpoint: POST /api/usuarios/registro
   * Body: { nombre, email, password }
   * Response: { message, user: { id, nombre, email, ... } }
   */
  async register(name, email, password) {
    try {
      const response = await httpService.post(API_ENDPOINTS.REGISTER, {
        nombre: name,
        email,
        password,
      });

      return {
        success: true,
        data: response,
        message: response.message || 'Usuario registrado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Cierra la sesión del usuario
   * 
   * @returns {Promise<Object>} Resultado del logout
   * 
   * Endpoint: POST /api/usuarios/logout
   * Headers: Authorization: Bearer {token}
   * Response: { message }
   */
  async logout() {
    try {
      // Intentar hacer logout en el servidor
      await httpService.post(API_ENDPOINTS.LOGOUT);

      // Limpiar datos locales independientemente del resultado
      httpService.clearAuthToken();
      this.clearUserData();

      return {
        success: true,
        message: 'Sesión cerrada exitosamente',
      };
    } catch (error) {
      // Aún si falla, limpiar datos locales
      httpService.clearAuthToken();
      this.clearUserData();

      return {
        success: true,
        message: 'Sesión cerrada',
      };
    }
  }

  /**
   * Solicita recuperación de contraseña
   * 
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} Resultado de la solicitud
   * 
   * Endpoint: POST /api/usuarios/recuperar
   * Body: { email }
   * Response: { message, codigoEnviado: true }
   */
  async recoverPassword(email) {
    try {
      const response = await httpService.post(API_ENDPOINTS.RECOVER_PASSWORD, {
        email,
      });

      return {
        success: true,
        data: response,
        message: response.message || 'Código de recuperación enviado',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verifica el código de recuperación
   * 
   * @param {string} email - Email del usuario
   * @param {string} code - Código de verificación recibido por email
   * @returns {Promise<Object>} Resultado de la verificación
   * 
   * Endpoint: POST /api/usuarios/verificar-codigo
   * Body: { email, codigo }
   * Response: { valido: true, message: "Código válido" }
   */
  async verifyRecoveryCode(email, code) {
    try {
      const response = await httpService.post('/api/usuarios/verificar-codigo', {
        email,
        codigo: code,
      });

      return {
        success: true,
        data: response,
        message: response.message || 'Código verificado correctamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Restablece la contraseña con el código de recuperación
   * 
   * @param {string} email - Email del usuario
   * @param {string} code - Código de verificación
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Resultado del restablecimiento
   * 
   * Endpoint: POST /api/usuarios/restablecer-password
   * Body: { email, codigo, nuevaPassword }
   * Response: { message: "Contraseña actualizada exitosamente" }
   */
  async resetPassword(email, code, newPassword) {
    try {
      const response = await httpService.post('/api/usuarios/restablecer-password', {
        email,
        codigo: code,
        nuevaPassword: newPassword,
      });

      return {
        success: true,
        data: response,
        message: response.message || 'Contraseña restablecida exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Reenvía el código de recuperación
   * 
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} Resultado del reenvío
   */
  async resendRecoveryCode(email) {
    try {
      const response = await httpService.post('/api/usuarios/reenviar-codigo', {
        email,
      });

      return {
        success: true,
        data: response,
        message: response.message || 'Código reenviado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * 
   * @returns {Promise<Object>} Datos del perfil del usuario
   * 
   * Endpoint: GET /api/usuarios/perfil
   * Headers: Authorization: Bearer {token}
   * Response: { id, nombre, email, ... }
   */
  async getProfile() {
    try {
      const response = await httpService.get(API_ENDPOINTS.PROFILE);

      // Actualizar datos del usuario en localStorage
      if (response) {
        this.saveUserData(response);
      }

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
   * Actualiza el perfil del usuario
   * Nota: Ajusta según los endpoints de tu backend
   * 
   * @param {Object} userData - Datos a actualizar
   * @returns {Promise<Object>} Datos actualizados
   */
  async updateProfile(userData) {
    try {
      const response = await httpService.put(API_ENDPOINTS.PROFILE, userData);

      // Actualizar datos locales
      if (response) {
        this.saveUserData(response);
      }

      return {
        success: true,
        data: response,
        message: 'Perfil actualizado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// Exportar instancia única del servicio
export default new AuthService();