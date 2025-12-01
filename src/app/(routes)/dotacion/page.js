"use client";

import { useState, useRef } from "react";
import DotacionForm from "@/app/components/common/forms/DotacionForm";
import Image from "next/image";

export default function DotacionPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const formSectionRef = useRef(null);
  const infoSectionRef = useRef(null);

  const handleToggleInfo = () => {
    setShowInfo((prev) => {
      const newState = !prev;

      setTimeout(() => {
        if (newState && infoSectionRef.current) {
          infoSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else if (!newState && formSectionRef.current) {
          formSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 80);

      return newState;
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              ¿QUIERES DONAR?
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
                alt="Dotaciones"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO + CONTACTO + INFO */}
      <div className="w-full max-w-4xl px-6 py-10" ref={formSectionRef}>
        <DotacionForm />


        {/* BOTÓN CONTACTO / INFO */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleToggleInfo}
            className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] px-8 py-3 rounded-full bg-[#251264] text-white font-semibold text-sm hover:bg-[#3a2f96] transition shadow-md"
          >
            {showInfo ? "Ocultar información de recolección" : "Información para coordinar donación"}
          </button>
        </div>

        {/* PANEL INFORMATIVO */}
        {showInfo && (
          <div
            ref={infoSectionRef}
            className="mt-8 bg-white border border-[#FBE27A] rounded-3xl p-7 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#251264] mb-3">
              Información sobre donaciones y recolección
            </h2>

            <p className="text-sm text-gray-700 mb-4">
              Si deseas donar alimentos, ropa, útiles escolares, juguetes o artículos en buen estado,
              aquí encontrarás los requisitos y los medios de contacto. También ofrecemos servicio de recolección según disponibilidad.
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-[#251264] mb-1">Requisitos</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Los artículos deben estar en buen estado.</li>
                  <li>Las donaciones alimentarias deben ser no perecederas.</li>
                  <li>Para recolecciones a domicilio, coordinar con 24 horas de anticipación.</li>
                  <li>Indicar tipo y cantidad de elementos a donar.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#251264] mb-1">Canales de contacto</h3>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">Correo:</span>{" "}
                    <a
                      href="mailto:fundacionhuahuacuna@gmail.com"
                      className="text-[#251264] underline underline-offset-2"
                    >
                      fundacionhuahuacuna@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Teléfono:</span> +57 312 257 01 41
                  </li>
                  <li>
                    <span className="font-semibold">WhatsApp:</span> +57 312 257 01 41
                  </li>
                  <li>
                    <span className="font-semibold">Dirección:</span>{" "}
                    Barrio Uribe Carrera 13 27-34
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              También puedes escribirnos si deseas que nuestro equipo pase a recoger tu donación,
              sujeto a disponibilidad de transporte.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
