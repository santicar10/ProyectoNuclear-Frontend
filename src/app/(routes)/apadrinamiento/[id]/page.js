"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@components/common/Modal";
import childrenService from "@/app/lib/services/children.service";
import apadrinamientoService from "@/app/lib/services/apadrinamiento.service";
import { getDirectImageUrl } from "@/app/lib/utils/imageUtils";
import authService from "@/app/lib/services/auth.service";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const SuccessIcon = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ChildDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSponsoring, setIsSponsoring] = useState(false);
  const [alreadySponsored, setAlreadySponsored] = useState(false);

  useEffect(() => {
    checkAuth();
    loadChildDetail();
  }, [params.id]);

  const checkAuth = async () => {
    const userData = authService.getUserData();
    setIsAuthenticated(!!userData);
    setUserRole(userData?.rol);

    if (userData && userData.rol === 'padrino') {
      const result = await apadrinamientoService.verificarApadrinamiento(params.id);
      if (result.success) {
        setAlreadySponsored(result.apadrinado);
      }
    }
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

  const handleSponsorClick = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para apadrinar");
      router.push("/login");
      return;
    }

    if (userRole !== 'padrino') {
      alert("Solo los usuarios con rol de padrino pueden apadrinar niños");
      return;
    }

    if (alreadySponsored) {
      alert("Ya estás apadrinando a este niño");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSponsor = async () => {
    setIsSponsoring(true);
    
    const result = await apadrinamientoService.crear(child.id_nino || child.id);
    
    if (result.success) {
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setAlreadySponsored(true);
    } else {
      alert(result.error || "Error al procesar el apadrinamiento");
    }
    
    setIsSponsoring(false);
  };

  const handleCancelSponsor = () => {
    setShowConfirmModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/perfil');
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
          <button 
            onClick={handleBack} 
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-semibold rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] transition"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const isChildAvailable = child.estadoApadrinamiento === 'Disponible' || child.estado_apadrinamiento === 'Disponible';
  const canSponsor = isAuthenticated && userRole === 'padrino' && isChildAvailable && !alreadySponsored;

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

        <div className="bg-white rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] shadow-2xl overflow-hidden">
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
                  <div className="mt-6 p-4 bg-gray-50 rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] border-l-4 border-yellow-400">
                    <p className="text-sm text-gray-600 font-medium">Comunidad:</p>
                    <p className="text-gray-800">{child.comunidad}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br flex items-center justify-center p-8 md:p-12">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] p-6 md:p-8 shadow-2xl max-w-sm w-full">
                <div className="bg-gray-300 rounded-tl-[30px] rounded-tr-lg rounded-bl-lg rounded-br-[30px] overflow-hidden mb-6 aspect-square">
                  <Image
                    src={getDirectImageUrl(child.fotoUrl || child.foto_url) || "/placeholder-child.jpg"}
                    alt={child.nombre || "Niño"}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
                  {child.nombre}
                </h2>

                <div className="flex justify-center gap-6 mb-8">
                  <div className="bg-[#FBE7A1] rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-[70px] py-6 text-center">
                    <p className="text-gray-700 mb-1 font-semibold">Edad</p>
                    <p className="text-2xl font-bold text-gray-900">{child.edad || 0}</p>
                  </div>
                  
                  <div className="bg-[#FBE7A1] rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-[70px] py-6 text-center">
                    <p className="text-gray-700 mb-1 font-semibold">Género</p>
                    <div className="flex justify-center">
                      <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        {child.genero === 'M' || child.genero === 'masculino' ? (
                          <path d="M12 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0 2c-3.866 0-7 3.134-7 7v3h2v-3c0-2.757 2.243-5 5-5s5 2.243 5 5v3h2v-3c0-3.866-3.134-7-7-7z"/>
                        ) : (
                          <path d="M12 2C9.243 2 7 4.243 7 7c0 2.206 1.454 4.07 3.438 4.723L10 13.5v2.25H8.5V18h1.5v2h2v-2h1.5v-2.25H12v-2.25l-.438-1.777C13.546 11.07 15 9.206 15 7c0-2.757-2.243-5-5-5z"/>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  {alreadySponsored ? (
                    <div className="px-8 py-3 bg-green-100 text-green-800 font-bold text-base md:text-lg rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] text-center">
                      ✓ Ya lo apadrinas
                    </div>
                  ) : !isChildAvailable ? (
                    <div className="px-8 py-3 bg-gray-200 text-gray-600 font-bold text-base md:text-lg rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] text-center">
                      Ya apadrinado
                    </div>
                  ) : (
                    <button
                      onClick={handleSponsorClick}
                      disabled={!canSponsor && isAuthenticated}
                      className={`px-8 py-3 font-bold text-base md:text-lg shadow-lg hover:shadow-xl border-2 border-gray-900 rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] transition-all hover:scale-105 ${
                        canSponsor || !isAuthenticated
                          ? 'bg-white hover:bg-yellow-500 text-[#251264]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Apadrinar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelSponsor}
        title=""
        size="md"
        showCloseButton={false}
      >
        <div className="text-center py-6">
          <HeartIcon />
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¿Estás seguro de apadrinar a {child?.nombre}?
          </h3>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Al confirmar, iniciarás un vínculo especial que puede transformar la vida de este niño. 
            Te mantendremos informado sobre su progreso y desarrollo.
          </p>

          <div className="bg-yellow-50 rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] p-4 mb-6 border border-yellow-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Nota:</span> Un miembro de nuestro equipo se pondrá en contacto contigo 
              para completar el proceso de apadrinamiento.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCancelSponsor}
              disabled={isSponsoring}
              className="flex-1 px-6 py-3 border-2 border-[#251264] text-[#251264] font-semibold rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] hover:bg-[#251264] hover:text-white transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmSponsor}
              disabled={isSponsoring}
              className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-[#251264] font-bold shadow-lg hover:shadow-xl rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] transition disabled:opacity-50 flex items-center justify-center"
            >
              {isSponsoring ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Procesando...
                </>
              ) : (
                'Sí, quiero apadrinar'
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Éxito */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title=""
        size="md"
        showCloseButton={false}
      >
        <div className="text-center py-6">
          <SuccessIcon />
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¡Felicidades!
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Has iniciado el apadrinamiento de <span className="font-bold text-[#251264]">{child?.nombre}</span>. 
            Ahora podrás ver su progreso en tu perfil y recibir actualizaciones sobre su desarrollo.
          </p>

          <div className="bg-green-50 rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] p-4 mb-6 border border-green-200">
            <p className="text-sm text-green-800">
              <span className="font-semibold">¡Gracias por tu generosidad!</span> Tu apoyo marca la diferencia 
              en la vida de este niño.
            </p>
          </div>

          <button
            onClick={handleSuccessClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] transition"
          >
            Ver mi perfil
          </button>
        </div>
      </Modal>
    </main>
  );
}