export const validateEventForm = (data) => {
  const errors = {};

  if (!data.nombre) errors.nombre = "El nombre es obligatorio";
  if (!data.fechaInicio) errors.fechaInicio = "La fecha de inicio es obligatoria";
  if (!data.fechaFin) errors.fechaFin = "La fecha de fin es obligatoria";
  if (!data.lugar) errors.lugar = "El lugar es obligatorio";

  return errors;
};

export const hasErrors = (errors) => {
  return Object.values(errors).some((e) => e);
};
