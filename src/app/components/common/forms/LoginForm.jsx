"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import ForgotPasswordModal from "@components/common/ForgotPasswordModal";
import authService from "@/app/lib/services/auth.service";
import { 
  validateLoginForm, 
  hasErrors, 
  validateEmail, 
  validatePassword 
} from "@/app/lib/validations/loginValidations";

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/**
 * Formulario de inicio de sesión con validación en tiempo real
 * 
 * @component
 * @example
 * <LoginForm />
 */
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

    // Limpia el error del campo al modificarlo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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
      setErrors(prev => ({ ...prev, [name]: error }));
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
      // Llamada real al backend
      const result = await authService.login(formData.email, formData.password);

      if (result.success) {
        // Login exitoso
        console.log("Login exitoso:", result.data);
        
        // Redirigir al dashboard o página principal
        // Ajusta la ruta según tu aplicación
        router.push('/dashboard');
        
        // O mostrar mensaje de éxito
        // alert("¡Bienvenido de vuelta!");
      } else {
        // Error en el login
        setErrors({ 
          submit: result.error || "Error al iniciar sesión. Verifica tus credenciales." 
        });
      }
    } catch (error) {
      console.error("Error inesperado:", error);
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
            onBlur={handleBlur}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
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

      {/* Modal de recuperación de contraseña */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}