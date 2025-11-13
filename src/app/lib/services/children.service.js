import httpService from './http.service';
import { API_ENDPOINTS } from '@/app/lib/config/api.config';

class ChildrenService {
  /**
   * Calcula la edad basándose en la fecha de nacimiento
   */
  calculateAge(birthDate) {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

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
   * Obtiene un niño por ID (endpoint público)
   * GET /api/ninos/publico/{id}
   */
  async getById(id) {
    try {
      const response = await httpService.get(`/api/ninos/publico/${id}`);
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
      // Calcular edad a partir de fechaNacimiento
      const edad = this.calculateAge(childData.fechaNacimiento);

      const response = await httpService.post(API_ENDPOINTS.CHILDREN, {
        nombre: childData.nombre,
        edad: edad,
        genero: childData.genero,
        descripcion: childData.descripcion,
        fotoUrl: childData.fotoUrl || null,
        estadoApadrinamiento: 'Disponible',
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
   * Actualiza un niño existente (actualización parcial)
   * PATCH /api/ninos/{id}
   */
  async update(id, childData) {
    try {
      const updateData = {};
      
      if (childData.nombre) updateData.nombre = childData.nombre;
      
      // Calcular edad si cambió la fecha de nacimiento
      if (childData.fechaNacimiento) {
        updateData.edad = this.calculateAge(childData.fechaNacimiento);
      }
      
      if (childData.genero) updateData.genero = childData.genero;
      if (childData.descripcion) updateData.descripcion = childData.descripcion;
      if (childData.fotoUrl !== undefined) updateData.foto_url = childData.fotoUrl;
      if (childData.estadoApadrinamiento) {
        updateData.estado_apadrinamiento = childData.estadoApadrinamiento;
      }

      const response = await httpService.patch(
        API_ENDPOINTS.CHILDREN_BY_ID(id),
        updateData
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
}

export default new ChildrenService();