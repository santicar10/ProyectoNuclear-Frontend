"use client";

import Image from "next/image";
import Navbar from "@components/common/Navbar";

const childrenData = [
  {
    id: 1,
    name: "Santiago Cardona Sanchez",
    age: 8,
    gender: "♂",
    image: "/children/santiago.jpg",
    dream: "sueña con ser maestro para enseñar a los niños de su comunidad.",
  },
  {
    id: 2,
    name: "Jairo Puchaina",
    age: 4,
    gender: "♂",
    image: "/children/jairo.jpg",
    dream: "sueña con ser futbolista profesional para viajar por el mundo.",
  },
  {
    id: 3,
    name: "Yanfri Asprilla",
    age: 9,
    gender: "♀",
    image: "/children/yanfri.jpg",
    dream: "sueña con ser cantante y que la reconozcan a nivel mundial.",
  },
  {
    id: 4,
    name: "Socorro De las Nieves",
    age: 13,
    gender: "♀",
    image: "/children/socorro.jpg",
    dream: "sueña con tener una familia unida.",
  },
  // añade más objetos para las tarjetas de abajo…
];

export default function ApadrinamientoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Dejamos espacio por el navbar fijo */}
      <div className="pt-20">
        {/* HERO SUPERIOR */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Columna izquierda: gradiente con título */}
            <div className="col-span-2 bg-gradient-to-r from-[#FFB347] to-[#FF6B6B] text-white px-8 md:px-16 py-16 flex items-center">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
                Encuentra
                <br />
                a quien apadrinar
              </h1>
            </div>

            {/* Columna derecha: fondo rojo + ilustración */}
            <div className="bg-[#F85C5C] flex items-center justify-center py-6 relative">
              <Image
                src="/hero-kids.png" // pon aquí tu ilustración
                alt="Niños felices"
                width={260}
                height={220}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN DE TARJETAS */}
        <section className="px-6 md:px-12 py-12 md:py-16">
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {childrenData.map((child) => (
              <article
                key={child.id}
                className="bg-[#F9DC6B] rounded-[40px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
              >
                {/* Nombre */}
                <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                  {child.name}
                </h2>

                {/* Age / Gender */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="bg-[#FBE7A1] rounded-full px-4 py-2 text-center text-xs">
                    <div className="font-semibold">Age</div>
                    <div className="text-lg md:text-xl font-bold">
                      {child.age}
                    </div>
                  </div>
                  <div className="bg-[#FBE7A1] rounded-full px-4 py-2 text-center text-xs">
                    <div className="font-semibold">Gender</div>
                    <div className="text-lg md:text-xl">
                      {child.gender}
                    </div>
                  </div>
                </div>

                {/* Imagen */}
                <div className="overflow-hidden rounded-[24px] mb-4 h-40">
                  <Image
                    src={child.image}
                    alt={child.name}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Descripción */}
                <p className="text-xs md:text-sm leading-snug flex-1">
                  {child.dream}
                </p>

                {/* Botón */}
                <div className="mt-4 flex justify-end">
                  <button className="text-xs md:text-sm px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition">
                    Ver más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}