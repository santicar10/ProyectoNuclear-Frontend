/**
 * Servicio HTTP basado en SESIONES (sin tokens)
 * Utiliza cookies HttpSession del backend Spring Boot
 */

import { API_BASE_URL, DEFAULT_HEADERS } from '@/app/lib/config/api.config';

class HttpService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = { ...DEFAULT_HEADERS };
  }

  /**
   * Construye los headers de la petición
   */
  getHeaders(customHeaders = {}) {
    return { ...this.headers, ...customHeaders };
  }

  /**
   * Maneja las respuestas HTTP
   */
  async handleResponse(response) {
    // Si la respuesta es exitosa
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      
      // Si es JSON, parsearlo
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      // Si es texto plano
      return await response.text();
    }

    // Manejo de errores
    let errorMessage = 'Error en la petición';

    try {
      const errorData = await response.json();
      errorMessage = errorData.mensaje || errorData.message || errorData.error || errorMessage;
    } catch (e) {
      try {
        errorMessage = await response.text() || errorMessage;
      } catch (err) {
        // Si no se puede leer el error, usar mensaje por defecto
      }
    }

    // Códigos de estado HTTP
    switch (response.status) {
      case 401:
        throw new Error('Credenciales inválidas o sesión expirada.');
      
      case 403:
        throw new Error('No tienes permisos para realizar esta acción.');
      
      case 404:
        throw new Error('Recurso no encontrado.');
      
      case 409:
        throw new Error(errorMessage); // Conflicto (ej: correo ya registrado)
      
      case 500:
        throw new Error('Error en el servidor. Intenta más tarde.');
      
      default:
        throw new Error(errorMessage);
    }
  }

  /**
   * Petición GET
   */
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options.headers),
        credentials: 'include', // ✅ IMPORTANTE: Enviar cookies de sesión
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  /**
   * Petición POST
   */
  async post(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        credentials: 'include', // ✅ IMPORTANTE: Enviar cookies de sesión
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  /**
   * Petición PUT
   */
  async put(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        credentials: 'include', // ✅ IMPORTANTE: Enviar cookies de sesión
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  /**
   * Petición DELETE
   */
  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options.headers),
        credentials: 'include', // ✅ IMPORTANTE: Enviar cookies de sesión
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}

export default new HttpService();