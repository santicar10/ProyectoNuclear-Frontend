export const validateNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") {
    return "El nombre es requerido";
  }

  if (nombre.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres";
  }

  if (nombre.trim().length > 100) {
    return "El nombre no puede tener más de 100 caracteres";
  }

  return null;
};

export const validateFechaNacimiento = (fecha) => {
  if (!fecha || fecha.trim() === "") {
    return "La fecha de nacimiento es requerida";
  }

  const birthDate = new Date(fecha);
  const today = new Date();
  
  if (birthDate > today) {
    return "La fecha de nacimiento no puede ser futura";
  }

  // Calcular edad
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age > 18) {
    return "El niño debe ser menor de 18 años";
  }

  if (age < 0) {
    return "La fecha de nacimiento es inválida";
  }

  return null;
};

export const validateGenero = (genero) => {
  if (!genero || genero.trim() === "") {
    return "El género es requerido";
  }

  const validGenders = ['M', 'F'];
  if (!validGenders.includes(genero.toUpperCase())) {
    return "Género inválido";
  }

  return null;
};

export const validateDescripcion = (descripcion) => {
  if (!descripcion || descripcion.trim() === "") {
    return "La descripción es requerida";
  }

  if (descripcion.trim().length < 10) {
    return "La descripción debe tener al menos 10 caracteres";
  }

  if (descripcion.trim().length > 1000) {
    return "La descripción no puede tener más de 1000 caracteres";
  }

  return null;
};

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

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};