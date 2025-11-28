/**
 * Validaciones - Exports Centralizados
 * 
 * Estructura SOLID:
 * - validators.js: Validadores primitivos composables (SRP, OCP)
 * - schemas.js: Schemas precompuestos (OCP)
 * - formValidations.js: Validadores de formularios completos (SRP)
 */

// Validadores base (para crear validadores personalizados)
export {
  required,
  minLength,
  maxLength,
  pattern,
  email,
  match,
  oneOf,
  compose,
  validateSchema,
  hasErrors,
} from './validators';

// Schemas precompuestos
export {
  validateEmail,
  validatePassword,
  validateName,
  validateNombre,
  validateGenero,
  validateDescripcion,
  validateFechaNacimiento,
  validateVerificationCode,
  createPasswordMatchValidator,
} from './schemas';

// Validadores de formularios completos
export {
  validateLoginForm,
  validateRegisterForm,
  validateResetPasswordForm,
  validateChildForm,
  validateEventForm,
} from './formValidations';

// Alias para compatibilidad con imports antiguos
export { validatePassword as validateNewPassword } from './schemas';
export { createPasswordMatchValidator as validatePasswordMatch } from './schemas';
