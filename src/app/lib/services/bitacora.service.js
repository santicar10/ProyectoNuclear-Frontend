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
  async getByChildId(childId, page = 1, limit = 100) {
  try {
    const response = await this.httpClient.get(
      `${this.endpoint}/nino/${childId}`
    );
    
    return {
      success: true,
      data: Array.isArray(response) ? response : [],
      hasMore: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

async createEntry(childId, entryData) {
  try {
    const response = await this.httpClient.post(
      `${this.endpoint}/nino/${childId}`,
      {
        ninoId: childId,
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

async update(id, entryData) {
  try {
    const response = await this.httpClient.patch(
      `${this.endpoint}/${id}`,
      {
        ninoId: entryData.ninoId,
        descripcion: entryData.descripcion,
        imagen: entryData.imagen || null,
      }
    );
    return {
      success: true,
      data: response,
      message: 'Entrada actualizada exitosamente',
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
   * Elimina una entrada de bitácora
   */
  async delete(id) {
    if (!this.validateId(id)) {
      return {
        success: false,
        error: 'ID de entrada inválido',
      };
    }

    try {
      await this.httpClient.delete(`${this.endpoint}/${id}`);
      return {
        success: true,
        message: 'Entrada eliminada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

/**
 * Valida un ID
 */
validateId(id) {
  return id && id !== 'undefined' && id !== 'null' && !isNaN(id);
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