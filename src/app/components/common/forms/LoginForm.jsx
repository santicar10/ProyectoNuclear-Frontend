"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Aquí irá tu lógica de autenticación
      console.log("Datos de login:", formData);
      
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí manejarías el login exitoso
      alert("Login exitoso!");
      
    } catch (error) {
      setErrors({ submit: "Error al iniciar sesión. Intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="tu@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <Button 
        type="submit" 
        fullWidth 
        isLoading={isLoading}
      >
        Iniciar Sesión
      </Button>

      <div className="text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
}