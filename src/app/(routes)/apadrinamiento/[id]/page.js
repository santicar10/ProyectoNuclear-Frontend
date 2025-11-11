"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "@components/common/Button";
import childrenService from "@/app/lib/services/children.service";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function ChildDetailPage() {
  const params = useParams();
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSponsorLoading, setIsSponsorLoading] = useState(false);

  useEffect(() => {
    loadChild();
  }, [params.id]);

  const loadChild = async () => {
    setIsLoading(true);
    const result = await childrenService.getById(params.id);
    
    if (result.success) {
      setChild(result.data);
    } else {
      alert(result.error);
    }
    
    setIsLoading(false);
  };

  const handleSponsor = async () => {
    setIsSponsorLoading(true);
    setTimeout(() => {
      setIsSponsorLoading(false);
      alert("¡Gracias por tu interés en apadrinar!");
    }, 1000);
  };

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8">
          <p className="text-red-600">No se encontró el niño</p>
        </div>
      </div>
    );
  }

  const age = childrenService.calculateAge(child.fechaNacimiento);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          
          <button
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowBackIcon />
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Descripción
              </h1>
              
              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                {child.descripcion.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>Comunidad:</strong> {child.comunidad}
                </p>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl p-6 shadow-xl">
                
                <div className="bg-gray-300 rounded-2xl overflow-hidden mb-4 aspect-square">
                  <Image
                    src={child.fotoUrl || "/placeholder-child.jpg"}
                    alt={child.nombre}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-900 text-center mb-4">
                  {child.nombre}
                </h2>

                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-700 mb-1">Edad</p>
                    <p className="text-2xl font-bold text-gray-900">{age}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-700 mb-1">Género</p>
                    <div className="flex justify-center">
                      <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        {child.genero === 'M' ? (
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
                    isLoading={isSponsorLoading}
                    variant="warning"
                    className="rounded-full px-8 py-3 font-bold shadow-md hover:shadow-lg border-2 border-gray-900"
                  >
                    Apadrinar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}