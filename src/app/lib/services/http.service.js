/**
 * Servicio HTTP para manejar todas las peticiones a la API
 * 
 * Este servicio maneja:
 * - Autenticación automática (tokens)
 * - Manejo de errores
 * - Interceptores de request/response
 * - Configuración centralizada
 */

import { 
  API_BASE_URL, 
  DEFAULT_HEADERS, 
  TOKEN_STORAGE_KEY 
} from '@/app/lib/config/api.config';

class HttpService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = { ...DEFAULT_HEADERS };
  }

  /**
   * Obtiene el token de autenticación del localStorage
   */
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return null;
  }

  /**
   * Guarda el token de autenticación en localStorage
   */
  setAuthToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }

  /**
   * Elimina el token de autenticación del localStorage
   */
  clearAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  /**
   * Construye los headers de la petición incluyendo el token si existe
   */
  getHeaders(customHeaders = {}) {
    const headers = { ...this.headers, ...customHeaders };
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  /**
   * Maneja los errores de las peticiones HTTP
   */
  async handleResponse(response) {
    // Si la respuesta es exitosa, retorna los datos
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    }

    // Manejo de errores
    let errorMessage = 'Error en la petición';
    let errorData = null;

    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      errorMessage = await response.text() || errorMessage;
    }

    // Log detallado para ayudar a depurar errores del backend (incluye body si hay)
    try {
      console.error('HTTP Error Response:', {
        status: response.status,
        url: response.url || null,
        errorData,
        errorMessage,
      });
    } catch (logErr) {
      // no-op
    }

    // Manejar códigos de estado específicos
    switch (response.status) {
      case 401:
        // Token inválido o expirado - limpiar y redirigir al login
        this.clearAuthToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
      
      case 403:
        throw new Error('No tienes permisos para realizar esta acción.');
      
      case 404:
        throw new Error('Recurso no encontrado.');
      
      case 500:
        // Conservar el mensaje devuelto por el servidor cuando exista
        throw new Error(errorMessage || 'Error en el servidor. Intenta más tarde.');
      
      default:
        throw new Error(errorMessage);
    }
  }

  /**
   * Realiza una petición GET
   */
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options.headers),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  /**
   * Realiza una petición POST
   */
  async post(endpoint, data = null, options = {}) {
    // Construir URL de forma segura (maneja barras / correctamente)
    let url;
    try {
      url = new URL(endpoint, this.baseURL).toString();
    } catch (e) {
      // Fallback simple
      url = `${this.baseURL}${endpoint}`;
    }

    try {
      // Log diagnóstico mínimo para ayudar a identificar fallas de red/CORS
      console.debug('HTTP POST:', { url, headers: this.getHeaders(options.headers), body: data });

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      // En el navegador "TypeError: Failed to fetch" suele indicar problemas de red, CORS,
      // mixed content (https page -> http backend) o URL inválida. Añadimos contexto útil.
      console.error('POST Error:', {
        message: error && error.message,
        url,
        endpoint,
        baseURL: this.baseURL,
      });

      // Re-lanzar un error con información adicional pero conservando el original en consola
      const hint = `Failed to fetch ${url}. Comprueba que el backend esté en ejecución, que la URL base (API_BASE_URL) sea correcta y que no sea un problema de CORS o mixed-content (https/https).`;
      const enhanced = new Error(error && error.message ? `${error.message} — ${hint}` : hint);
      throw enhanced;
    }
  }

  /**
   * Realiza una petición PUT
   */
  async put(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  /**
   * Realiza una petición DELETE
   */
  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options.headers),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}

// Exportar instancia única del servicio
export default new HttpService();