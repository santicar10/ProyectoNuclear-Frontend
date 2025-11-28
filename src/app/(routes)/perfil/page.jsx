'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Datos del padrino
  const padrinoData = {
    name: 'Santiago Cardona',
    email: 'santicar@gmail.com',
    phone: '322 319 87 44',
    location: 'barrio 22 - casa 22'
  };

  // Datos de los niños apadrinados
  const childrenData = [
    {
      id: 1,
      name: 'Santiago Cardona Sanchez',
      age: 10,
      gender: 'Femenino',
      image: '/path-to-image.jpg',
      dream: 'sueña con ser cantante y que la reconozcan a nivel mundial.'
    },
    {
      id: 2,
      name: 'Yanfri Asprilla',
      age: 9,
      gender: 'Femenino',
      image: '/path-to-image.jpg',
      dream: 'sueña con ser cantante y que la reconozcan a nivel mundial.'
    },
    {
      id: 3,
      name: 'Dayro Moreno',
      age: 8,
      gender: 'Femenino',
      image: '/path-to-image.jpg',
      dream: 'sueña con viajar por el mundo visitando pueblos.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header con gradiente y cactus */}
      <div className="relative bg-gradient-to-r from-[#FDB913] via-[#FF8C42] to-[#FF6B9D] h-40 md:h-48">

        {/* Título centrado */}
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold">
          Hola, Santiago Cardona
        </h1>
      </div>

      {/* Contenedor principal con avatar y tarjetas */}
      <div className="relative px-6 md:px-12 pb-12">
        {/* Avatar superpuesto */}
        {/* Avatar superpuesto */}
        <div className="flex justify-start -mt-20 md:-mt-24 mb-8 ml-8">
        <div className="bg-white rounded-full w-44 h-44 md:w-52 md:h-52 shadow-2xl flex items-center justify-center border-4 border-white">
            <div className="text-[#251264]">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"></path>
            </svg>
            </div>
        </div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start">
          {/* Tarjeta del Padrino */}
          <article className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-full max-w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col">
            <h2 className="text-center text-lg font-bold mb-6">PADRINO</h2>
            
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-base mb-1">{padrinoData.name}</h3>
              </div>
              
              <div className="text-center">
                <p className="text-sm">{padrinoData.email}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-semibold">{padrinoData.phone}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm">{padrinoData.location}</p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-[#251264] text-white text-sm px-6 py-2.5 rounded-full hover:bg-opacity-90 transition font-semibold"
              >
                Editar
              </button>
              <button className="flex-1 bg-white text-[#251264] text-sm px-6 py-2.5 rounded-full border-2 border-[#251264] hover:bg-[#251264] hover:text-white transition font-semibold">
                bitacora
              </button>
            </div>
          </article>

          {/* Tarjetas de los niños */}
          {childrenData.map((child) => (
            <article
              key={child.id}
              className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-full max-w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
            >
              {/* Nombre */}
              <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                {child.name}
              </h2>

              {/* Edad / Género */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center">
                  <div className="font-semibold text-xs">Age</div>
                  <div className="mt-0.5 text-2xl font-bold">{child.age}</div>
                </div>
                <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center">
                  <div className="font-semibold text-xs">Gender</div>
                  <div className="mt-0.5 text-xl">
                    {child.gender === 'Femenino' ? '♀' : '♂'}
                  </div>
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
              <div className="flex justify-between items-center mt-1.5 gap-2 w-full">
                <p className="text-xs md:text-sm leading-snug flex-1 line-clamp-3 pr-2">
                  {child.dream}
                </p>
                <button className="text-xs md:text-sm px-4 py-1.5 border-2 border-[#251264] rounded-full hover:bg-[#251264] hover:text-white transition whitespace-nowrap font-semibold">
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}