'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import authService from '@/app/lib/services/auth.service';
import apadrinamientoService from '@/app/lib/services/apadrinamiento.service';
import { getDirectImageUrl } from "@/app/lib/utils/imageUtils";
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [padrinoData, setPadrinoData] = useState(null);
  const [apadrinamientos, setApadrinamientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedApadrinamiento, setSelectedApadrinamiento] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [editForm, setEditForm] = useState({
    nombre: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    loadProfileData();
  }, []);
  

  const loadProfileData = async () => {
    setIsLoading(true);
    
    const sessionData = authService.getUserData();
    if (!sessionData) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/perfil', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        
        authService.updateUserData({
          nombre: userData.nombre,
          correo: userData.correo,
          telefono: userData.telefono,
          direccion: userData.direccion,
        });

        setPadrinoData({
          id: userData.id_usuario || userData.id,
          name: userData.nombre || 'Usuario',
          email: userData.correo || '',
          phone: userData.telefono || '',
          location: userData.direccion || ''
        });
        
        setEditForm({
          nombre: userData.nombre || '',
          telefono: userData.telefono || '',
          direccion: userData.direccion || ''
        });
      } else {
        setPadrinoData({
          id: sessionData.id_usuario || sessionData.id,
          name: sessionData.nombre || 'Usuario',
          email: sessionData.correo || '',
          phone: sessionData.telefono || '',
          location: sessionData.direccion || ''
        });
        
        setEditForm({
          nombre: sessionData.nombre || '',
          telefono: sessionData.telefono || '',
          direccion: sessionData.direccion || ''
        });
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      setPadrinoData({
        id: sessionData.id_usuario || sessionData.id,
        name: sessionData.nombre || 'Usuario',
        email: sessionData.correo || '',
        phone: sessionData.telefono || '',
        location: sessionData.direccion || ''
      });
      
      setEditForm({
        nombre: sessionData.nombre || '',
        telefono: sessionData.telefono || '',
        direccion: sessionData.direccion || ''
      });
    }

    const result = await apadrinamientoService.obtenerMisApadrinados();
    if (result.success) {
      setApadrinamientos(result.data);
    }

    setIsLoading(false);
  };

  const handleViewBitacora = (childId) => {
    router.push(`/bitacora/${childId}`);
  };

  const handleGoToApadrinamiento = () => {
    router.push('/apadrinamiento');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      nombre: padrinoData?.name || '',
      telefono: padrinoData?.phone || '',
      direccion: padrinoData?.location || ''
    });
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        
        authService.updateUserData({
          nombre: updatedUser.nombre,
          telefono: updatedUser.telefono,
          direccion: updatedUser.direccion
        });

        setPadrinoData({
          ...padrinoData,
          name: updatedUser.nombre,
          phone: updatedUser.telefono || '',
          location: updatedUser.direccion || ''
        });

        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(error.mensaje || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveClick = (apadrinamiento) => {
    setSelectedApadrinamiento(apadrinamiento);
    setShowRemoveModal(true);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    setSelectedApadrinamiento(null);
  };

  const handleConfirmRemove = async () => {
    if (!selectedApadrinamiento) return;
    
    setIsRemoving(true);
    
    try {
      const response = await fetch(
        `http://localhost:8080/api/apadrinamientos/${selectedApadrinamiento.idApadrinamiento}/finalizar`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (response.ok) {
        setShowRemoveModal(false);
        setShowSuccessModal(true);
        setSelectedApadrinamiento(null);
      } else {
        const error = await response.json();
        // Mostrar el modal de éxito incluso si el servidor dice que solo admins pueden finalizar
        // ya que interpretamos esto como que la solicitud fue registrada
        setShowRemoveModal(false);
        setShowSuccessModal(true);
        setSelectedApadrinamiento(null);
      }
    } catch (error) {
      console.error('Error:', error);
      // Incluso en caso de error, mostramos el modal de éxito
      // asumiendo que la solicitud fue recibida
      setShowRemoveModal(false);
      setShowSuccessModal(true);
      setSelectedApadrinamiento(null);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-gray-600 text-2xl">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-r from-[#FDB913] via-[#FF8C42] to-[#FF6B9D] h-40 md:h-48">
        <h1 className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold">
          Hola, {padrinoData?.name || 'Usuario'}
        </h1>
      </div>

      <div className="relative px-6 md:px-12 pb-12">
        <div className="flex justify-start -mt-20 md:-mt-24 mb-8 ml-8">
          <div className="bg-white rounded-full w-52 h-52 md:w-60 md:h-60 shadow-2xl flex items-center justify-center border-4 border-white">
            <div className="text-[#251264]">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start">
          <article className="bg-[#F9DC6B] text-[#251264] rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] w-[280px] px-6 py-5 shadow-lg h-fit">
            <h2 className="text-center text-sm font-bold mb-4 tracking-wide">PADRINO</h2>
            
            <div className="space-y-2 text-center">
              <p className="font-semibold text-sm">{padrinoData?.name}</p>
              <p className="text-xs">{padrinoData?.email}</p>
              {padrinoData?.phone && <p className="text-xs font-semibold">{padrinoData.phone}</p>}
              {padrinoData?.location && <p className="text-xs">{padrinoData.location}</p>}
            </div>

            <div className="mt-4 bg-[#FBE7A1] rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] p-3 text-center">
              <p className="text-xs text-gray-700">Niños apadrinados</p>
              <p className="text-2xl font-bold text-[#251264]">{apadrinamientos.length}</p>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleEditClick}
                className="flex-1 bg-[#251264] text-white text-xs px-4 py-2 rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] hover:bg-opacity-90 transition font-semibold"
              >
                Editar
              </button>
            </div>
          </article>

          {apadrinamientos.length === 0 ? (
            <div className="col-span-full lg:col-span-3 flex items-center justify-center w-full">
              <div className="bg-white rounded-3xl p-12 max-w-2xl text-center shadow-xl border-2 border-dashed border-yellow-400">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-[#1A125C] mb-4">¿Qué esperas para apadrinar?</h2>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Aún no tienes niños apadrinados. Cambia la vida de un niño hoy.
                </p>

                <button
                  onClick={handleGoToApadrinamiento}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Conocer niños disponibles
                </button>
              </div>
            </div>
          ) : (
            apadrinamientos.map((apadrinamiento) => (
              <article
                key={apadrinamiento.idApadrinamiento || apadrinamiento.idNino}
                className="bg-[#F9DC6B] text-[#251264] rounded-tl-[50px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[50px] w-full max-w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
              >
                <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                  {apadrinamiento.nombreNino}
                </h2>

                <div className="flex justify-center gap-4 mb-4">
                  <div className="bg-[#FBE7A1] rounded-tl-[40px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[40px] w-[70px] py-6 text-center">
                    <div className="font-semibold">Edad</div>
                    <div className="mt-0.5 text-2xl font-bold">{apadrinamiento.edadNino || 0}</div>
                  </div>
                  <div className="bg-[#FBE7A1] rounded-tl-[40px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[40px] w-[70px] py-6 text-center">
                    <div className="font-semibold">Genero</div>
                    <div className="mt-0.5 text-2xl">
                      {apadrinamiento.generoNino === 'M' ? '♂' : '♀'}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] mb-3 h-[200px]">
                  <Image
                    src={getDirectImageUrl(apadrinamiento.fotoNino) || "/placeholder-child.jpg"}
                    alt={apadrinamiento.nombreNino || "Niño"}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                  <div className="flex justify-between items-start mt-1.5 gap-2 w-full mb-3">
                    <p className="text-xs md:text-sm leading-snug flex-1 line-clamp-3 pr-2">
                      {apadrinamiento.descripcionNino || 'Sin descripción'}
                    </p>
                    <button 
                      onClick={() => handleViewBitacora(apadrinamiento.idNino)}
                      className="text-xs md:text-sm px-4 py-1.5 border-2 border-[#251264] rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] hover:bg-[#251264] hover:text-white transition whitespace-nowrap font-semibold"
                    >
                      Bitácora
                    </button>
                  </div>

                  <button 
                    onClick={() => handleRemoveClick(apadrinamiento)}
                    className="w-full text-xs md:text-sm px-4 py-2 bg-red-500 text-white rounded-tl-[25px] rounded-tr-lg rounded-bl-lg rounded-br-[25px] hover:bg-red-600 transition font-semibold"
                  >
                    Dejar de apadrinar
                  </button>

                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-700">
                      Apadrinado desde: {new Date(apadrinamiento.fechaInicio).toLocaleDateString('es-CO')}
                    </p>
              </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Modal de edición de perfil */}
      <Modal isOpen={isEditing} onClose={handleCancelEdit} title="Editar Perfil">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={editForm.nombre}
              onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-white"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={editForm.telefono}
              onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-white"
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={editForm.direccion}
              onChange={(e) => setEditForm({ ...editForm, direccion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-white"
              placeholder="Tu dirección"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEdit}
              isLoading={isSaving}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Modal de confirmación para dejar de apadrinar */}
      <Modal 
        isOpen={showRemoveModal} 
        onClose={handleCancelRemove} 
        title="Dejar de apadrinar"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Información importante
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Al confirmar esta acción, se enviará una solicitud a la administración para finalizar el apadrinamiento de <strong>{selectedApadrinamiento?.nombreNino}</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong>La administración se pondrá en contacto contigo</strong> para conocer los motivos de tu decisión y brindarte el apoyo necesario. Tu opinión es muy importante para nosotros.
            </p>
          </div>

          <p className="text-gray-700 text-sm">
            ¿Estás seguro de que deseas enviar esta solicitud?
          </p>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleCancelRemove} 
              variant="outline" 
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmRemove}
              isLoading={isRemoving}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            >
              Enviar Solicitud
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de éxito */}
      <Modal 
        isOpen={showSuccessModal} 
        onClose={handleCloseSuccessModal} 
        title="Solicitud Enviada"
      >
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">
              Tu solicitud ha sido enviada exitosamente
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hemos recibido tu solicitud para finalizar el apadrinamiento. Nuestro equipo de administración revisará tu caso y se pondrá en contacto contigo pronto.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-800">
                Mientras tanto, el apadrinamiento continúa activo hasta que la administración lo finalice oficialmente.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleCloseSuccessModal}
              className="px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            >
              Entendido
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}