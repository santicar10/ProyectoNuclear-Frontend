"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@components/common/PageHeader";
import ChildCard from "@components/children/ChildCard";
import childrenService from "@/app/lib/services/children.service";
import { useAuth } from "@/app/hooks/useAuth";

export default function ApadrinamientoPage() {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading: authLoading } = useAuth();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadChildren();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const loadChildren = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await childrenService.getAll();
    
    if (result.success) {
      setChildren(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleViewMore = (childId) => {
    router.push(`/apadrinamiento/${childId}`);
  };

  if (authLoading || isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-gray-600 text-2xl">Cargando...</div>
      </main>
    );
  }

  // Vista para usuarios NO autenticados
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center">
        <PageHeader 
          title="encuentra a quien apadrinar" 
          imageSrc="/family.svg"
          imageAlt="Voluntariado"
        />

        <section className="w-full flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-yellow-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A125C] mb-4">
              Conviértete en Padrino
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Para ver los niños disponibles y conocer sus historias, necesitas iniciar sesión como padrino. 
              Regístrate ahora y descubre cómo puedes cambiar la vida de un niño.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/registrar")}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-[#1A125C] font-bold rounded-full transition shadow-lg hover:shadow-xl"
              >
                Registrarse como Padrino
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-3 border-2 border-[#1A125C] text-[#1A125C] font-bold rounded-full hover:bg-[#1A125C] hover:text-white transition"
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A125C] mb-2">Conoce a los Niños</h3>
                <p className="text-sm text-gray-600">Descubre sus historias, sueños y necesidades</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A125C] mb-2">Marca la Diferencia</h3>
                <p className="text-sm text-gray-600">Tu apadrinamiento cambia vidas</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A125C] mb-2">Proceso Seguro</h3>
                <p className="text-sm text-gray-600">Plataforma confiable y transparente</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Vista para usuarios autenticados con error
  if (error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center pt-20">
        <PageHeader 
          title="encuentra a quien apadrinar" 
          imageSrc="/family.svg"
          imageAlt="Voluntariado"
        />
        
        <div className="flex items-center justify-center py-20 px-6">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadChildren}
              className="px-6 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Vista para usuarios autenticados con datos
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <PageHeader 
        title="encuentra a quien apadrinar" 
        imageSrc="/family.svg"
        imageAlt="Voluntariado"
      />

      <section className="px-6 md:px-12 py-12 md:py-16">
        {children.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay niños disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {children.map((child) => (
              <ChildCard
                key={child.id_nino || child.id}
                child={child}
                showActions={false}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}