import { validateEmail, validatePassword, validatePasswordMatch, hasErrors } from './common';

export { validateEmail, hasErrors };

export const validateVerificationCode = (code, length = 6) => {
  if (!code || code.trim() === "") {
    return "El código de verificación es requerido";
  }

  if (code.trim().length < length) {
    return `El código debe tener ${length} caracteres`;
  }

  const codeRegex = /^[a-zA-Z0-9]+$/;
  if (!codeRegex.test(code)) {
    return "El código solo puede contener números y letras";
  }

  return null;
};

export const validateNewPassword = validatePassword;

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