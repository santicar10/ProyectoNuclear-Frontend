"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChildCard from "@components/children/ChildCard";
import childrenService from "@/app/lib/services/children.service";
import authService from "@/app/lib/services/auth.service";

export default function ApadrinamientoPage() {
  const router = useRouter();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    loadChildren();
    loadUserRole();
  }, []);

  const loadChildren = async () => {
    setIsLoading(true);
    const result = await childrenService.getAll();
    
    if (result.success) {
      setChildren(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const loadUserRole = async () => {
    const userData = authService.getUserData();
    if (userData) {
      setUserRole(userData.rol);
    }
  };

  const handleDelete = (id) => {
    setChildren(children.filter(child => child.id !== id && child.id_nino !== id));
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="pt-20">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-600 text-2xl">Cargando niños...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <div className="pt-20">
          <div className="flex items-center justify-center py-20">
            <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadChildren}
                className="px-6 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-20">
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-2 bg-gradient-to-r from-[#FFB347] to-[#FF6B6B] text-white px-8 md:px-16 py-16 flex items-center">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
                Encuentra
                <br />
                a quien apadrinar
              </h1>
            </div>

            <div className="bg-[#F85C5C] flex items-center justify-center py-6 relative">
              <Image
                src="/hero-kids.png"
                alt="Niños felices"
                width={260}
                height={220}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-12 md:py-16">
          {children.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay niños disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {children.map((child) => (
                <ChildCard
                  key={child.id_nino || child.id}
                  child={child}
                  onDelete={handleDelete}
                  showActions={userRole === 'administrador'}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}