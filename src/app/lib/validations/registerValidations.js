import { validateEmail, validatePassword, validateName, hasErrors } from './common';

export { validateEmail, validatePassword, validateName, hasErrors };

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