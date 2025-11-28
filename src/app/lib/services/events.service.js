/**
 * Servicio de Eventos
 * Principios:
 * - OCP: Extiende BaseCrudService sin modificarlo
 * - LSP: Puede sustituir a BaseCrudService
 * - SRP: Solo maneja operaciones de eventos
 */

import BaseCrudService from './base/BaseCrudService';

const ENDPOINT = '/api/eventos';

class EventsService extends BaseCrudService {
  constructor() {
    super(ENDPOINT);
  }

  /**
   * Override: Prepara payload para crear evento
   */
  prepareCreatePayload(data) {
    return {
      nombre: data.nombre,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      lugar: data.lugar,
      descripcion: data.descripcion || '',
      fotoUrl: data.fotoUrl || null,
    };
  }

  /**
   * Override: Prepara payload para actualizar evento
   */
  prepareUpdatePayload(data) {
    const payload = {};
    
    if (data.nombre) payload.nombre = data.nombre;
    if (data.fechaInicio) payload.fechaInicio = data.fechaInicio;
    if (data.fechaFin) payload.fechaFin = data.fechaFin;
    if (data.lugar) payload.lugar = data.lugar;
    if (data.descripcion !== undefined) payload.descripcion = data.descripcion;
    if (data.fotoUrl !== undefined) payload.fotoUrl = data.fotoUrl;

    return payload;
  }

  /**
   * Override: Mensajes de éxito específicos
   */
  getCreateSuccessMessage() {
    return 'Evento creado exitosamente';
  }

  getUpdateSuccessMessage() {
    return 'Evento actualizado exitosamente';
  }

  getDeleteSuccessMessage() {
    return 'Evento eliminado exitosamente';
  }

  // ============ MÉTODOS ESPECÍFICOS DEL DOMINIO ============

  /**
   * Obtiene eventos próximos
   */
  async getUpcoming() {
    try {
      const response = await this.httpClient.get(`${this.endpoint}/proximos`);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verifica si un evento está activo
   */
  isActive(event) {
    if (!event?.fechaInicio || !event?.fechaFin) return false;
    
    const now = new Date();
    const start = new Date(event.fechaInicio);
    const end = new Date(event.fechaFin);
    
    return now >= start && now <= end;
  }
}

export const eventsService = new EventsService();
export default eventsService;
