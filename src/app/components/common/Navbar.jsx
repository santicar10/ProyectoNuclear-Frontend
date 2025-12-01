// src/app/components/common/Navbar.jsx
"use client";

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
  const [showManagementMenu, setShowManagementMenu] = useState(false);
  const dropdownRef = useRef(null);
  const managementRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (managementRef.current && !managementRef.current.contains(event.target)) {
        setShowManagementMenu(false);
      }
    };

    if (showDropdown || showManagementMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showManagementMenu]);

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

  const handleViewProfile = () => {
    setShowDropdown(false);
    router.push("/perfil");
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
            className="rounded-full"
            priority
          />
          <span className="text-sm font-semibold">Huahuacuna</span>
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
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-3 text-[#1A125C]">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {userRole === "administrador" && (
                <div className="relative" ref={managementRef}>
                  <button
                    onClick={() => setShowManagementMenu(!showManagementMenu)}
                    className="text-sm px-4 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 transition font-medium flex items-center gap-2"
                  >
                    <span>Gestión</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showManagementMenu ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showManagementMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        href="/ninos"
                        onClick={() => setShowManagementMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Gestionar Niños
                      </Link>
                      
                      <Link
                        href="/evento/crear"
                        onClick={() => setShowManagementMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Gestionar Eventos
                      </Link>

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Gestionar Voluntarios
                        <span className="ml-auto text-xs text-gray-400">(Próximamente)</span>
                      </button>

                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Gestionar Donaciones
                        <span className="ml-auto text-xs text-gray-400">(Próximamente)</span>
                      </button>
                    </div>
                  )}
                </div>
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
                    
                    {userRole === "padrino" && (
                      <button
                        onClick={handleViewProfile}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Ver Perfil
                      </button>
                    )}
                    
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
        </div>
      </nav>
    </header>
  );
}