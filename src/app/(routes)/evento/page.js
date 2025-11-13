"use client";

import Image from "next/image";
import Navbar from "../../components/common/Navbar";

const childrenData = [
  {
    id: 1,
    name: "Taller de pintura",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/children/santiago.jpg",
    dream: "En nuestra comunidad encontraras clases de pintura abiertas al publico",
  },
  {
    id: 2,
    name: "Curso de costura",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/children/jairo.jpg",
    dream: "Aprende a realizar tejidos de manera profesional con nuestro personal",
  },
  {
    id: 3,
    name: "Curso de musica",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/children/yanfri.jpg",
    dream: "Aprende a tocar cualquier tipo de instrumento profesional",
  },
  {
    id: 4,
    name: "Curso de ingles",
    age: "10/12/25",
    gender: "14/01/26",
    image: "/children/socorro.jpg",
    dream: "En nuestra comunidad encontraras clases de inglés abiertas al publico",
  },
];

export default function ApadrinamientoPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">

      {/* HERO SUPERIOR */}
      <section className="w-full mt-20">
                  <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
                      {/* Columna izquierda: gradiente + texto */}
                      <div className="col-span-2 flex items-center justify-center py-10 md:py-16 relative" style={{background: 'linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)'}}>
                          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase">
                              Encuentra en que participar
                          </h1>
                      </div>
      
                      {/* Columna derecha: imagen con color sólido */}
                      <div className="flex items-center justify-center py-6 relative" style={{backgroundColor: '#FA5E60'}}>
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

      {/* SECCIÓN DE TARJETAS */}
        <section className="px-6 md:px-12 py-12 md:py-16">
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {childrenData.map((child) => (
              <article
                key={child.id}
                className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
              >
                {/* Nombre */}
                <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                  {child.name}
                </h2>

                {/* Edad / Género */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center text-s">
                    <div className="font-semibold">Inicio</div>
                    <div className="mt-0.5 text-lg md:text-xs font-semi-bold">{child.age}</div>
                  </div>
                  <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center text-s">
                    <div className="font-semibold">Fin</div>
                    <div className="mt-0.5 text-lg md:text-xs font-semi-bold">{child.gender}</div>
                  </div>
                </div>

                {/* Imagen */}
                                <div className="overflow-hidden rounded-[24px] mb-3 h-[200px]">
                                  <Image
                                    src={child.image}
                                    alt={child.name}
                                    width={300}
                                    height={200}
                                    className="h-full w-full object-cover"
                                  />
                                </div>

                {/* Descripción + Botón */}
                <div className="flex justify-between items-center mt-1 gap-2 w-full">
                  <p className="text-xs md:text-sm leading-snug flex-1 line-clamp-3 pr-2">
                    {child.dream}
                  </p>
                  <button className="text-xs md:text-sm px-4 py-1 border border-[#251264] rounded-full hover:bg-[#251264] hover:text-white transition">
                    Ver más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

    </main>
  );
}