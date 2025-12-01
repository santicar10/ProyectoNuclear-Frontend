"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/common/Navbar";

const childrenData = [
  {
    id: 1,
    name: "Taller de pintura",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/pintura.jpg",
    dream: "En nuestra comunidad encontrarás clases de pintura abiertas al público.",
    lugar: "Sede principal Huahuacuna",
    horario: "Sábados de 9:00 a.m. a 11:00 a.m.",
    detalles:
      "En este taller los niños exploran técnicas básicas de pintura, color y composición, desarrollando su creatividad y expresión artística.",
  },
  {
    id: 2,
    name: "Curso de costura",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/costura.jpg",
    dream: "Aprende a realizar tejidos de manera profesional con nuestro personal.",
    lugar: "Salón comunitario 2",
    horario: "Martes y jueves de 4:00 p.m. a 6:00 p.m.",
    detalles:
      "En el curso de costura los participantes aprenden desde puntadas básicas hasta la confección de prendas sencillas y útiles para el hogar.",
  },
  {
    id: 3,
    name: "Curso de música",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/musica.jpg",
    dream: "Aprende a tocar cualquier tipo de instrumento profesional.",
    lugar: "Sala de música",
    horario: "Lunes y miércoles de 3:00 p.m. a 5:00 p.m.",
    detalles:
      "Trabajamos ritmo, afinación y lectura musical básica, para que los niños descubran y fortalezcan sus talentos musicales.",
  },
  {
    id: 4,
    name: "Curso de inglés",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/ingles.jpg",
    dream: "En nuestra comunidad encontrarás clases de inglés abiertas al público.",
    lugar: "Aula 3",
    horario: "De lunes a viernes de 2:00 p.m. a 3:30 p.m.",
    detalles:
      "Curso de inglés con enfoque práctico, juegos y conversación para fortalecer el vocabulario y la confianza al comunicarse.",
  },
];

export default function EventoPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <Navbar />

      <section className="w-full mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
          <div
            className="col-span-2 flex items-center justify-center py-10 md:py-16 relative"
            style={{ background: "linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)" }}
          >
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase text-center px-4">
              Encuentra en qué participar
            </h1>
          </div>

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

      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {childrenData.map((child) => (
            <article
              key={child.id}
              className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
            >
              <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                {child.name}
              </h2>

              <div className="flex justify-center gap-4 mb-4">
                <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center text-s">
                  <div className="font-semibold">Inicio</div>
                  <div className="mt-0.5 text-lg md:text-xs font-semibold">
                    {child.age}
                  </div>
                </div>
                <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center text-s">
                  <div className="font-semibold">Fin</div>
                  <div className="mt-0.5 text-lg md:text-xs font-semibold">
                    {child.gender}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[24px] mb-3 h-[200px]">
                <Image
                  src={child.image}
                  alt={child.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex justify-between items-center mt-1 gap-2 w-full">
                <p className="text-xs md:text-sm leading-snug flex-1 line-clamp-3 pr-2">
                  {child.dream}
                </p>
                <button
                  onClick={() => handleOpen(child)}
                  className="text-xs md:text-sm px-4 py-1 border border-[#251264] rounded-full hover:bg-[#251264] hover:text-white transition"
                >
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-sm"
            >
              ✕
            </button>

            <div className="overflow-hidden rounded-2xl h-52 mb-4">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#251264] mb-2">
              {selectedEvent.name}
            </h2>

            <div className="flex flex-wrap gap-3 text-xs md:text-sm mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FBE7A1] font-semibold">
                Inicio: {selectedEvent.age}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FBE7A1] font-semibold">
                Fin: {selectedEvent.gender}
              </span>
              {selectedEvent.lugar && (
                <span className="px-3 py-1 rounded-full bg-[#F9DC6B]">
                  Lugar: {selectedEvent.lugar}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Horario: {selectedEvent.horario}
            </p>

            <p className="text-sm text-gray-700 mb-2">
              {selectedEvent.detalles}
            </p>

            <p className="text-xs text-gray-500">
              Si deseas más información o inscribirte en este evento, puedes hacerlo a través
              de nuestras secciones de contacto, voluntariado o donaciones.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
