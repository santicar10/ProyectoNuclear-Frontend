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
      "En el curso de costura los participantes aprenden desde puntadas básicas hasta la confección de prendas útiles para el hogar.",
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
      "Ritmo, afinación y lectura musical básica, para descubrir y fortalecer talentos musicales.",
  },
  {
    id: 4,
    name: "Curso de inglés",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/ingles.jpg",
    dream: "Clases de inglés abiertas al público para mejorar el vocabulario.",
    lugar: "Aula 3",
    horario: "De lunes a viernes de 2:00 p.m. a 3:30 p.m.",
    detalles:
      "Curso de inglés práctico con juegos, conversación y actividades didácticas.",
  },
];

export default function EventoPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => setSelectedEvent(event);
  const handleClose = () => setSelectedEvent(null);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <Navbar />

      {/* HERO */}
      <section className="w-full mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
          <div
            className="col-span-2 flex items-center justify-center py-10 md:py-16"
            style={{ background: "linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)" }}
          >
            <h1 className="text-white text-3xl md:text-5xl font-extrabold text-center px-4">
              Encuentra en qué participar
            </h1>
          </div>

          <div className="flex items-center justify-center py-6 bg-[#FA5E60]">
            <div className="relative w-full h-full min-h-[150px]">
              <Image src="/family.svg" alt="Voluntariado" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* TARJETAS */}
      <section className="px-6 md:px-12 py-12 md:py-16 w-full">
        <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {childrenData.map((child) => (
            <article
              key={child.id}
              className="
                bg-[#F9DC6B] text-[#251264]
                w-[320px] md:w-[350px] h-[460px]
                px-6 pt-6 pb-5
                rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]
                shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                flex flex-col
                hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.2)]
                transition-all duration-300
              "
            >
              <h2 className="text-center font-semibold mb-4">{child.name}</h2>

              <div className="flex justify-center gap-4 mb-4">
                <div className="bg-[#FBE7A1] px-3 py-2 w-[100px] text-center rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]">
                  <div className="font-semibold">Inicio</div>
                  <div className="text-xs font-semibold">{child.age}</div>
                </div>
                <div className="bg-[#FBE7A1] px-3 py-2 w-[100px] text-center rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]">
                  <div className="font-semibold">Fin</div>
                  <div className="text-xs font-semibold">{child.gender}</div>
                </div>
              </div>

              <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] overflow-hidden mb-3 h-[200px]">
                <Image
                  src={child.image}
                  alt={child.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex justify-between items-center mt-1 gap-2">
                <p className="text-xs leading-snug line-clamp-3">{child.dream}</p>

                <button
                  onClick={() => handleOpen(child)}
                  className="border border-[#251264] px-4 py-1 text-xs rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] hover:bg-[#251264] hover:text-white transition"
                >
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div
            className="
            bg-white max-w-xl w-full p-8 shadow-2xl relative
            rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]
          "
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </button>

            <div className="overflow-hidden rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] h-52 mb-4">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#251264] mb-3">
              {selectedEvent.name}
            </h2>

            <div className="flex flex-wrap gap-3 text-xs mb-4">
              <span className="bg-[#FBE7A1] px-3 py-1 rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] font-semibold">
                Inicio: {selectedEvent.age}
              </span>
              <span className="bg-[#FBE7A1] px-3 py-1 rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] font-semibold">
                Fin: {selectedEvent.gender}
              </span>
              <span className="bg-[#F9DC6B] px-3 py-1 rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px]">
                Lugar: {selectedEvent.lugar}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Horario:</strong> {selectedEvent.horario}
            </p>

            <p className="text-sm text-gray-700 mb-4">{selectedEvent.detalles}</p>

            <p className="text-xs text-gray-500">
              Si deseas más información o inscribirte, visita nuestras secciones de contacto,
              voluntariado o donaciones.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
