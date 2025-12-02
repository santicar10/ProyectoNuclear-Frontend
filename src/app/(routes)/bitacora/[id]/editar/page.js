"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Select from "@components/common/Select";
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

export default function EditBitacoraEntryPage() {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    childId: "",
    descripcion: "",
    fotoUrl: "",
  });

  const [childrenOptions, setChildrenOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar rol y cargar datos
  useEffect(() => {
    checkRole();
    loadChildren();
    loadEntry();
  }, [params.id]);

  const checkRole = () => {
    const user = authService.getUserData();
    const admin = user?.rol === "administrador";
    setIsAdmin(admin);
    setIsCheckingRole(false);
  };

  const loadChildren = async () => {
    try {
      const result = await childrenService.getAll?.();
      if (result?.success && Array.isArray(result.data)) {
        const options = result.data.map((child) => ({
          value: child.id,
          label: child.nombre,
        }));
        setChildrenOptions(options);
      }
    } catch (error) {
      console.error("Error cargando niños:", error);
    }
  };

  const loadEntry = async () => {
    setIsFetching(true);
    try {
      const result = await bitacoraService.getById(params.id);

      if (result.success) {
        const entry = result.data;
        setFormData({
          childId: entry.ninoId || entry.childId || "",
          descripcion: entry.descripcion || "",
          fotoUrl: entry.imagen || "",
        });
      } else {
        alert(result.error || "No se pudo cargar la entrada de bitácora.");
        router.push("/perfil");
      }
    } catch (error) {
      alert("Error inesperado al cargar la bitácora.");
      router.push("/perfil");
    } finally {
      setIsFetching(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.childId) {
      newErrors.childId = "Debes seleccionar un niño o niña.";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción de la bitácora es obligatoria.";
    }

    if (formData.fotoUrl && !/^https?:\/\/.+/i.test(formData.fotoUrl)) {
      newErrors.fotoUrl = "La URL de la imagen no es válida.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBack = () => {
    if (formData.childId) {
      router.push(`/bitacora/${formData.childId}`);
    } else {
      router.push("/perfil");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const payload = {
        descripcion: formData.descripcion,
        imagen: formData.fotoUrl || null,
        ninoId: formData.childId,
      };

      const result = await bitacoraService.update(params.id, payload);

      if (result.success) {
        alert(result.message || "Entrada de bitácora actualizada correctamente.");
        router.push(`/bitacora/${formData.childId}`);
      } else {
        setErrors({ submit: result.error || "No se pudo actualizar la entrada." });
      }
    } catch (error) {
      setErrors({ submit: "Error inesperado. Por favor intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingRole || isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-gray-600 text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso restringido</h1>
          <p className="text-gray-600 mb-6">
            Solo los administradores pueden editar entradas en la bitácora.
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

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Editar entrada de bitácora
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-[#1A125C]">
            <Select
              label="Niño / Niña"
              name="childId"
              options={childrenOptions}
              value={formData.childId}
              onChange={handleSelectChange}
              error={errors.childId}
              labelClassName="text-gray-800"
              selectClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
              placeholder="Selecciona un niño o niña"
            />

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                URL de Imagen (opcional)
              </label>
              <input
                type="text"
                name="fotoUrl"
                value={formData.fotoUrl}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.fotoUrl && (
                <p className="mt-1 text-xs text-red-600">{errors.fotoUrl}</p>
              )}
            </div>

            <Textarea
              label="Descripción de la entrada"
              name="descripcion"
              placeholder="Actualiza la nota de la bitácora..."
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
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
