/**
 * Valida el formato de un email
 * 
 * @param {string} email - Email a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "El email es requerido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Por favor ingresa un email válido";
  }

  return null;
};

/**
 * Valida un código de verificación
 * 
 * @param {string} code - Código a validar
 * @param {number} length - Longitud esperada del código (default: 6)
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateVerificationCode = (code, length = 6) => {
  if (!code || code.trim() === "") {
    return "El código de verificación es requerido";
  }

  if (code.trim().length < length) {
    return `El código debe tener ${length} caracteres`;
  }

  // Validar que solo contenga números y letras
  const codeRegex = /^[a-zA-Z0-9]+$/;
  if (!codeRegex.test(code)) {
    return "El código solo puede contener números y letras";
  }

  return null;
};

/**
 * Valida una nueva contraseña
 * 
 * @param {string} password - Contraseña a validar
 * @returns {string|null} Mensaje de error o null si es válida
 */
export const validateNewPassword = (password) => {
  if (!password || password.trim() === "") {
    return "La contraseña es requerida";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }

  if (password.length > 50) {
    return "La contraseña no puede tener más de 50 caracteres";
  }

  return null;
};

/**
 * Valida que dos contraseñas coincidan
 * 
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Contraseña de confirmación
 * @returns {string|null} Mensaje de error o null si coinciden
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Debes confirmar tu contraseña";
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }

  return null;
};

/**
 * Valida el formulario completo de restablecimiento de contraseña
 * 
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.newPassword - Nueva contraseña
 * @param {string} formData.confirmPassword - Confirmación de contraseña
 * @returns {Object} Objeto con errores por campo
 */
export const validateResetPasswordForm = (formData) => {
  const errors = {};

  const passwordError = validateNewPassword(formData.newPassword);
  if (passwordError) {
    errors.newPassword = passwordError;
  }

  const matchError = validatePasswordMatch(
    formData.newPassword, 
    formData.confirmPassword
  );
  if (matchError) {
    errors.confirmPassword = matchError;
  }

  return errors;
};

/**
 * Verifica si hay errores en el objeto de validación
 * 
 * @param {Object} errors - Objeto con errores
 * @returns {boolean} true si hay errores, false si no
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};