/**
 * Utilidades de fecha y edad
 * Principio: SRP - Solo cálculos relacionados con fechas
 */

/**
 * Calcula la edad basándose en la fecha de nacimiento
 * @param {string|Date} birthDate - Fecha de nacimiento
 * @returns {number} Edad en años
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Formatea una fecha a string ISO (YYYY-MM-DD)
 * @param {Date} date 
 * @returns {string}
 */
export const formatDateISO = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Formatea una fecha para mostrar (DD/MM/YYYY)
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDateDisplay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-CO');
};

/**
 * Verifica si una fecha es válida
 * @param {string} dateString 
 * @returns {boolean}
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};
