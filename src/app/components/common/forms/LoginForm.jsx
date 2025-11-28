"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import ForgotPasswordModal from "@components/common/ForgotPasswordModal";
import { ArrowRightIcon } from "@components/common/Icons";

// Hooks con inyección de dependencias
import { useForm } from "@/app/hooks/useForm";

// Servicios (pueden ser inyectados)
import { loginService } from "@/app/lib/services/auth";

// Validaciones
import { validateLoginForm } from "@/app/lib/validations";

// Estilos
import { INPUT_STYLES, LABEL_STYLES, BUTTON_STYLES } from "@/app/lib/constants/styles";

/**
 * LoginForm refactorizado siguiendo SOLID
 * 
 * Principios aplicados:
 * - SRP: El componente solo renderiza UI, la lógica está en hooks
 * - OCP: Fácil de extender cambiando el servicio o validador
 * - DIP: Depende de abstracciones (hooks, servicios inyectables)
 */
export default function LoginForm({ 
  // Inyección de dependencias para testing
  authService = loginService,
  validator = validateLoginForm,
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Hook de formulario con validador y servicio inyectados
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setError,
  } = useForm({
    initialValues: { email: '', password: '' },
    validate: validator,
    onSubmit: async (formData) => {
      const result = await authService.login(formData.email, formData.password);
      
      if (result.success) {
        router.push('/');
        return result;
      } else {
        setError('submit', result.error || 'Error al iniciar sesión');
        return result;
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="Login@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          labelClassName={LABEL_STYLES.dark}
          inputClassName={`${INPUT_STYLES.yellow} text-gray-800 placeholder-gray-500`}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-800">Contraseña</label>
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
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            inputClassName={`${INPUT_STYLES.yellow} text-gray-800 placeholder-gray-500`}
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
            isLoading={isSubmitting}
            variant="warning"
            icon={ArrowRightIcon}
            iconPosition="right"
            className={`${BUTTON_STYLES.roundedCustom} shadow-md hover:shadow-lg font-bold px-12`}
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
