"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@components/common/inputs/Input";
import Textarea from "@components/common/Textarea";
import Select from "@components/common/Select";
import Button from "@components/common/Button";
import childrenService from "@/app/lib/services/children.service";
import { validateChildForm, hasErrors } from "@/app/lib/validations/childValidations";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function CreateChildPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    genero: "",
    descripcion: "",
    fotoUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateChildForm(formData);
    
    if (hasErrors(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await childrenService.create(formData);

      if (result.success) {
        alert(result.message);
        router.push('/ninos');
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Error inesperado. Por favor intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/ninos');
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

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Registrar Nuevo Niño</h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-[#1A125C]">
            <Input
              label="Nombre Completo"
              type="text"
              name="nombre"
              placeholder="Ej: Santiago Cardona Sanchez"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              labelClassName="text-gray-800"
              inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Fecha de Nacimiento"
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                error={errors.fechaNacimiento}
                labelClassName="text-gray-800"
                inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
              />

              <Select
                label="Género"
                name="genero"
                options={genderOptions}
                value={formData.genero}
                onChange={handleChange}
                error={errors.genero}
                labelClassName="text-gray-800"
                selectClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
              />
            </div>

            <Input
              label="URL de Foto (opcional)"
              type="text"
              name="fotoUrl"
              placeholder="https://ejemplo.com/foto.jpg"
              value={formData.fotoUrl}
              onChange={handleChange}
              error={errors.fotoUrl}
              labelClassName="text-gray-800"
              inputClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
            />

            <Textarea
              label="Descripción"
              name="descripcion"
              placeholder="Describe los sueños, aspiraciones y contexto del niño..."
              value={formData.descripcion}
              onChange={handleChange}
              error={errors.descripcion}
              rows={6}
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
                Registrar Niño
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}