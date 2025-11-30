"use client";

import { useState } from "react";
import VoluntariadoForm from "@/app/components/common/forms/VoluntariadoForm";
import Image from "next/image";

export default function VoluntariadoPage() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      {/* HERO */}
      <section className="w-full mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
          {/* Columna izquierda */}
          <div
            className="col-span-2 flex items-center justify-center py-10 md:py-16 relative"
            style={{ background: "linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)" }}
          >
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase text-center md:text-left px-4">
              ¿QUIERES SER VOLUNTARIO?
            </h1>
          </div>

          {/* Columna derecha */}
          <div
            className="flex items-center justify-center py-6 relative"
            style={{ backgroundColor: "#FA5E60" }}
          >
            <div className="relative w-full h-full min-h-[150px]">
              <Image
                src="/family.svg"
                alt="Voluntariado"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <div className="w-full max-w-4xl px-6 py-10">
        <VoluntariadoForm />

        {/* BOTÓN PARA MOSTRAR INFO */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className="px-8 py-3 rounded-full bg-[#251264] text-white font-semibold text-sm hover:bg-[#3a2f96] transition shadow-md"
          >
            {showInfo ? "Ocultar Información de Contacto" : "Contáctanos"}
          </button>
        </div>

        {/* INFO DE CONTACTO (ABAJO DEL BOTÓN ENVIAR) */}
        {showInfo && (
          <div className="mt-8 bg-white border border-[#FBE27A] rounded-3xl p-7 shadow-sm">
            <h2 className="text-lg font-bold text-[#251264] mb-3">
              Información para ser voluntario
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Si deseas unirte como voluntario, aquí tienes todos los medios para comunicarte con
              nosotros y recibir orientación.
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-[#251264] mb-1">Requisitos básicos</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ser mayor de 18 años.</li>
                  <li>Asistir a una charla de inducción.</li>
                  <li>Disponibilidad mínima de 4 horas al mes.</li>
                  <li>Respeto por la diversidad y el entorno comunitario.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#251264] mb-1">Canales de contacto</h3>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">Correo:</span>{" "}
                    <a
                      href="mailto:voluntariado@huahuacuna.com"
                      className="text-[#251264] underline underline-offset-2"
                    >
                      voluntariado@huahuacuna.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Teléfono:</span> +57 000 000 0000
                  </li>
                  <li>
                    <span className="font-semibold">WhatsApp:</span> +57 300 000 0000
                  </li>
                  <li>
                    <span className="font-semibold">Dirección:</span> Casa de li
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
