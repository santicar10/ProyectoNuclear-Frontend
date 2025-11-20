/**
 * Validaciones comunes reutilizables
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

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Debes confirmar tu contraseña";
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }

  return null;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};