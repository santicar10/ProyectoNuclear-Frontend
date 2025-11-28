/**
 * Cliente HTTP Base - Abstracción para peticiones HTTP
 * Principios: Open/Closed (OCP), Dependency Inversion (DIP)
 * 
 * Permite extender funcionalidad sin modificar código existente
 */

/**
 * Interfaz/Contrato para clientes HTTP
 * @typedef {Object} HttpClientInterface
 * @property {function} get - GET request
 * @property {function} post - POST request
 * @property {function} put - PUT request
 * @property {function} patch - PATCH request
 * @property {function} delete - DELETE request
 */

/**
 * Configuración base del cliente HTTP
 */
const DEFAULT_CONFIG = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  timeout: 30000,
};

/**
 * Factory para crear errores HTTP consistentes
 */
const createHttpError = (status, message, data = null) => {
  const error = new Error(message);
  error.status = status;
  error.data = data;
  error.isHttpError = true;
  return error;
};

/**
 * Manejador de errores HTTP - separado para SRP
 */
const handleHttpError = async (response) => {
  let errorMessage = 'Error en la petición';

  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.mensaje || errorData.message || errorData.error || errorMessage;
    } else {
      errorMessage = await response.text() || errorMessage;
    }
  } catch {
    // Mantener mensaje por defecto
  }

  const errorMessages = {
    401: 'Credenciales inválidas o sesión expirada.',
    403: 'No tienes permisos para realizar esta acción.',
    404: 'Recurso no encontrado.',
    409: errorMessage,
    500: 'Error en el servidor. Intenta más tarde.',
  };

  throw createHttpError(
    response.status,
    errorMessages[response.status] || errorMessage
  );
};

/**
 * Manejador de respuestas HTTP - separado para SRP
 */
const handleHttpResponse = async (response) => {
  if (!response.ok) {
    await handleHttpError(response);
  }

  const contentType = response.headers.get('content-type');
  
  if (contentType?.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text();
};

/**
 * Clase base HttpClient
 * Abierta para extensión, cerrada para modificación
 */
class HttpClient {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Método para extender/modificar headers (hook para extensión)
   */
  getHeaders(customHeaders = {}) {
    return { ...this.config.headers, ...customHeaders };
  }

  /**
   * Método para extender/modificar la URL (hook para extensión)
   */
  buildUrl(endpoint) {
    return `${this.config.baseURL}${endpoint}`;
  }

  /**
   * Método para procesar respuesta (hook para extensión)
   */
  async processResponse(response) {
    return handleHttpResponse(response);
  }

  /**
   * Método base para realizar peticiones
   */
  async request(method, endpoint, data = null, options = {}) {
    const url = this.buildUrl(endpoint);
    const headers = this.getHeaders(options.headers);

    const fetchOptions = {
      method,
      headers,
      credentials: this.config.credentials,
      ...options,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      fetchOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, fetchOptions);
      return await this.processResponse(response);
    } catch (error) {
      if (error.isHttpError) throw error;
      throw createHttpError(0, error.message || 'Error de conexión');
    }
  }

  // Métodos HTTP
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }

  async post(endpoint, data = null, options = {}) {
    return this.request('POST', endpoint, data, options);
  }

  async put(endpoint, data = null, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }

  async patch(endpoint, data = null, options = {}) {
    return this.request('PATCH', endpoint, data, options);
  }

  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }
}

/**
 * Factory para crear instancias de HttpClient
 * Permite crear clientes con diferentes configuraciones
 */
const createHttpClient = (config = {}) => {
  return new HttpClient(config);
};

export { HttpClient, createHttpClient, createHttpError };
export default HttpClient;
