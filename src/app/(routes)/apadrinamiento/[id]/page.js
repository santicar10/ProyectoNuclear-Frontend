"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@components/common/Button";
import { ArrowBackIcon } from "@components/common/icons";
import childrenService from "@/app/lib/services/children.service";
import authService from "@/app/lib/services/auth.service";

export default function ChildDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    loadChildDetail();
  }, [params.id]);

  const checkAuth = () => {
    const userData = authService.getUserData();
    setIsAuthenticated(!!userData);
  };

  const loadChildDetail = async () => {
    setIsLoading(true);
    const result = await childrenService.getById(params.id);
    
    if (result.success) {
      setChild(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    router.push('/apadrinamiento');
  };

  const handleSponsor = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para apadrinar");
      router.push("/login");
      return;
    }
    alert(`Iniciando proceso de apadrinamiento para ${child.nombre}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-gray-600 text-2xl">Cargando...</div>
      </div>
    );
  }

  if (error || !child) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <p className="text-red-600 mb-4">{error || "Niño no encontrado"}</p>
          <Button onClick={handleBack} variant="warning" className="rounded-full">
            Volver al catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowBackIcon />
          <span className="font-medium group-hover:underline">Volver al catálogo</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-8 md:p-12 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A125C] mb-3">
                  Descripción
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                  {child.descripcion || "Sin descripción disponible."}
                </p>
                
                {child.comunidad && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border-l-4 border-yellow-400">
                    <p className="text-sm text-gray-600 font-medium">Comunidad:</p>
                    <p className="text-gray-800">{child.comunidad}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center p-8 md:p-12">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-[40px] p-6 md:p-8 shadow-2xl max-w-sm w-full">
                <div className="bg-gray-300 rounded-[24px] overflow-hidden mb-6 aspect-square">
                  <Image
                    src={child.fotoUrl || child.foto_url || "/placeholder-child.jpg"}
                    alt={child.nombre}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
                  {child.nombre}
                </h2>

                <div className="flex justify-center gap-6 mb-8">
                  <div className="bg-[#FBE7A1] rounded-full px-5 py-3 text-center">
                    <p className="text-xs text-gray-700 mb-1 font-semibold">Age</p>
                    <p className="text-2xl font-bold text-gray-900">{child.edad || 0}</p>
                  </div>
                  
                  <div className="bg-[#FBE7A1] rounded-full px-5 py-3 text-center">
                    <p className="text-xs text-gray-700 mb-1 font-semibold">Gender</p>
                    <div className="flex justify-center">
                      <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        {child.genero === 'M' || child.genero === 'masculino' ? (
                          <path d="M12 2C9.243 2 7 4.243 7 7c0 2.206 1.454 4.07 3.438 4.723L10 13.5v2.25H8.5V18h1.5v2h2v-2h1.5v-2.25H12v-2.25l-.438-1.777C13.546 11.07 15 9.206 15 7c0-2.757-2.243-5-5-5z"/>
                        ) : (
                          <path d="M12 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0 2c-3.866 0-7 3.134-7 7v3h2v-3c0-2.757 2.243-5 5-5s5 2.243 5 5v3h2v-3c0-3.866-3.134-7-7-7z"/>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleSponsor}
                    variant="warning"
                    className="rounded-full px-8 py-3 font-bold text-base md:text-lg shadow-lg hover:shadow-xl border-2 border-gray-900 transition-all hover:scale-105"
                  >
                    Apadrinar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}