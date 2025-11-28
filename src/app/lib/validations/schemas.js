/**
 * Schemas de Validación
 * Principio: OCP - Schemas extensibles mediante composición de validadores
 */

import { 
  required, 
  minLength, 
  maxLength, 
  email, 
  compose, 
  match, 
  oneOf,
  pattern 
} from './validators';

// ============ VALIDADORES COMUNES PRECOMPUESTOS ============

/**
 * Validador de email completo
 */
export const validateEmail = compose(
  required('El email'),
  email()
);

/**
 * Validador de contraseña
 */
export const validatePassword = compose(
  required('La contraseña'),
  minLength(6, 'La contraseña'),
  maxLength(50, 'La contraseña')
);

/**
 * Validador de nombre
 */
export const validateName = compose(
  required('El nombre'),
  minLength(2, 'El nombre'),
  maxLength(50, 'El nombre')
);

/**
 * Validador de nombre largo (para nombres completos)
 */
export const validateNombre = compose(
  required('El nombre'),
  minLength(2, 'El nombre'),
  maxLength(100, 'El nombre')
);

/**
 * Validador de género
 */
export const validateGenero = compose(
  required('El género'),
  oneOf(['M', 'F', 'm', 'f'], 'Género inválido')
);

/**
 * Validador de descripción
 */
export const validateDescripcion = compose(
  required('La descripción'),
  minLength(10, 'La descripción'),
  maxLength(1000, 'La descripción')
);

/**
 * Validador de código de verificación
 */
export const validateVerificationCode = compose(
  required('El código'),
  minLength(4, 'El código')
);

// ============ VALIDADOR DE FECHA DE NACIMIENTO ============

export const validateFechaNacimiento = (fecha) => {
  if (!fecha || fecha.trim() === '') {
    return 'La fecha de nacimiento es requerida';
  }

  const birthDate = new Date(fecha);
  const today = new Date();
  
  if (birthDate > today) {
    return 'La fecha de nacimiento no puede ser futura';
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age > 18) {
    return 'El niño debe ser menor de 18 años';
  }

  if (age < 0) {
    return 'La fecha de nacimiento es inválida';
  }

  return null;
};

// ============ VALIDADOR DE MATCH DE CONTRASEÑA ============

export const createPasswordMatchValidator = (password) => {
  return compose(
    required('La confirmación de contraseña'),
    match(password, 'Las contraseñas no coinciden')
  );
};
