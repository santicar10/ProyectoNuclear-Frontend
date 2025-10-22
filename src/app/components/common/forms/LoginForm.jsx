"use client";

import { useState } from "react";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import { validateLoginForm, hasErrors, validateEmail, validatePassword } from "@lib/validations/loginValidations";

// Icono de flecha
const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = null;

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateLoginForm(formData);
    
    if (hasErrors(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      console.log("Datos de login:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Login exitoso!");
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        submit: "Error al iniciar sesión. Por favor verifica tus credenciales." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Correo Electrónico"
        type="email"
        name="email"
        placeholder="Login@example.com"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        labelClassName="text-gray-800"
        inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-800">
            Contraseña
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Olvidaste la contraseña?
          </a>
        </div>
        <Input
          name="Contraseña"
          placeholder="••••••••••••••"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          showPasswordToggle={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
        />
      </div>

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
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
          INICIA SESIÓN
        </Button>
      </div>
    </form>
  );
}