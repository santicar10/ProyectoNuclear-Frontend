/**
 * Servicio de Sesión de Usuario
 * Principio: Single Responsibility - Solo maneja estado de sesión
 */

import storageService, { STORAGE_KEYS } from './storage.service';

/**
 * @typedef {Object} UserData
 * @property {number} id - ID del usuario
 * @property {string} nombre - Nombre del usuario
 * @property {string} correo - Correo del usuario
 * @property {string} rol - Rol del usuario
 */

class UserSessionService {
  constructor(storage = storageService) {
    this.storage = storage;
  }

  /**
   * Guarda los datos del usuario en sesión
   * @param {UserData} userData 
   */
  save(userData) {
    return this.storage.set(STORAGE_KEYS.USER_DATA, userData);
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns {UserData|null}
   */
  get() {
    return this.storage.get(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Limpia la sesión del usuario
   */
  clear() {
    return this.storage.remove(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Verifica si hay una sesión activa
   */
  isActive() {
    return this.storage.has(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Obtiene el ID del usuario
   */
  getUserId() {
    const user = this.get();
    return user?.id || null;
  }

  /**
   * Obtiene el rol del usuario
   */
  getUserRole() {
    const user = this.get();
    return user?.rol || null;
  }

  /**
   * Obtiene el nombre del usuario
   */
  getUserName() {
    const user = this.get();
    return user?.nombre || 'Usuario';
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin() {
    return this.getUserRole() === 'administrador';
  }

  /**
   * Verifica si el usuario es padrino
   */
  isPadrino() {
    return this.getUserRole() === 'padrino';
  }
}

export const userSessionService = new UserSessionService();
export default userSessionService;
