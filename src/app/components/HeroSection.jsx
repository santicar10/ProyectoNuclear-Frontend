"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[88vh] flex items-center pt-24" 
      style={{
        background: "linear-gradient(90deg, #F1C927 0%, #FA5E60 79%)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* === Texto principal === */}
          <div className="max-w-2xl text-white">
            <h1
              className="leading-[0.95] mb-4 font-extrabold"
              style={{
                color: "#1A125C",
                fontSize: "clamp(48px, 9vw, 96px)",
              }}
            >
              Huahuacuna
            </h1>

            <h2
              className="font-semibold mb-6"
              style={{
                color: "white",
                fontSize: "clamp(22px, 3.2vw, 42px)",
              }}
            >
              cambia una vida con un solo gesto
            </h2>

            <p
              className="text-white/95 leading-7 mb-8 max-w-xl"
              style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
            >
              Trabajamos por el bienestar y la educación de niños y niñas en
              situación de vulnerabilidad en el Quindío. Con tu apoyo, podemos
              seguir transformando vidas y sembrando esperanza.
            </p>

            {/* === Botones === */}
            <div className="flex gap-4">
              <button
                className="rounded-full px-6 py-2 font-medium shadow-sm hover:scale-[1.03] transition-transform"
                style={{ background: "#F1C927", color: "#000" }}
              >
                Donar
              </button>

              <button
                className="rounded-full px-6 py-2 font-medium border transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: "#000", color: "#000" }}
              >
                Apadrinamiento
              </button>
            </div>
          </div>

          {/* === Imagen principal === */}
          <div className="mt-10 md:mt-0">
            <Image
              src="/hero-img.png"  
              alt="Niña y niño sonrientes"
              width={420}
              height={520}
              priority
              className="w-[260px] md:w-[380px] lg:w-[420px] h-auto select-none pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
