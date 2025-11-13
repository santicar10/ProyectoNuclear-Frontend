"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <select
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
        >
          <option value="">Selecciona tu banco</option>
          <option value="Bancolombia">Bancolombia</option>
          <option value="Davivienda">Davivienda</option>
          <option value="BBVA">BBVA</option>
          <option value="Nequi">Nequi</option>
          <option value="DaviPlata">DaviPlata</option>
        </select>
      </div>

      {/* NIT */}
      <div>
        <label className="block mb-2">NIT</label>
        <input
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          placeholder="Digite su NIT (opcional)"
          className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
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
          className="w-full rounded-full px-4 py-3 bg-yellow-200 focus:outline-none"
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

      {/* Botón enviar */}
      <div className="flex justify-between items-center mt-4">
        <button 
            type="button"
            className="bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 rounded-full transition"
            onClick={() => router.push("/dotacion")}
        >
          dotaciones
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-normal px-8 py-2 rounded-full transition"
        >
          {loading ? "Redirigiendo..." : "Ir al banco"}
        </button>
      </div>
    </form>
  );
}