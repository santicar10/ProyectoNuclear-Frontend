"use client";

import { useState } from "react";
import HeroSection from "@components/HeroSection";
import HomeCarousel from "./components/home/HomeCarousel";

export default function Home() {
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);

  const missionText = `La Fundación Huahuacuna es una institución social que apoya a la niñez en estado de vulnerabilidad, por medio de apadrinamientos y ayudas ocasionales con el fin de mejorar su calidad de vida, teniendo en cuenta que esto se obtiene a través de procesos educativos que incluyan la familia; lo anterior lo logramos gracias a la colaboración económica y de voluntariado de personas y entidades nacionales y extranjeras.`;

  const visionText = `La Fundación Huahuacuna será una institución que gestione permanentemente recursos que permitan aumentar de manera progresiva el número de niños beneficiados y programas que respondan a necesidades concretas de la población que atiende; para esto contará con un grupo interdisciplinario de personas que apoyen nuestra labor con el fin de lograr familias cohesionadas, pacíficas y autogestionadoras.

Al finalizar cada niño el proceso de apadrinamiento, las familias se caracterizarán por tener valores cristianos, sentido de pertenencia hacia ellos mismos, su familia, la fundación y el país. Los niños serán reconocidos por ser personas críticas y propositivas al mejoramiento de la sociedad, ciudadanos responsables y preocupados por su bienestar y el de sus familias.`;

  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero principal */}
      <HeroSection />

      {/* Carrusel */}
      <HomeCarousel />

      {/* MISIÓN */}
      <section className="py-20 text-center bg-white text-gray-700 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Nuestra misión</h2>

          <p className="text-lg leading-relaxed whitespace-pre-line">
            {showMission ? missionText : missionText.substring(0, 180) + "..."}
          </p>

          <button
            onClick={() => setShowMission(!showMission)}
            className="mt-4 text-[#251264] font-semibold underline underline-offset-4 hover:text-[#3a2f96] transition"
          >
            {showMission ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </section>

      {/* VISIÓN */}
      <section className="py-20 text-center bg-white text-gray-700 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Nuestra visión</h2>

          <p className="text-lg leading-relaxed whitespace-pre-line">
            {showVision ? visionText : visionText.substring(0, 180) + "..."}
          </p>

          <button
            onClick={() => setShowVision(!showVision)}
            className="mt-4 text-[#251264] font-semibold underline underline-offset-4 hover:text-[#3a2f96] transition"
          >
            {showVision ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </section>

      {/* Footer */}
            {/* Footer */}
      <footer className="bg-[#1A125C] text-white py-12 text-sm">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {/* Columna 1: Mapa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.055780425779!2d-75.67731072518246!3d4.533886543669626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3887cf5bb7dd07%3A0x7d57792097f2de5c!2sPentecost%C3%A9s!5e0!3m2!1ses-419!2sco!4v1738530193135!5m2!1ses-419!2sco"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border border-white/20 shadow-md"
            />
          </div>

          {/* Columna 2: Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.facebook.com/FundacionHuahuacuna"
                  target="_blank"
                  className="hover:text-yellow-300 transition flex items-center gap-2"
                >
                  <span>📘</span> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/huahuacuna?igsh=b3AyNXlrZDl1dGwy"
                  target="_blank"
                  className="hover:text-yellow-300 transition flex items-center gap-2"
                >
                  <span>📸</span> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://vm.tiktok.com/ZSH7KvNDdX7NY-SDTsk/"
                  target="_blank"
                  className="hover:text-yellow-300 transition flex items-center gap-2"
                >
                  <span>🎵</span> TikTok
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fundación Huahuacuna</h3>
            <p className="leading-relaxed text-white/80">
              Barrio Uribe Carrera 13 27-34 
              <br />
              Armenia – Quindío, Colombia  
              <br />
              <br />
              © {new Date().getFullYear()} Huahuacuna.  
              <br />
              Todos los derechos reservados.
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}
