"use client";
import { useState, useEffect } from "react";
import authService from "@/app/lib/services/auth.service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const userData = authService.getUserData();
    if (userData) {
      setIsAuthenticated(true);
      setUserRole(userData.rol);
      setUserName(userData.nombre || "Usuario");
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName("");
    }
    setIsLoading(false);
  };

  const refreshAuth = () => {
    checkAuth();
  };

  return { 
    isAuthenticated, 
    userRole, 
    userName, 
    isLoading,
    refreshAuth 
  };
}