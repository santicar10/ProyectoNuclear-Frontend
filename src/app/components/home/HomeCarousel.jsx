"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    title: "Cambia una vida con un solo gesto",
    subtitle: "Apadrina un niño",
    description:
      "Con tu apoyo, niños y niñas de comunidades vulnerables reciben acompañamiento escolar, alimentación y afecto.",
    image: "/carrusel1.png",
  },
  {
    id: 2,
    title: "Acompañamos sus sueños",
    subtitle: "Educación y valores",
    description:
      "Promovemos el crecimiento integral desde la fe, la cultura y la construcción de proyectos de vida.",
    image: "/carrusel2.png",
  },
  {
    id: 3,
    title: "Tu ayuda llega donde más se necesita",
    subtitle: "Impacto real",
    description:
      "Más de 250 niños y 850 personas beneficiadas indirectamente gracias a la Fundación Huahuacuna.",
    image: "/carrusel3.png",
  },
];

export default function HomeCarousel() {
  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  const goToSlide = (nextIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setIsFading(false);
    }, 300); // duración del fade-out
  };

  // cambio automático cada 8s
  useEffect(() => {
    const id = setInterval(() => {
      goToSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);

    return () => clearInterval(id);
  }, []);

  const activeSlide = slides[current];

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Texto */}
        <div
          className={`space-y-4 transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[#6b6b6b]">
            Fundación Huahuacuna
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-[#251264]">
            {activeSlide.title}
          </h1>
          <h2 className="text-lg font-semibold text-[#4b3bb5]">
            {activeSlide.subtitle}
          </h2>
          <p className="text-sm lg:text-base text-[#444] leading-7">
            {activeSlide.description}
          </p>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => router.push("/apadrinamiento")}
              className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] px-5 py-2.5 rounded-full bg-[#251264] text-white text-sm font-semibold hover:bg-[#3a2f96] transition"
            >
              Conoce cómo apadrinar
            </button>
            <button
              onClick={() => router.push("/sobre-nosotros")}
              className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] px-5 py-2.5 rounded-full border border-[#251264] text-[#251264] text-sm font-semibold hover:bg-[#251264] hover:text-white transition"
            >
              Ver nuestra historia
            </button>
          </div>

          {/* Puntitos del carrusel */}
          <div className="flex items-center gap-2 pt-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? "w-8 bg-[#251264]" : "w-3 bg-[#d0c9f3]"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Imagen */}
        <div
          className={`relative w-full h-64 md:h-80 lg:h-96 transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 rounded-[32px] bg-[#FBE27A] translate-x-3 translate-y-3" />
          <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-xl border border-[#e5e5e5] bg-white">
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
