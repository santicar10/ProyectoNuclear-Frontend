"use client";
import { useState } from "react";

export default function DotacionForm() {
  const [dotacion, setDotacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tipo: 'dotacion',
          dotacion, 
          descripcion 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Correo enviado correctamente");
        setDotacion("");
        setDescripcion("");
      } else {
        alert("❌ Error al enviar el correo: " + data.error);
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-sm font-normal text-[#251264]"
    >
      {/* Dotación */}
      <div>
        <label className="block mb-2">Proyectos</label>
        <select
          value={dotacion}
          onChange={(e) => setDotacion(e.target.value)}
          className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
          required
        >
          <option value="">Elija que dotación nos puedes dar</option>
          <option value="Medicamentos">Medicamentos</option>
          <option value="Ropa">Ropa</option>
          <option value="Comida">Comida</option>
        </select>
      </div>

      {/* Descripción */}
      <div>
        <label className="block mb-2">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe en qué nos puedes donar"
          className="w-full h-48 rounded-3xl p-4 bg-yellow-200 focus:outline-none"
          required
        />
      </div>

      {/* Botón enviar */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}