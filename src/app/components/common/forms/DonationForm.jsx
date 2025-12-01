"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BANK_OPTIONS = [
  { value: "Bancolombia", label: "Bancolombia" },
  { value: "Davivienda", label: "Davivienda" },
  { value: "BBVA", label: "BBVA" },
  { value: "Nequi", label: "Nequi" },
  { value: "DaviPlata", label: "DaviPlata" },
];

function BancoSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = BANK_OPTIONS.find((b) => b.value === value) || null;

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
          {selected ? selected.label : "Selecciona tu banco"}
        </span>
        <span className="ml-2 text-[#251264]/70 text-xs">▼</span>
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
              Selecciona tu banco
            </li>
            {BANK_OPTIONS.map((opt) => (
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

export default function DonationForm() {
  const router = useRouter();
  const [banco, setBanco] = useState("");
  const [nit, setNit] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGoToBank(e) {
    e.preventDefault();
    if (!banco || !email)
      return setMsg({
        type: "error",
        text: "Complete los campos obligatorios",
      });

    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donaciones/create_preference`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ banco, nit, email }),
        }
      );

      if (!res.ok) throw new Error("Error creando preferencia");
      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió URL de pago");
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleGoToBank}
      className="flex flex-col gap-6 text-sm font-normal text-[#251264]"
    >
      {/* Banco */}
      <div>
        <label className="block mb-2">Banco</label>
        <BancoSelect value={banco} onChange={setBanco} />
      </div>

      {/* NIT */}
      <div>
        <label className="block mb-2">NIT</label>
        <input
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          placeholder="Digite su NIT (opcional)"
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full px-4 py-3 bg-yellow-200 focus:outline-none border border-yellow-300"
        />
      </div>

      {/* Correo electrónico */}
      <div>
        <label className="block mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full px-4 py-3 bg-yellow-200 focus:outline-none border border-yellow-300"
        />
      </div>

      {/* Mensaje de estado */}
      {msg && (
        <p
          className={`${
            msg.type === "error" ? "text-red-600" : "text-green-700"
          } text-center`}
        >
          {msg.text}
        </p>
      )}

      {/* Botones */}
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 transition"
          onClick={() => router.push("/dotacion")}
        >
          Dotaciones
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirigiendo..." : "Ir al banco"}
        </button>
      </div>
    </form>
  );
}
