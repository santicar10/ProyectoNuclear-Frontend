<<<<<<< HEAD
import HeroSection from "@components/HeroSection";
import HomeCarousel from "./components/home/HomeCarousel";
=======
import HeroSection from "./components/HeroSection";

>>>>>>> samu

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
<<<<<<< HEAD

      {/* Hero principal */}
      <HeroSection />

      {/* Carrusel agregado debajo del Hero */}
      <HomeCarousel />

      {/* Sección misión */}
=======
      {/* Sección principal */}
      <HeroSection />


>>>>>>> samu
      <section className="py-20 text-center bg-white text-gray-700">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Nuestra misión</h2>
          <p className="text-lg leading-relaxed">
            En Huahuacuna trabajamos por el bienestar, la educación y la
            protección de la niñez. Creemos que cada pequeño gesto puede tener
            un impacto enorme en la vida de un niño o niña.
          </p>
        </div>
      </section>

<<<<<<< HEAD
            {/* Sección vision */}
      <section className="py-20 text-center bg-white text-gray-700">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Nuestra vision</h2>
          <p className="text-lg leading-relaxed">
            Ser una fundación referente en el Quindío por la protección, 
            educación y desarrollo integral de niños y niñas, construyendo oportunidades que transformen
            vidas y fortalezcan comunidades.
          </p>
        </div>
      </section>

=======
>>>>>>> samu
      {/* Footer */}
      <footer className="bg-[#1A125C] text-white py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Huahuacuna. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
