import LoginForm from "@components/common/forms/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-tl-[3rem] rounded-tr-2xl rounded-bl-2xl rounded-br-[3rem] shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Lado izquierdo - Formulario (2/3) */}
            <div className="md:col-span-2 p-8 md:p-12 bg-gray-50">
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-1">Welcome back !!!</p>
                <h1 className="text-4xl font-bold text-gray-900">Log In</h1>
              </div>
              
              <LoginForm />
            </div>

            {/* Lado derecho - Ilustración (1/3) */}
            <div className="hidden md:flex bg-gradient-to-br from-yellow-200 to-yellow-300 items-end justify-center p-8 pb-12 relative">
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Mujer - centro */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <Image 
                    src="/images/children.svg" 
                    alt="Woman" 
                    width={110} 
                    height={180}
                    className="drop-shadow-lg"
                  />
                </div>

                {/* Cactus - derecha */}
                <div className="absolute bottom-0 right-4">
                  <Image 
                    src="/images/cactus.svg" 
                    alt="Cactus" 
                    width={80} 
                    height={120}
                    className="drop-shadow-lg"
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