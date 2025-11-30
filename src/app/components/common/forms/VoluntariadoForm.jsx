"use client";
import { useState } from "react";

export default function VoluntariadoForm() {
  const [proyecto, setProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "voluntariado",
          proyecto,
          descripcion,
          nombre,
          correo,
          telefono,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Correo enviado correctamente");
        setProyecto("");
        setDescripcion("");
        setNombre("");
        setCorreo("");
        setTelefono("");
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
      <div>
        <label className="block mb-2">Proyectos</label>
        <select
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
          required
        >
          <option value="">Elija el proyecto a participar</option>
          <option value="Rescate animal">Rescate animal</option>
          <option value="Cuidado temporal">Cuidado temporal</option>
          <option value="Eventos solidarios">Eventos solidarios</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe en qué crees que nos podrías ayudar"
          className="w-full h-48 rounded-3xl p-4 bg-yellow-200 focus:outline-none"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Ana María López"
            className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ej: ana@example.com"
            className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Teléfono / WhatsApp</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 300 000 0000"
            className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
            required
          />
        </div>
      </div>

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
