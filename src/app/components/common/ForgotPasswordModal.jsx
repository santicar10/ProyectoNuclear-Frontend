"use client";

import { useState } from "react";
import Modal from "@components/common/Modal";
import Input from "@components/common/inputs/Input";
import Button from "@components/common/Button";
import authService from "@/app/lib/services/auth.service";
import { validateEmail } from "@/app/lib/validations/forgotPasswordValidations";

const MailIcon = () => (
  <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * Modal para recuperación de contraseña con flujo completo de 4 pasos
 * 
 * Flujo:
 * 1. Usuario ingresa email → Backend envía código al correo
 * 2. Usuario ingresa código recibido → Backend verifica
 * 3. Usuario ingresa nueva contraseña → Backend actualiza
 * 4. Confirmación de éxito
 * 
 * Endpoints usados:
 * - POST /api/usuarios/recuperar (enviar código)
 * - POST /api/usuarios/verificar-codigo (verificar código)
 * - POST /api/usuarios/cambiar (nueva contraseña)
 * - POST /api/usuarios/reenviar-codigo (reenviar código)
 * 
 * @component
 */
export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: email, 2: código, 3: nueva contraseña, 4: éxito
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Resetear estado al cerrar
  const handleClose = () => {
    setStep(1);
    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setIsLoading(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  // PASO 1: Enviar email de recuperación
  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Llamada al backend para enviar código
      const result = await authService.recoverPassword(email);
      
      if (result.success) {
        // Éxito: código enviado al email
        console.log("Código enviado a:", email);
        setStep(2); // Pasar al siguiente paso
      } else {
        // Error del servidor
        setErrors({ 
          submit: result.error || "Error al enviar el correo. Intenta nuevamente." 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        submit: "Error inesperado. Por favor intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // PASO 2: Verificar código
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.trim().length < 4) {
      setErrors({ code: "Debes ingresar el código recibido" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Llamada al backend para verificar código
      const result = await authService.verifyRecoveryCode(email, verificationCode);
      
      if (result.success) {
        // Código válido
        console.log("Código verificado correctamente");
        setStep(3); // Pasar al siguiente paso
      } else {
        // Código inválido
        setErrors({ 
          submit: result.error || "Código inválido. Verifica e intenta nuevamente." 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        submit: "Error al verificar el código. Intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // PASO 3: Establecer nueva contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Llamada al backend para restablecer contraseña
      const result = await authService.resetPassword(email, verificationCode, newPassword);
      
      if (result.success) {
        // Contraseña actualizada
        console.log("Contraseña restablecida exitosamente");
        setStep(4); // Pasar a confirmación
      } else {
        // Error al actualizar
        setErrors({ 
          submit: result.error || "Error al restablecer la contraseña. Intenta nuevamente." 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        submit: "Error inesperado. Por favor intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const result = await authService.resendRecoveryCode(email);
      
      if (result.success) {
        alert("Código reenviado correctamente. Revisa tu correo.");
      } else {
        setErrors({ 
          submit: result.error || "Error al reenviar el código." 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        submit: "Error al reenviar el código." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar contenido según el paso
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="text-center mb-6">
              <MailIcon />
              <p className="text-gray-600 text-sm">
                Ingresa tu correo electrónico y te enviaremos un código de verificación para restablecer tu contraseña.
              </p>
            </div>

            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
              labelClassName="text-gray-800"
              inputClassName="bg-gray-50 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
            />

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleClose}
                className="rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="warning"
                fullWidth
                isLoading={isLoading}
                className="rounded-lg"
              >
                Enviar Código
              </Button>
            </div>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="text-center mb-6">
              <MailIcon />
              <p className="text-gray-600 text-sm mb-2">
                Hemos enviado un código de verificación a:
              </p>
              <p className="font-semibold text-gray-900">{email}</p>
              <p className="text-gray-500 text-xs mt-2">
                Por favor revisa tu bandeja de entrada y tu carpeta de spam.
              </p>
            </div>

            <Input
              label="Código de Verificación"
              type="text"
              name="code"
              placeholder="Ingresa el código"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value);
                if (errors.code) setErrors({ ...errors, code: "" });
              }}
              error={errors.code}
              labelClassName="text-gray-800"
              inputClassName="bg-gray-50 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-center text-xl tracking-wider"
            />

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                ¿No recibiste el código? Reenviar
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setStep(1)}
                className="rounded-lg"
              >
                Atrás
              </Button>
              <Button
                type="submit"
                variant="warning"
                fullWidth
                isLoading={isLoading}
                className="rounded-lg"
              >
                Verificar Código
              </Button>
            </div>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Ingresa tu nueva contraseña. Debe tener al menos 6 caracteres.
              </p>
            </div>

            <Input
              label="Nueva Contraseña"
              name="newPassword"
              placeholder="••••••••••••••"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors({ ...errors, newPassword: "" });
              }}
              error={errors.newPassword}
              showPasswordToggle={true}
              showPassword={showNewPassword}
              onTogglePassword={() => setShowNewPassword(!showNewPassword)}
              labelClassName="text-gray-800"
              inputClassName="bg-gray-50 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
            />

            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              placeholder="••••••••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
              }}
              error={errors.confirmPassword}
              showPasswordToggle={true}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              labelClassName="text-gray-800"
              inputClassName="bg-gray-50 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
            />

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setStep(2)}
                className="rounded-lg"
              >
                Atrás
              </Button>
              <Button
                type="submit"
                variant="warning"
                fullWidth
                isLoading={isLoading}
                className="rounded-lg"
              >
                Restablecer Contraseña
              </Button>
            </div>
          </form>
        );

      case 4:
        return (
          <div className="text-center py-6">
            <CheckCircleIcon />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Contraseña Restablecida!
            </h3>
            <p className="text-gray-600 mb-6">
              Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
            <Button
              variant="warning"
              onClick={handleClose}
              className="rounded-lg mx-auto"
            >
              Ir a Iniciar Sesión
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 1 ? "Recuperar Contraseña" :
        step === 2 ? "Verificar Código" :
        step === 3 ? "Nueva Contraseña" :
        ""
      }
      size="md"
      showCloseButton={step !== 4}
      closeOnOverlayClick={step !== 4}
    >
      {renderContent()}
    </Modal>
  );
}