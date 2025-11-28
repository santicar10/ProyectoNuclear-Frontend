/**
 * Servicios de Autenticación - Exports centralizados
 * Cada servicio tiene una única responsabilidad (SRP)
 */

export { loginService, default as LoginService } from './login.service';
export { registerService, default as RegisterService } from './register.service';
export { passwordRecoveryService, default as PasswordRecoveryService } from './passwordRecovery.service';
