"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import authService from "@/app/lib/services/auth.service";
import { ArrowIcon } from "@components/common/icons";
import { validateRegisterForm, hasErrors } from "@/app/lib/validations/registerValidations";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateRegisterForm(formData);
    
    if (hasErrors(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await authService.register(
        formData.name,
        formData.email,
        formData.password
      );

      if (result.success) {
        alert(result.message || "¡Registro exitoso! Por favor inicia sesión.");
        router.push('/login');
      } else {
        setErrors({ 
          submit: result.error || "Error al registrarse. Por favor intenta nuevamente." 
        });
      }
    } catch (error) {
      setErrors({ 
        submit: "Error inesperado. Por favor intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nombre"
        type="text"
        name="name"
        placeholder="Juan Pérez"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        labelClassName="text-gray-800"
        inputClassName="input-huahuacuna"
      />

      <Input
        label="Correo Electrónico"
        type="email"
        name="email"
        placeholder="correo@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        labelClassName="text-gray-800"
        inputClassName="input-huahuacuna"
      />

      <Input
        label="Contraseña"
        name="password"
        placeholder="••••••••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        showPasswordToggle={true}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        labelClassName="text-gray-800"
        inputClassName="input-huahuacuna"
      />

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          type="submit" 
          isLoading={isLoading}
          variant="warning"
          icon={ArrowIcon}
          iconPosition="right"
          className="rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl shadow-md hover:shadow-lg font-bold px-12"
        >
          REGISTRARSE
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </form>
  );
}