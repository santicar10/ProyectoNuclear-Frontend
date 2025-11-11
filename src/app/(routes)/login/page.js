import LoginForm from "@components/common/forms/LoginForm";
import Image from "next/image";

/**
 * Página de inicio de sesión con diseño dividido
 * Layout: Formulario a la izquierda, ilustraciones a la derecha
 * 
 * @component
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-500 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-tl-[3rem] sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-[3rem] shadow-2xl overflow-hidden relative">
          <div className="grid md:grid-cols-3">
            
            {/* Sección del formulario */}
            <div className="md:col-span-2 p-6 sm:p-8 md:p-12 bg-gray-50 rounded-2xl sm:rounded-tl-[3rem] sm:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none">
              <div className="mb-8 sm:mb-10">
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  Bienvenido de vuelta !!!
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Incia Sesión
                </h1>
              </div>
              
              <div className="max-w-sm mx-auto md:mx-0">
                <LoginForm />
              </div>
            </div>

            {/* Sección de ilustraciones (solo desktop) */}
            <div className="hidden md:flex bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-tr-2xl rounded-br-[3rem] items-center justify-center p-8 relative overflow-visible">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-1/2 -translate-y-1/2 -left-45 z-10">
                  <Image 
                    src="children.svg" 
                    alt="Child" 
                    width={250} 
                    height={210}
                    className="drop-shadow-2xl"
                  />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                  <Image 
                    src="cactus.svg" 
                    alt="Cactus" 
                    width={240} 
                    height={360}
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