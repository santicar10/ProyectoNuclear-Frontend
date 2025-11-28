"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Hook genérico para servicios CRUD
 * Principio: DIP - El servicio es inyectado, no hardcodeado
 * 
 * @param {Object} service - Servicio que implementa métodos CRUD
 * @param {Object} options - Opciones de configuración
 */
export function useService(service, options = {}) {
  const { 
    autoLoad = false,
    initialData = null,
  } = options;

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga todos los items
   */
  const loadAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.getAll();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Error al cargar datos';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Carga un item por ID
   */
  const loadById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.getById(id);
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Error al cargar datos';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Crea un nuevo item
   */
  const create = useCallback(async (itemData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.create(itemData);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Error al crear';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Actualiza un item
   */
  const update = useCallback(async (id, itemData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.update(id, itemData);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Error al actualizar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Elimina un item
   */
  const remove = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.delete(id);
      
      if (result.success && Array.isArray(data)) {
        // Actualizar lista local removiendo el item
        setData(prev => prev.filter(item => 
          (item.id || item.id_nino || item.id_evento) !== id
        ));
      }
      
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Error al eliminar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [service, data]);

  /**
   * Limpia el error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Resetea el estado
   */
  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  // Auto-cargar si está habilitado
  useEffect(() => {
    if (autoLoad) {
      loadAll();
    }
  }, [autoLoad, loadAll]);

  return {
    // Estado
    data,
    isLoading,
    error,
    
    // Operaciones CRUD
    loadAll,
    loadById,
    create,
    update,
    remove,
    
    // Utilidades
    setData,
    clearError,
    reset,
  };
}

export default useService;
