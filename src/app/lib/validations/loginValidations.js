/**
 * Valida el formato de un email
 * 
 * @param {string} email - Email a validar
 * @returns {string|null} Mensaje de error o null si es válido
 * 
 * @example
 * validateEmail("user@example.com") // null
 * validateEmail("invalid") // "Por favor ingresa un email válido"
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
 * Valida una contraseña
 * Reglas: 6-50 caracteres, no puede estar vacía
 * 
 * @param {string} password - Contraseña a validar
 * @returns {string|null} Mensaje de error o null si es válida
 */
export const validatePassword = (password) => {
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
 * Valida todos los campos del formulario de login
 * 
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.email - Email del usuario
 * @param {string} formData.password - Contraseña del usuario
 * @returns {Object} Objeto con errores por campo (vacío si no hay errores)
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
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