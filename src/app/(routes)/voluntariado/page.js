"use client";
import VoluntariadoForm from "@/app/components/common/forms/VoluntariadoForm";
import Image from "next/image";

export default function VoluntariadoPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
        <section className="w-full mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
                        {/* Columna izquierda: gradiente + texto */}
                        <div className="col-span-2 flex items-center justify-center py-10 md:py-16 relative" style={{background: 'linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)'}}>
                            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase">
                                ¿QUIERES SER VOLUNTARIO?
                            </h1>
                        </div>
        
                        {/* Columna derecha: imagen con color sólido */}
                        <div className="flex items-center justify-center py-6 relative" style={{backgroundColor: '#FA5E60'}}>
                            <div className="relative w-full h-full min-h-[150px]">
                                <Image
                                    src="/family.svg" 
                                    alt="Voluntariado"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

      <div className="w-full max-w-4xl px-6 py-10">
        
        <VoluntariadoForm />
      </div>
    </main>
  );
}