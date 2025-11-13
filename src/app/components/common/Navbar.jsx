"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    checkAuth();
  }, [pathname]);

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
      router.push("/");
    }
  };

  const handleCreateChild = () => {
    router.push("/ninos/crear");
  };

  // Rutas donde NO se muestra el navbar
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
            <>
              {userRole === "administrador" && (
                <button
                  onClick={handleCreateChild}
                  className="text-sm px-4 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 transition font-medium"
                >
                  + Nuevo Niño
                </button>
              )}
              <span className="hidden md:inline text-sm text-gray-600">
                Hola, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1 rounded-full border border-black/70 hover:bg-black hover:text-white transition"
              >
                Cerrar Sesión
              </button>
            </>
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