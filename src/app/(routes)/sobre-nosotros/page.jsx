"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/common/Navbar";

export default function SobreNosotrosPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        {/* ENCABEZADO */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-[#251264] hover:text-[#4a3ac4] transition-colors"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#251264]/10 border border-[#251264]/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 stroke-[#251264]"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            Volver
          </button>

          <span className="text-xs uppercase tracking-[0.2em] text-[#251264]/70">
            Fundación Huahuacuna
          </span>
        </div>

        {/* MARCO EXTERIOR */}
        <div className="rounded-[45px] border-[3px] border-[#251264]/15 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-3">
          {/* TARJETA PRINCIPAL */}
          <div className="bg-white border border-[#e5e5e5] rounded-[40px] shadow-xl p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* COLUMNA IZQUIERDA */}
            <div className="col-span-2 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#6b6b6b]">
                  Quiénes somos
                </p>
                <h1 className="text-3xl lg:text-4xl font-black text-[#251264]">
                  Sobre nosotros
                </h1>
              </div>

              {/* INDICADORES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-[#FBE27A] border border-[#e0c85c] p-5">
                  <p className="text-xs uppercase text-[#6b5d10]">
                    Niños y jóvenes
                  </p>
                  <p className="text-3xl font-bold text-[#251264]">250</p>
                  <p className="text-sm text-[#4b4b4b]">
                    reciben acompañamiento y apoyo integral cada año.
                  </p>
                </div>

                <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-[#FBE27A] border border-[#e0c85c] p-5">
                  <p className="text-xs uppercase text-[#6b5d10]">
                    Impacto total
                  </p>
                  <p className="text-3xl font-bold text-[#251264]">850</p>
                  <p className="text-sm text-[#4b4b4b]">
                    personas beneficiadas de forma indirecta.
                  </p>
                </div>

                <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-[#FBE27A] border border-[#e0c85c] p-5">
                  <p className="text-xs uppercase text-[#6b5d10]">Desde</p>
                  <p className="text-3xl font-bold text-[#251264]">2003</p>
                  <p className="text-sm text-[#4b4b4b]">
                    raíces sólidas en el Quindío.
                  </p>
                </div>
              </div>

              {/* TEXTO */}
              <div className="text-sm text-[#1A1A1A] space-y-4 leading-7">
                <p>
                  Gracias a la Fundación Huahuacuna, 250 niños y adolescentes de
                  sectores marginados reciben alimentación, refuerzo escolar y
                  acompañamiento emocional.
                </p>
                <p>
                  <strong className="text-[#251264]">Huahuacuna</strong>{" "}
                  significa
                  <strong className="text-[#251264]"> “sólo los niños”.</strong>
                </p>
                <p>
                  Iniciamos actividades en junio del 2003 como Sonrisa
                  Italiana, y desde 2004 contamos con vida jurídica.
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA IMÁGENES */}
            <div className="space-y-5">
              <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-gradient-to-br from-[#FBE27A] via-[#f7d23f] to-[#f0ad24] p-5 shadow-lg border border-white/20">
                <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full h-48 relative overflow-hidden shadow-md border border-white/30">
                  <Image
                    src="/foto1.jpg"
                    alt="Fundación Huahuacuna"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[#251264] font-semibold">
                  Comunidad en acción
                </p>
                <p className="text-sm text-[#3a340d]">
                  Acompañamos cada proceso con calidez humana y
                  profesionalismo.
                </p>
              </div>

              <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] bg-gradient-to-br from-[#FBE27A] via-[#f7d23f] to-[#f0ad24] p-5 shadow-lg border border-white/20">
                <div className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-full h-48 relative overflow-hidden shadow-md border border-white/20">
                  <Image
                    src="/foto2.jpg"
                    alt="Voluntariado"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[#251264] font-semibold">
                  Voluntariado vivo
                </p>
                <p className="text-sm text-[#3a340d]">
                  Profesionales y estudiantes donan tiempo y corazón para
                  transformar vidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
