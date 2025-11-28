/**
 * Funciones de Validación de Formularios
 * Principio: SRP - Cada función valida un tipo específico de formulario
 */

import { validateSchema, hasErrors } from './validators';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateNombre,
  validateGenero,
  validateDescripcion,
  validateFechaNacimiento,
  createPasswordMatchValidator,
} from './schemas';

// ============ VALIDACIÓN DE FORMULARIO DE LOGIN ============

export const validateLoginForm = (formData) => {
  return validateSchema({
    email: validateEmail,
    password: validatePassword,
  }, formData);
};

// ============ VALIDACIÓN DE FORMULARIO DE REGISTRO ============

export const validateRegisterForm = (formData) => {
  return validateSchema({
    name: validateName,
    email: validateEmail,
    password: validatePassword,
  }, formData);
};

// ============ VALIDACIÓN DE FORMULARIO DE RESET PASSWORD ============

export const validateResetPasswordForm = (formData) => {
  const errors = {};

  const passwordError = validatePassword(formData.newPassword);
  if (passwordError) errors.newPassword = passwordError;

  const matchValidator = createPasswordMatchValidator(formData.newPassword);
  const matchError = matchValidator(formData.confirmPassword);
  if (matchError) errors.confirmPassword = matchError;

  return errors;
};

// ============ VALIDACIÓN DE FORMULARIO DE NIÑO ============

export const validateChildForm = (formData) => {
  const errors = {};

  const nombreError = validateNombre(formData.nombre);
  if (nombreError) errors.nombre = nombreError;

  const fechaError = validateFechaNacimiento(formData.fechaNacimiento);
  if (fechaError) errors.fechaNacimiento = fechaError;

  const generoError = validateGenero(formData.genero);
  if (generoError) errors.genero = generoError;

  const descripcionError = validateDescripcion(formData.descripcion);
  if (descripcionError) errors.descripcion = descripcionError;

  return errors;
};

// ============ VALIDACIÓN DE FORMULARIO DE EVENTO ============

export const validateEventForm = (formData) => {
  const errors = {};

  if (!formData.nombre) errors.nombre = 'El nombre es obligatorio';
  if (!formData.fechaInicio) errors.fechaInicio = 'La fecha de inicio es obligatoria';
  if (!formData.fechaFin) errors.fechaFin = 'La fecha de fin es obligatoria';
  if (!formData.lugar) errors.lugar = 'El lugar es obligatorio';

  // Validar que fecha fin sea posterior a fecha inicio
  if (formData.fechaInicio && formData.fechaFin) {
    const inicio = new Date(formData.fechaInicio);
    const fin = new Date(formData.fechaFin);
    if (fin < inicio) {
      errors.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }
  }

  return errors;
};

// Re-exportar hasErrors para conveniencia
export { hasErrors };
