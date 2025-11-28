/**
 * Servicio CRUD Base
 * Principios:
 * - OCP: Abierto para extensión, cerrado para modificación
 * - DIP: Las clases hijas dependen de esta abstracción
 * - LSP: Las clases hijas pueden sustituir a esta base
 */

import apiClient from '../http/apiClient';

/**
 * Clase base abstracta para servicios CRUD
 * Provee operaciones básicas que pueden ser extendidas
 */
class BaseCrudService {
  /**
   * @param {string} endpoint - Endpoint base del recurso
   * @param {Object} httpClient - Cliente HTTP (inyección de dependencia)
   */
  constructor(endpoint, httpClient = apiClient) {
    if (new.target === BaseCrudService) {
      throw new Error('BaseCrudService es abstracta y no puede ser instanciada directamente');
    }
    
    this.endpoint = endpoint;
    this.httpClient = httpClient;
  }

  /**
   * Obtiene todos los recursos
   * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
   */
  async getAll() {
    try {
      const response = await this.httpClient.get(this.endpoint);
      return {
        success: true,
        data: this.transformList(response),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Obtiene un recurso por ID
   * @param {number|string} id 
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  async getById(id) {
    if (!this.validateId(id)) {
      return {
        success: false,
        error: 'ID inválido',
      };
    }

    try {
      const response = await this.httpClient.get(`${this.endpoint}/${id}`);
      return {
        success: true,
        data: this.transformItem(response),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Crea un nuevo recurso
   * @param {Object} data 
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  async create(data) {
    try {
      const payload = this.prepareCreatePayload(data);
      const response = await this.httpClient.post(this.endpoint, payload);
      return {
        success: true,
        data: response,
        message: this.getCreateSuccessMessage(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Actualiza un recurso existente
   * @param {number|string} id 
   * @param {Object} data 
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  async update(id, data) {
    if (!this.validateId(id)) {
      return {
        success: false,
        error: 'ID inválido',
      };
    }

    try {
      const payload = this.prepareUpdatePayload(data);
      const response = await this.httpClient.patch(`${this.endpoint}/${id}`, payload);
      return {
        success: true,
        data: response,
        message: this.getUpdateSuccessMessage(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Elimina un recurso
   * @param {number|string} id 
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async delete(id) {
    if (!this.validateId(id)) {
      return {
        success: false,
        error: 'ID inválido',
      };
    }

    try {
      await this.httpClient.delete(`${this.endpoint}/${id}`);
      return {
        success: true,
        message: this.getDeleteSuccessMessage(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // ============ MÉTODOS PARA OVERRIDE (Hooks de extensión) ============

  validateId(id) {
    return id && id !== 'undefined' && id !== 'null';
  }

  transformList(data) {
    return data;
  }

  transformItem(data) {
    return data;
  }

  prepareCreatePayload(data) {
    return data;
  }

  prepareUpdatePayload(data) {
    return data;
  }

  getCreateSuccessMessage() {
    return 'Recurso creado exitosamente';
  }

  getUpdateSuccessMessage() {
    return 'Recurso actualizado exitosamente';
  }

  getDeleteSuccessMessage() {
    return 'Recurso eliminado exitosamente';
  }
}

export default BaseCrudService;
