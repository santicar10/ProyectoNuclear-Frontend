/**
 * Servicio de Storage - Solo responsable de persistencia local
 * Principio: Single Responsibility (SRP)
 */

const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  AUTH_TOKEN: 'auth_token',
  PREFERENCES: 'user_preferences',
};

class StorageService {
  constructor(storage = typeof window !== 'undefined' ? localStorage : null) {
    this.storage = storage;
  }

  /**
   * Guarda un valor en storage
   */
  set(key, value) {
    if (!this.storage) return false;
    
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      this.storage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  /**
   * Obtiene un valor de storage
   */
  get(key, defaultValue = null) {
    if (!this.storage) return defaultValue;
    
    try {
      const item = this.storage.getItem(key);
      if (item === null) return defaultValue;
      
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  /**
   * Elimina un valor de storage
   */
  remove(key) {
    if (!this.storage) return false;
    
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * Limpia todo el storage
   */
  clear() {
    if (!this.storage) return false;
    
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Verifica si existe una clave
   */
  has(key) {
    if (!this.storage) return false;
    return this.storage.getItem(key) !== null;
  }
}

// Exportar instancia singleton y keys
export const storageService = new StorageService();
export { STORAGE_KEYS };
export default storageService;
