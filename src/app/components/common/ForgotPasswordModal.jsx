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
 * Modal simplificado de recuperación de contraseña
 * Envía nueva contraseña directamente al correo (sin códigos de verificación)
 */
export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: email, 2: éxito
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setErrors({});
    setIsLoading(false);
    onClose();
  };

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
      const result = await authService.recoverPassword(email);
      
      if (result.success) {
        console.log("Contraseña enviada a:", email);
        setStep(2); // Ir a pantalla de éxito
      } else {
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

  const renderContent = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleSendEmail} className="space-y-6">
          <div className="text-center mb-6">
            <MailIcon />
            <p className="text-gray-600 text-sm">
              Ingresa tu correo electrónico y te enviaremos una nueva contraseña temporal.
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
              Enviar Nueva Contraseña
            </Button>
          </div>
        </form>
      );
    }

    // Paso 2: Éxito
    return (
      <div className="text-center py-6">
        <CheckCircleIcon />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Contraseña Enviada!
        </h3>
        <p className="text-gray-600 mb-4">
          Hemos enviado una nueva contraseña temporal a:
        </p>
        <p className="font-semibold text-gray-900 mb-6">{email}</p>
        <p className="text-sm text-gray-500 mb-6">
          Por favor revisa tu bandeja de entrada y tu carpeta de spam. 
          Te recomendamos cambiar esta contraseña después de iniciar sesión.
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
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 1 ? "Recuperar Contraseña" : ""}
      size="md"
      showCloseButton={step !== 2}
      closeOnOverlayClick={step !== 2}
    >
      {renderContent()}
    </Modal>
  );
}