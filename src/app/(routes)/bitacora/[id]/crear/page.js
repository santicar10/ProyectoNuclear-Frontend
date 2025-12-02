"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import childrenService from "@/app/lib/services/children.service";
import bitacoraService from "@/app/lib/services/bitacora.service";
import authService from "@/app/lib/services/auth.service";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function CreateBitacoraEntryPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id;

  const [formData, setFormData] = useState({
    descripcion: "",
    fotoUrl: "",
  });

  const [childName, setChildName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkRole();
    loadChildInfo();
  }, []);

  const checkRole = () => {
    const user = authService.getUserData();
    const admin = user?.rol === "administrador";
    setIsAdmin(admin);
    setIsCheckingRole(false);
  };

  const loadChildInfo = async () => {
    try {
      const result = await childrenService.getById(childId);
      if (result?.success && result.data) {
        setChildName(result.data.nombre);
      }
    } catch (error) {
      console.error("Error cargando niño:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción de la bitácora es obligatoria.";
    }

    if (formData.fotoUrl && !/^https?:\/\/.+/i.test(formData.fotoUrl)) {
      newErrors.fotoUrl = "La URL de la imagen no es válida.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBack = () => {
    router.push('/bitacora');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await bitacoraService.createEntry(childId, {
        descripcion: formData.descripcion,
        imagen: formData.fotoUrl || null,
      });

      if (result.success) {
        alert(result.message || "Entrada de bitácora registrada correctamente.");
        router.push(`/bitacora/${childId}`);
      } else {
        setErrors({ submit: result.error || "No se pudo registrar la entrada." });
      }
    } catch (error) {
      setErrors({ submit: "Error inesperado. Intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingRole) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Verificando permisos...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso restringido</h1>
          <p className="text-gray-600 mb-6">
            Solo los administradores pueden registrar entradas en la bitácora.
          </p>
          <Button
            variant="warning"
            className="rounded-full px-8 font-semibold"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowBackIcon />
            <span>Volver</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registrar entrada en la bitácora
          </h1>
          {childName && (
            <p className="text-gray-600 mb-8">
              Para: <span className="font-semibold text-[#1A125C]">{childName}</span>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-[#1A125C]">
            <Input
              label="URL de Imagen (opcional)"
              type="text"
              name="fotoUrl"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.fotoUrl}
              onChange={handleChange}
              error={errors.fotoUrl}
              labelClassName="text-gray-800"
              inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            <Textarea
              label="Descripción de la entrada"
              name="descripcion"
              placeholder="Escribe aquí la nota de la bitácora..."
              value={formData.descripcion}
              onChange={handleChange}
              error={errors.descripcion}
              rows={8}
              labelClassName="text-gray-800"
              textareaClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="rounded-full flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="warning"
                isLoading={isLoading}
                className="rounded-full flex-1 font-bold"
              >
                Registrar entrada
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}