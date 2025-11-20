"use client";
import { useState } from "react";

export function useFormSubmit(submitFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await submitFn(data);
      
      if (!result.success) {
        setError(result.error || "Error al procesar la solicitud");
        return { success: false, error: result.error };
      }
      
      return { success: true, data: result.data, message: result.message };
    } catch (err) {
      const errorMessage = err.message || "Error inesperado. Por favor intenta nuevamente.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { 
    handleSubmit, 
    isLoading, 
    error, 
    clearError 
  };
}