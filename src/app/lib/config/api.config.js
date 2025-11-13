// src/app/lib/config/api.config.js
/**
 * Configuración de la API
 * Sistema basado en SESIONES HTTP (sin tokens JWT)
 */

// URL base del backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/auth/login',
  LOGOUT: '/api/usuarios/logout',
  
  // Usuarios
  REGISTER: '/api/usuarios/registro',
  PROFILE: '/api/usuarios/perfil',
  RECOVER_PASSWORD: '/api/usuarios/recuperar',
  CHANGE_PASSWORD: '/api/usuarios/cambiar',
  VERIFY_CODE: '/api/usuarios/verificar-codigo',
  RESET_PASSWORD: '/api/usuarios/restablecer-password',
  RESEND_CODE: '/api/usuarios/reenviar-codigo',

  // Niños
  CHILDREN: '/api/ninos',
  CHILDREN_BY_ID: (id) => `/api/ninos/${id}`,
  CHILDREN_AVAILABLE: '/api/ninos/disponibles',
};

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Clave para almacenar datos del usuario en localStorage
export const USER_STORAGE_KEY = 'user_data';