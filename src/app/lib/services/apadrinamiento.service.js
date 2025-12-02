import apiClient from './http/apiClient';

const ENDPOINT = '/api/apadrinamientos';

class ApadrinamientoService {
  constructor(httpClient = apiClient) {
    this.httpClient = httpClient;
  }

  async crear(idNino) {
    try {
      const response = await this.httpClient.post(ENDPOINT, { idNino });
      return {
        success: true,
        data: response,
        message: '¡Apadrinamiento creado exitosamente!',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async obtenerMisApadrinados() {
    try {
      const response = await this.httpClient.get(`${ENDPOINT}/mis-apadrinados`);
      return {
        success: true,
        data: Array.isArray(response) ? response : [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  async obtenerHistorial() {
    try {
      const response = await this.httpClient.get(`${ENDPOINT}/historial`);
      return {
        success: true,
        data: Array.isArray(response) ? response : [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  async verificarApadrinamiento(idNino) {
    try {
      const response = await this.httpClient.get(`${ENDPOINT}/verificar/${idNino}`);
      return {
        success: true,
        apadrinado: response.apadrinado || false,
      };
    } catch (error) {
      return {
        success: false,
        apadrinado: false,
        error: error.message,
      };
    }
  }

  async finalizar(idApadrinamiento) {
    try {
      const response = await this.httpClient.patch(`${ENDPOINT}/${idApadrinamiento}/finalizar`);
      return {
        success: true,
        data: response,
        message: 'Apadrinamiento finalizado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const apadrinamientoService = new ApadrinamientoService();
export default apadrinamientoService;