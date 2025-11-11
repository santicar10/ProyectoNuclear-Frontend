"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo + nombre */}
        <div className="flex items-center gap-2">
          {/* Coloca tu logo en /public/logo.png */}
          <Image
            src="/logo.png"
            alt="Huahuacuna"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
          <span className="text-sm font-semibold">Huahuacuna</span>
        </div>

        {/* Menú (desktop) */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><Link href="HeroSection.jsx">inicio</Link></li>
          <li><Link href="./Apadrinamiento.jsx">apadrinamiento</Link></li>
          <li><Link href="#">eventos</Link></li>
          <li><Link href="#">donaciones</Link></li>
          <li><Link href="#">sobre nosotros</Link></li>
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button className="text-sm px-4 py-1 rounded-full border border-black/70 hover:bg-black hover:text-white transition">
            Iniciar Sesión
          </button>
          <button
            className="text-sm px-4 py-1 rounded-full"
            style={{ background: "#F1C927" }}
          >
            Registrarse
          </button>
        </div>
      </nav>
    </header>
  );
}
