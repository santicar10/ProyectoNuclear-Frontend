/**
 * Validadores Base
 * Principios:
 * - SRP: Cada validador tiene una sola responsabilidad
 * - OCP: Fácilmente extensibles mediante composición
 */

// ============ VALIDADORES PRIMITIVOS ============

/**
 * Crea un validador de campo requerido
 */
export const required = (fieldName = 'Este campo') => (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} es requerido`;
  }
  return null;
};

/**
 * Crea un validador de longitud mínima
 */
export const minLength = (min, fieldName = 'Este campo') => (value) => {
  if (value && value.length < min) {
    return `${fieldName} debe tener al menos ${min} caracteres`;
  }
  return null;
};

/**
 * Crea un validador de longitud máxima
 */
export const maxLength = (max, fieldName = 'Este campo') => (value) => {
  if (value && value.length > max) {
    return `${fieldName} no puede tener más de ${max} caracteres`;
  }
  return null;
};

/**
 * Crea un validador de patrón regex
 */
export const pattern = (regex, message) => (value) => {
  if (value && !regex.test(value)) {
    return message;
  }
  return null;
};

/**
 * Crea un validador de email
 */
export const email = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern(emailRegex, 'Por favor ingresa un email válido');
};

/**
 * Crea un validador que verifica que dos valores sean iguales
 */
export const match = (otherValue, message = 'Los valores no coinciden') => (value) => {
  if (value !== otherValue) {
    return message;
  }
  return null;
};

/**
 * Crea un validador de valor incluido en lista
 */
export const oneOf = (validValues, message) => (value) => {
  if (value && !validValues.includes(value)) {
    return message || `Valor inválido. Debe ser uno de: ${validValues.join(', ')}`;
  }
  return null;
};

// ============ COMPOSICIÓN DE VALIDADORES ============

/**
 * Compone múltiples validadores en uno
 * Retorna el primer error encontrado o null
 */
export const compose = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

/**
 * Ejecuta validadores en un objeto de datos
 * @param {Object} schema - { fieldName: validator }
 * @param {Object} data - Datos a validar
 * @returns {Object} Errores por campo
 */
export const validateSchema = (schema, data) => {
  const errors = {};
  
  for (const [field, validator] of Object.entries(schema)) {
    const error = validator(data[field]);
    if (error) {
      errors[field] = error;
    }
  }
  
  return errors;
};

/**
 * Verifica si hay errores en el objeto de validación
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
