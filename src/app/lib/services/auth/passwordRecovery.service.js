/**
 * Servicio de Recuperación de Contraseña
 * Principios: 
 * - SRP: Solo responsable del proceso de recuperación
 * - ISP: Interface pequeña y específica
 * - DIP: Depende de abstracciones
 */

import apiClient from '../http/apiClient';

const ENDPOINTS = {
  RECOVER: '/api/usuarios/recuperar',
  VERIFY_CODE: '/api/usuarios/verificar-codigo',
  CHANGE_PASSWORD: '/api/usuarios/cambiar',
  RESEND_CODE: '/api/usuarios/reenviar-codigo',
};

class PasswordRecoveryService {
  constructor(httpClient = apiClient) {
    this.httpClient = httpClient;
  }

  /**
   * Solicita código de recuperación
   * @param {string} email 
   */
  async requestRecoveryCode(email) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.RECOVER, {
        correo: email,
      });

      return {
        success: true,
        data: response,
        message: 'Código enviado a tu correo',
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
   * @param {string} email 
   * @param {string} code 
   */
  async verifyCode(email, code) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.VERIFY_CODE, {
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
   * Cambia la contraseña usando el código de verificación
   * @param {string} email 
   * @param {string} code 
   * @param {string} newPassword 
   */
  async resetPassword(email, code, newPassword) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.CHANGE_PASSWORD, {
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
   * @param {string} email 
   */
  async resendCode(email) {
    try {
      const response = await this.httpClient.post(ENDPOINTS.RESEND_CODE, {
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
}

export const passwordRecoveryService = new PasswordRecoveryService();
export default passwordRecoveryService;
