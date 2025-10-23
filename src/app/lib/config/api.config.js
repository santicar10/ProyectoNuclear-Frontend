/**
 * Configuración de la API
 * 
 * Este archivo centraliza todas las URLs y configuraciones de la API
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
};

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Tiempo de expiración del token (en milisegundos)
export const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 horas

// Clave para almacenar el token en localStorage
export const TOKEN_STORAGE_KEY = 'auth_token';
export const USER_STORAGE_KEY = 'user_data';