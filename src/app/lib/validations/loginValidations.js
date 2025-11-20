import { validateEmail, validatePassword, hasErrors } from './common';

export { validateEmail, validatePassword, hasErrors };

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