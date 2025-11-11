import httpService from './http.service';
import { API_ENDPOINTS } from '@/app/lib/config/api.config';

class ChildrenService {
  /**
   * Obtiene todos los niños
   * GET /api/ninos
   */
  async getAll() {
    try {
      const response = await httpService.get(API_ENDPOINTS.CHILDREN);
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
   * Obtiene un niño por ID
   * GET /api/ninos/{id}
   */
  async getById(id) {
    try {
      const response = await httpService.get(API_ENDPOINTS.CHILDREN_BY_ID(id));
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
   * Obtiene niños disponibles para apadrinamiento
   * GET /api/ninos/disponibles
   */
  async getAvailable() {
    try {
      const response = await httpService.get(API_ENDPOINTS.CHILDREN_AVAILABLE);
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
   * Crea un nuevo niño
   * POST /api/ninos
   */
  async create(childData) {
    try {
      const response = await httpService.post(API_ENDPOINTS.CHILDREN, {
        nombre: childData.nombre,
        fechaNacimiento: childData.fechaNacimiento,
        genero: childData.genero,
        descripcion: childData.descripcion,
        fotoUrl: childData.fotoUrl,
        comunidad: childData.comunidad,
      });

      return {
        success: true,
        data: response,
        message: 'Niño registrado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Actualiza un niño existente
   * PUT /api/ninos/{id}
   */
  async update(id, childData) {
    try {
      const response = await httpService.put(
        API_ENDPOINTS.CHILDREN_BY_ID(id),
        {
          nombre: childData.nombre,
          fechaNacimiento: childData.fechaNacimiento,
          genero: childData.genero,
          descripcion: childData.descripcion,
          fotoUrl: childData.fotoUrl,
          comunidad: childData.comunidad,
        }
      );

      return {
        success: true,
        data: response,
        message: 'Niño actualizado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Elimina un niño
   * DELETE /api/ninos/{id}
   */
  async delete(id) {
    try {
      await httpService.delete(API_ENDPOINTS.CHILDREN_BY_ID(id));
      return {
        success: true,
        message: 'Niño eliminado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Calcula la edad basándose en la fecha de nacimiento
   */
  calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
}

export default new ChildrenService();