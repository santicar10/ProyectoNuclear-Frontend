"use client";

import { useState, useCallback } from "react";

/**
 * Hook genérico para manejo de formularios
 * Principios:
 * - SRP: Solo maneja estado y lógica de formularios
 * - OCP: Extensible mediante validadores y handlers inyectados
 * 
 * @param {Object} options
 * @param {Object} options.initialValues - Valores iniciales del formulario
 * @param {Function} options.validate - Función de validación (opcional)
 * @param {Function} options.onSubmit - Handler de envío
 */
export function useForm({ initialValues = {}, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  /**
   * Maneja cambios en campos
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    
    // Limpiar error del campo al modificarlo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  /**
   * Maneja blur en campos (para validación en tiempo real)
   */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar campo individual si hay validador
    if (validate) {
      const fieldErrors = validate({ [name]: value });
      if (fieldErrors[name]) {
        setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
      }
    }
  }, [validate]);

  /**
   * Establece un valor específico
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Establece múltiples valores
   */
  const setMultipleValues = useCallback((newValues) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  /**
   * Establece un error específico
   */
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  /**
   * Limpia todos los errores
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Resetea el formulario
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    
    // Validar si hay validador
    if (validate) {
      const formErrors = validate(values);
      const hasErrors = Object.keys(formErrors).length > 0;
      
      if (hasErrors) {
        setErrors(formErrors);
        return { success: false, errors: formErrors };
      }
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await onSubmit(values);
      return result;
    } catch (error) {
      const errorMessage = error.message || 'Error inesperado';
      setErrors({ submit: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  /**
   * Verifica si el formulario es válido
   */
  const isValid = useCallback(() => {
    if (!validate) return true;
    const formErrors = validate(values);
    return Object.keys(formErrors).length === 0;
  }, [values, validate]);

  return {
    // Estado
    values,
    errors,
    touched,
    isSubmitting,
    
    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,
    
    // Setters
    setValue,
    setMultipleValues,
    setError,
    setErrors,
    clearErrors,
    reset,
    
    // Utilidades
    isValid,
  };
}

export default useForm;
