// src/app/lib/services/bitacora.service.js
import BaseCrudService from './base/BaseCrudService';

const ENDPOINT = '/api/bitacora';

class BitacoraService extends BaseCrudService {
  constructor() {
    super(ENDPOINT);
  }

  /**
   * Obtiene la bitácora de un niño
   */
  async getByChildId(childId, page = 1, limit = 10) {
    try {
      const response = await this.httpClient.get(
        `${this.endpoint}/nino/${childId}?page=${page}&limit=${limit}`
      );
      
      // Transformar datos
      const entries = Array.isArray(response) ? response : (response.entries || []);
      
      return {
        success: true,
        data: entries.map(entry => this.transformItem(entry)),
        hasMore: response.hasMore ?? (entries.length === limit),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Crea una entrada de bitácora
   */
  async createEntry(childId, entryData) {
    try {
      const response = await this.httpClient.post(
        `${this.endpoint}/nino/${childId}`,
        {
          descripcion: entryData.descripcion,
          imagen: entryData.imagen || null,
        }
      );
      return {
        success: true,
        data: response,
        message: 'Entrada creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Transforma una entrada de bitácora
   */
  transformItem(entry) {
    if (!entry) return entry;
    
    return {
      id: entry.id_bitacora || entry.id,
      nombreNino: entry.nombre_nino || entry.nombreNino,
      fecha: entry.fecha ? this.formatDate(entry.fecha) : '',
      descripcion: entry.descripcion || '',
      imagen: entry.imagen || entry.foto_url || null,
    };
  }

  /**
   * Formatea una fecha
   */
  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

export const bitacoraService = new BitacoraService();
export default bitacoraService;