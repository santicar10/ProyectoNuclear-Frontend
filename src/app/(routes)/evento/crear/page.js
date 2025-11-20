"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import { ArrowBackIcon } from "@components/common/icons";
import eventsService from "@/app/lib/services/events.service";
import { validateEventForm, hasErrors } from "@/app/lib/validations/eventValidations";

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

            <Input
              label="Nombre del Evento"
              type="text"
              name="nombre"
              placeholder="Ej: Taller de pintura"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              labelClassName="text-gray-800"
              inputClassName="input-huahuacuna"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Fecha de Inicio"
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                error={errors.fechaInicio}
                labelClassName="text-gray-800"
                inputClassName="input-huahuacuna"
              />

              <Input
                label="Fecha de Fin"
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                error={errors.fechaFin}
                labelClassName="text-gray-800"
                inputClassName="input-huahuacuna"
              />
            </div>

            <Input
              label="Lugar"
              type="text"
              name="lugar"
              placeholder="Ej: Sede principal, salón 203"
              value={formData.lugar}
              onChange={handleChange}
              error={errors.lugar}
              labelClassName="text-gray-800"
              inputClassName="input-huahuacuna"
            />

            <Input
              label="URL de Imagen (opcional)"
              type="text"
              name="fotoUrl"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.fotoUrl}
              onChange={handleChange}
              error={errors.fotoUrl}
              labelClassName="text-gray-800"
              inputClassName="input-huahuacuna"
            />

            <Textarea
              label="Descripción"
              name="descripcion"
              placeholder="Descripción del evento..."
              value={formData.descripcion}
              onChange={handleChange}
              error={errors.descripcion}
              rows={6}
              labelClassName="text-gray-800"
              textareaClassName="input-huahuacuna"
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
                Registrar Evento
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}