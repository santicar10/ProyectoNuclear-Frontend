/**
 * Auth Service Facade
 * Patrón: Facade + Adapter
 * 
 * Mantiene la API original para compatibilidad hacia atrás
 * mientras internamente usa los servicios SOLID separados
 */

import { loginService } from './auth/login.service';
import { registerService } from './auth/register.service';
import { passwordRecoveryService } from './auth/passwordRecovery.service';
import userSessionService from './userSession.service';
import apiClient from './http/apiClient';

/**
 * Facade que expone la API original de authService
 * Delega a los servicios especializados internamente
 */
class AuthServiceFacade {
  // ============ SESIÓN ============
  
  getUserData() {
    return userSessionService.get();
  }

  saveUserData(userData) {
    return userSessionService.save(userData);
  }

  clearUserData() {
    return userSessionService.clear();
  }

  isAuthenticated() {
    return userSessionService.isActive();
  }

  // ============ LOGIN/LOGOUT ============

  async login(email, password) {
    return loginService.login(email, password);
  }

  async logout() {
    return loginService.logout();
  }

  // ============ REGISTRO ============

  async register(name, email, password) {
    return registerService.register({ name, email, password });
  }

  // ============ RECUPERACIÓN DE CONTRASEÑA ============

  async recoverPassword(email) {
    return passwordRecoveryService.requestRecoveryCode(email);
  }

  async verifyRecoveryCode(email, code) {
    return passwordRecoveryService.verifyCode(email, code);
  }

  async resetPassword(email, code, newPassword) {
    return passwordRecoveryService.resetPassword(email, code, newPassword);
  }

  async resendRecoveryCode(email) {
    return passwordRecoveryService.resendCode(email);
  }

  // ============ PERFIL ============

  async getProfile() {
    try {
      const response = await apiClient.get('/api/usuarios/perfil');
      
      if (typeof response === 'object' && response.id_usuario) {
        const userData = {
          id: response.id_usuario,
          nombre: response.nombre,
          correo: response.correo,
          rol: response.rol,
        };
        userSessionService.save(userData);
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

// Exportar instancia singleton
const authService = new AuthServiceFacade();
export default authService;
