/**
 * Configuración de la API
 * Principio: SRP - Solo contiene configuración
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  TIMEOUT: 30000,
  CREDENTIALS: 'include',
};

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/api/usuarios/logout',
    REGISTER: '/api/usuarios/registro',
    PROFILE: '/api/usuarios/perfil',
  },
  
  // Recuperación de contraseña
  PASSWORD: {
    RECOVER: '/api/usuarios/recuperar',
    VERIFY_CODE: '/api/usuarios/verificar-codigo',
    CHANGE: '/api/usuarios/cambiar',
    RESEND_CODE: '/api/usuarios/reenviar-codigo',
  },
  
  // Niños
  CHILDREN: {
    BASE: '/api/ninos',
    PUBLIC: '/api/ninos/publico',
    AVAILABLE: '/api/ninos/disponibles',
    BY_ID: (id) => `/api/ninos/${id}`,
    PUBLIC_BY_ID: (id) => `/api/ninos/publico/${id}`,
  },
  
  // Eventos
  EVENTS: {
    BASE: '/api/eventos',
    BY_ID: (id) => `/api/eventos/${id}`,
    UPCOMING: '/api/eventos/proximos',
  },
  
  // Donaciones
  DONATIONS: {
    CREATE_PREFERENCE: '/api/donaciones/create_preference',
  },
};

export default API_CONFIG;
