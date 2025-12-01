"use client";
<<<<<<< HEAD

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import authService from "@/app/lib/services/auth.service";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const checkAuth = () => {
    const userData = authService.getUserData();
    if (userData) {
      setIsAuthenticated(true);
      setUserRole(userData.rol);
      setUserName(userData.nombre || "Usuario");
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName("");
    }
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName("");
      setShowDropdown(false);
      router.push("/");
    }
  };

  const handleCreateChild = () => {
    router.push("/ninos/crear");
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const hideNavbarRoutes = ["/login", "/registrar"];
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Image
            src="/huahuacuna_logo.png"
            alt="Huahuacuna"
            width={40}
            height={40}
=======
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
>>>>>>> samu
            className="rounded-full"
            priority
          />
          <span className="text-sm font-semibold">Huahuacuna</span>
<<<<<<< HEAD
        </Link>

        {/* Menú (desktop) */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A125C]">
          <li>
            <Link href="/" className="hover:text-yellow-500 transition">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/apadrinamiento" className="hover:text-yellow-500 transition">
              Apadrinamiento
            </Link>
          </li>
          <li>
            <Link href="/voluntariado" className="hover:text-yellow-500 transition">
              Voluntariado
            </Link>
          </li>
          <li>
            <Link href="/evento" className="hover:text-yellow-500 transition">
              Eventos
            </Link>
          </li>
          <li>
            <Link href="/donaciones" className="hover:text-yellow-500 transition">
              Donaciones
            </Link>
          </li>
          <li>
            <Link href="/sobre-nosotros" className="hover:text-yellow-500 transition">
              Sobre Nosotros
            </Link>
          </li>
          {userRole === "administrador" && (
            <li>
              <Link href="/ninos" className="hover:text-yellow-500 transition">
                Gestión niños
              </Link>
            </li>
          )}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-3 text-[#1A125C]">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {userRole === "administrador" && (
                <button
                  onClick={handleCreateChild}
                  className="text-sm px-4 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 transition font-medium"
                >
                  Crear Niño
                </button>
              )}
              
              {/* Menú de perfil con dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-semibold flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  {getInitials(userName)}
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-4 py-1 rounded-full border border-black/70 hover:bg-black hover:text-white transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registrar"
                className="text-sm px-4 py-1 rounded-full bg-[#F1C927] hover:bg-[#e0b916] transition"
              >
                Registrarse
              </Link>
            </>
          )}
=======
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
>>>>>>> samu
        </div>
      </nav>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> samu
