"use client";
import { useState } from "react";

const DOTACION_OPTIONS = [
  { value: "Medicamentos", label: "Medicamentos" },
  { value: "Ropa", label: "Ropa" },
  { value: "Comida", label: "Comida" },
];

function DotacionSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selectedOption =
    DOTACION_OPTIONS.find((opt) => opt.value === value) || null;

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full px-4 py-3 text-left
          rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]
          bg-yellow-200
          border border-yellow-300
          focus:outline-none focus:ring-2 focus:ring-[#251264]/40
          flex items-center justify-between
          text-sm text-[#251264]
        "
      >
        <span>
          {selectedOption
            ? selectedOption.label
            : "Elija qué dotación nos puedes dar"}
        </span>
        <span className="ml-2 text-[#251264]/70 text-xs">
          ▼
        </span>
      </button>

      {open && (
        <div
          className="
            absolute mt-1 w-full z-20
            bg-white border border-yellow-300
            rounded-2xl shadow-lg overflow-hidden
          "
        >
          <ul className="max-h-60 overflow-auto text-sm text-[#251264]">
            <li
              className="px-4 py-2 bg-yellow-50 hover:bg-yellow-100 cursor-pointer"
              onClick={() => handleSelect({ value: "", label: "" })}
            >
              Elija qué dotación nos puedes dar
            </li>
            {DOTACION_OPTIONS.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`
                  px-4 py-2 cursor-pointer
                  hover:bg-yellow-100
                  ${value === opt.value ? "bg-yellow-50 font-semibold" : ""}
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function DotacionForm() {
  const [dotacion, setDotacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dotacion) {
      alert("Por favor selecciona una dotación.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "dotacion",
          dotacion,
          descripcion,
          nombre,
          correo,
          telefono,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Correo enviado correctamente");
        setDotacion("");
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
        <DotacionSelect
          value={dotacion}
          onChange={(val) => setDotacion(val)}
        />
      </div>

      <div>
        <label className="block mb-2">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe en qué nos puedes donar"
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full h-48 p-4 bg-yellow-200 focus:outline-none border border-yellow-300"
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
            placeholder="Ej: Jan Carlos"
            className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full px-4 py-3 bg-yellow-200 focus:outline-none border border-yellow-300"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ej: carlos@gmail.com"
            className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full px-4 py-3 bg-yellow-200 focus:outline-none border border-yellow-300"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Teléfono / WhatsApp</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 312 257 01 41"
            className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full px-4 py-3 bg-yellow-200 focus:outline-none border border-yellow-300"
            required
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}
