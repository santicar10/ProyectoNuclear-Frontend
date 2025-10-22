/**
 * Validación de nombre
 * @param {string} name - Nombre a validar
 * @returns {string|null} - Mensaje de error o null si es válido
 */
export const validateName = (name) => {
  if (!name || name.trim() === "") {
    return "El nombre es requerido";
  }

  if (name.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres";
  }

  if (name.trim().length > 50) {
    return "El nombre no puede tener más de 50 caracteres";
  }

  return null;
};

/**
 * Validación de email
 * @param {string} email - Email a validar
 * @returns {string|null} - Mensaje de error o null si es válido
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
 * Validación de password
 * @param {string} password - Password a validar
 * @returns {string|null} - Mensaje de error o null si es válido
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
 * Validación completa del formulario de registro
 * @param {Object} formData - Datos del formulario {name, email, password}
 * @returns {Object} - Objeto con errores {name?: string, email?: string, password?: string}
 */
export const validateRegisterForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) {
    errors.name = nameError;
  }

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
 * Verifica si el formulario tiene errores
 * @param {Object} errors - Objeto de errores
 * @returns {boolean} - true si hay errores, false si no
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};