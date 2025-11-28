/**
 * Servicios - Exports Centralizados
 * 
 * Arquitectura SOLID:
 * - Cada servicio tiene una única responsabilidad
 * - Los servicios de dominio extienden BaseCrudService
 * - Inyección de dependencias soportada
 */

// HTTP
export { HttpClient, createHttpClient, apiClient } from './http';

// Base
export { BaseCrudService } from './base';

// Storage y Sesión
export { storageService, STORAGE_KEYS } from './storage.service';
export { userSessionService } from './userSession.service';

// Auth (separados por responsabilidad)
export { loginService } from './auth/login.service';
export { registerService } from './auth/register.service';
export { passwordRecoveryService } from './auth/passwordRecovery.service';

// Facade de compatibilidad
export { default as authService } from './auth.service';

// Dominio
export { childrenService, default as ChildrenService } from './children.service';
export { eventsService, default as EventsService } from './events.service';
