"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";

// AJUSTA LA RUTA SI CAMBIA EN TU PROYECTO
import eventsService from "@/app/lib/services/events.service";
import { validateEventForm, hasErrors } from "@/app/lib/validations/eventValidations";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    lugar: "",
    fotoUrl: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBack = () => {
    router.push("/eventos");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateEventForm(formData);

    if (hasErrors(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await eventsService.create(formData);

      if (result.success) {
        alert(result.message || "Evento registrado correctamente.");
        router.push("/eventos");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Error inesperado. Intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* BOTÓN VOLVER */}
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowBackIcon />
            <span>Volver</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Registrar Nuevo Evento
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-[#1A125C]">

            {/* NOMBRE */}
            <Input
              label="Nombre del Evento"
              type="text"
              name="nombre"
              placeholder="Ej: Taller de pintura"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              labelClassName="text-gray-800"
              inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            {/* FECHAS */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Fecha de Inicio"
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                error={errors.fechaInicio}
                labelClassName="text-gray-800"
                inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
              />

              <Input
                label="Fecha de Fin"
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                error={errors.fechaFin}
                labelClassName="text-gray-800"
                inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
              />
            </div>

            {/* LUGAR */}
            <Input
              label="Lugar"
              type="text"
              name="lugar"
              placeholder="Ej: Sede principal, salón 203"
              value={formData.lugar}
              onChange={handleChange}
              error={errors.lugar}
              labelClassName="text-gray-800"
              inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            {/* URL IMAGEN */}
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

            {/* DESCRIPCIÓN */}
            <Textarea
              label="Descripción"
              name="descripcion"
              placeholder="Descripción del evento..."
              value={formData.descripcion}
              onChange={handleChange}
              error={errors.descripcion}
              rows={6}
              labelClassName="text-gray-800"
              textareaClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            {/* ERROR GENERAL */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* BOTONES */}
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
                Registrar Evento
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
