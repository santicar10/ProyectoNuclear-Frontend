/**
 * Cliente HTTP específico para la API de Huahuacuna
 * Principio: Open/Closed - Extiende HttpClient sin modificarlo
 */

import { HttpClient } from './httpClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Cliente API que extiende HttpClient con configuración específica
 */
class ApiClient extends HttpClient {
  constructor() {
    super({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  }

  /**
   * Override: Añadir logging o métricas si es necesario
   */
  async processResponse(response) {
    // Aquí se podría añadir logging, métricas, etc.
    return super.processResponse(response);
  }
}

// Singleton del cliente API
const apiClient = new ApiClient();

export { ApiClient };
export default apiClient;
