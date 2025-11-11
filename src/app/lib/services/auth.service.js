/**
 * Servicio de Autenticación basado en SESIONES HTTP
 * No usa tokens JWT - utiliza cookies de sesión del backend
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
    return !!this.getUserData();
  }

  /**
   * Inicia sesión con correo y contraseña
   * 
   * Endpoint: POST /auth/login
   * Body: { correo, contrasena }
   * Response: { mensaje, rol, usuarioId }
   */
  async login(email, password) {
    try {
      const response = await httpService.post(API_ENDPOINTS.LOGIN, {
        correo: email,
        contrasena: password,
      });

      // Guardar datos del usuario en localStorage
      const userData = {
        id: response.usuarioId,
        rol: response.rol,
      };
      this.saveUserData(userData);

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
   * Endpoint: POST /api/usuarios/registro
   * Body: { nombre, correo, contrasena }
   * Response: { usuarioId, correo, nombre }
   */
  async register(name, email, password) {
    try {
      const response = await httpService.post(API_ENDPOINTS.REGISTER, {
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

  /**
   * Cierra la sesión del usuario
   * 
   * Endpoint: POST /api/usuarios/logout
   */
  async logout() {
    try {
      await httpService.post(API_ENDPOINTS.LOGOUT);
      this.clearUserData();

      return {
        success: true,
        message: 'Sesión cerrada exitosamente',
      };
    } catch (error) {
      // Limpiar datos locales aunque falle
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
   * Endpoint: POST /api/usuarios/recuperar
   * Body: { correo }
   */
  async recoverPassword(email) {
    try {
      const response = await httpService.post(API_ENDPOINTS.RECOVER_PASSWORD, {
        correo: email,
      });

      return {
        success: true,
        data: response,
        message: typeof response === 'string' ? response : 'Contraseña enviada a tu correo',
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
   * Endpoint: POST /api/usuarios/verificar-codigo
   * Body: { correo, codigo }
   */
  async verifyRecoveryCode(email, code) {
    try {
      const response = await httpService.post(API_ENDPOINTS.VERIFY_CODE, {
        correo: email,
        codigo: code,
      });

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
   * Restablece la contraseña usando el endpoint /api/usuarios/cambiar
   * 
   * Endpoint: POST /api/usuarios/cambiar
   * Body: { correo, codigo, nuevaContrasena }
   */
  async resetPassword(email, code, newPassword) {
    try {
      const response = await httpService.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        correo: email,
        codigo: code,
        nuevaContrasena: newPassword,
      });

      return {
        success: true,
        data: response,
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Reenvía el código de verificación
   * 
   * Endpoint: POST /api/usuarios/reenviar-codigo
   * Body: { correo }
   */
  async resendRecoveryCode(email) {
    try {
      const response = await httpService.post(API_ENDPOINTS.RESEND_CODE, {
        correo: email,
      });

      return {
        success: true,
        data: response,
        message: 'Código reenviado exitosamente',
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
   * Endpoint: GET /api/usuarios/perfil
   */
  async getProfile() {
    try {
      const response = await httpService.get(API_ENDPOINTS.PROFILE);

      // Si es un objeto Usuario, guardarlo
      if (typeof response === 'object' && response.id_usuario) {
        const userData = {
          id: response.id_usuario,
          nombre: response.nombre,
          correo: response.correo,
          rol: response.rol,
        };
        this.saveUserData(userData);
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
}

export default new AuthService();