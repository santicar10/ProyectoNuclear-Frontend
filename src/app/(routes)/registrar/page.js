import RegisterForm from "@components/common/forms/RegisterForm";
import Image from "next/image";

/**
 * Página de registro con diseño dividido
 * Layout: Formulario a la izquierda, ilustración a la derecha
 * 
 * @component
 */
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-tl-[3rem] rounded-tr-2xl rounded-bl-2xl rounded-br-[3rem] shadow-2xl overflow-visible relative">
          <div className="grid md:grid-cols-3">
            
            {/* Sección del formulario */}
            <div className="md:col-span-2 p-8 md:p-12 bg-gray-50 rounded-tl-[3rem] rounded-bl-2xl">
              <div className="mb-10">
                <p className="text-base text-gray-600 mb-2">
                  Únete a nosotros !!!
                </p>
                <h1 className="text-5xl font-bold text-gray-900">
                  Regístrate
                </h1>
              </div>
              
              <div className="max-w-sm">
                <RegisterForm />
              </div>
            </div>

            {/* Sección de ilustración (solo desktop) */}
            <div className="hidden md:flex bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-tl-[3rem] rounded-tr-2xl rounded-br-[3rem] rounded-bl-[3rem] items-center justify-center p-8 relative overflow-visible">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-1/2 -translate-y-1/2 -left-50 z-10">
                  <Image 
                    src="family.svg" 
                    alt="Family" 
                    width={400} 
                    height={210}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}