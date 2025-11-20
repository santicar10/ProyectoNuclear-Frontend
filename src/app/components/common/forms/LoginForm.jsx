"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import ForgotPasswordModal from "@components/common/ForgotPasswordModal";
import authService from "@/app/lib/services/auth.service";
import { ArrowIcon } from "@components/common/icons";
import { validateLoginForm, hasErrors } from "@/app/lib/validations/loginValidations";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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
      const result = await authService.login(formData.email, formData.password);

      if (result.success) {
        router.push('/');
      } else {
        setErrors({ 
          submit: result.error || "Error al iniciar sesión. Verifica tus credenciales." 
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
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="Login@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          labelClassName="text-gray-800"
          inputClassName="input-huahuacuna"
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-800">
              Contraseña
            </label>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Olvidaste la contraseña?
            </button>
          </div>
          <Input
            name="password"
            placeholder="••••••••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            inputClassName="input-huahuacuna"
          />
        </div>

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
            INICIA SESIÓN
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="/registrar" className="text-blue-600 hover:underline font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}