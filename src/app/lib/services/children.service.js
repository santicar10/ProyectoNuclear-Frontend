/**
 * Servicio de Niños
 * Principios:
 * - OCP: Extiende BaseCrudService sin modificarlo
 * - LSP: Puede sustituir a BaseCrudService
 * - SRP: Solo maneja operaciones de niños
 */

import BaseCrudService from './base/BaseCrudService';
import { calculateAge } from '../utils/dateUtils';

const ENDPOINTS = {
  CHILDREN: '/api/ninos',
  CHILDREN_PUBLIC: '/api/ninos/publico',
};

class ChildrenService extends BaseCrudService {
  constructor() {
    super(ENDPOINTS.CHILDREN);
  }

  /**
   * Override: Obtiene un niño por ID usando endpoint público
   */
  async getById(id) {
    if (!this.validateId(id)) {
      return {
        success: false,
        error: 'ID de niño inválido',
      };
    }

    try {
      const response = await this.httpClient.get(`${ENDPOINTS.CHILDREN_PUBLIC}/${id}`);
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
   * Override: Transforma item añadiendo edad calculada
   */
  transformItem(child) {
    if (!child) return child;
    
    return {
      ...child,
      edad: calculateAge(child.fechaNacimiento || child.fecha_nacimiento),
    };
  }

  /**
   * Override: Transforma lista de niños
   */
  transformList(children) {
    if (!Array.isArray(children)) return [];
    return children.map(child => this.transformItem(child));
  }

  /**
   * Override: Prepara payload para crear
   */
  prepareCreatePayload(data) {
    return {
      nombre: data.nombre,
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero,
      descripcion: data.descripcion,
      fotoUrl: data.fotoUrl || null,
      estadoApadrinamiento: 'Disponible',
    };
  }

  /**
   * Override: Prepara payload para actualizar
   */
  prepareUpdatePayload(data) {
    const payload = {};
    
    if (data.nombre) payload.nombre = data.nombre;
    if (data.fechaNacimiento) payload.fecha_nacimiento = data.fechaNacimiento;
    if (data.genero) payload.genero = data.genero;
    if (data.descripcion) payload.descripcion = data.descripcion;
    if (data.fotoUrl !== undefined) payload.foto_url = data.fotoUrl;
    if (data.estadoApadrinamiento) payload.estado_apadrinamiento = data.estadoApadrinamiento;

    return payload;
  }

  /**
   * Override: Mensajes de éxito específicos
   */
  getCreateSuccessMessage() {
    return 'Niño registrado exitosamente';
  }

  getUpdateSuccessMessage() {
    return 'Niño actualizado exitosamente';
  }

  getDeleteSuccessMessage() {
    return 'Niño eliminado exitosamente';
  }

  // ============ MÉTODOS ESPECÍFICOS DEL DOMINIO ============

  /**
   * Obtiene niños disponibles para apadrinamiento
   */
  async getAvailable() {
    try {
      const response = await this.httpClient.get(`${ENDPOINTS.CHILDREN}/disponibles`);
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
   * Verifica si un niño está disponible
   */
  isAvailable(child) {
    return child?.estadoApadrinamiento === 'Disponible' || 
           child?.estado_apadrinamiento === 'Disponible';
  }
}

export const childrenService = new ChildrenService();
export default childrenService;
