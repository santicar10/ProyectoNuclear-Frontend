"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";


// Importaciones por defecto (pueden ser inyectadas)
import defaultLoginService from "@/app/lib/services/auth/login.service";
import defaultUserSession from "@/app/lib/services/userSession.service";

/**
 * Hook de Autenticación
 * Principio: DIP - Depende de abstracciones (servicios inyectables)
 * 
 * @param {Object} options - Opciones de configuración
 * @param {Object} options.loginService - Servicio de login (inyección)
 * @param {Object} options.userSession - Servicio de sesión (inyección)
 */
export function useAuth(options = {}) {
  const {
    loginService = defaultLoginService,
    userSession = defaultUserSession,
  } = options;

  const pathname = usePathname();
  const [state, setState] = useState({
    isAuthenticated: false,
    userRole: null,
    userName: '',
    userId: null,
    isLoading: true,
  });

  const checkAuth = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    const userData = userSession.get();
    
    if (userData) {
      setState({
        isAuthenticated: true,
        userRole: userData.rol,
        userName: userData.nombre || 'Usuario',
        userId: userData.id,
        isLoading: false,
      });
    } else {
      setState({
        isAuthenticated: false,
        userRole: null,
        userName: '',
        userId: null,
        isLoading: false,
      });
    }
  }, [userSession]);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  const logout = useCallback(async () => {
    const result = await loginService.logout();
    
    if (result.success) {
      setState({
        isAuthenticated: false,
        userRole: null,
        userName: '',
        userId: null,
        isLoading: false,
      });
    }
    
    return result;
  }, [loginService]);

  const isAdmin = useCallback(() => {
    return state.userRole === 'administrador';
  }, [state.userRole]);

  const isPadrino = useCallback(() => {
    return state.userRole === 'padrino';
  }, [state.userRole]);

  const getInitials = useCallback((name = state.userName) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }, [state.userName]);

  return {
    ...state,
    logout,
    checkAuth,
    isAdmin,
    isPadrino,
    getInitials,
  };
}

export default useAuth;
