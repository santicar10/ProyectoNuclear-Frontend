// src/app/(routes)/perfil/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import authService from '@/app/lib/services/auth.service';
import childrenService from '@/app/lib/services/children.service';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [padrinoData, setPadrinoData] = useState(null);
  const [childrenData, setChildrenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    
    const userData = authService.getUserData();
    if (userData) {
      setPadrinoData({
        id: userData.id_usuario,
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
    }

    const result = await childrenService.getAll();
    if (result.success) {
      setChildrenData(result.data.slice(0, 3));
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
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        
        // Actualizar el localStorage
        authService.updateUserData({
          nombre: updatedUser.nombre,
          telefono: updatedUser.telefono,
          direccion: updatedUser.direccion
        });

        // Actualizar el estado local
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-gray-600 text-2xl">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header con gradiente */}
      <div className="relative bg-gradient-to-r from-[#FDB913] via-[#FF8C42] to-[#FF6B9D] h-40 md:h-48">
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold">
          Hola, {padrinoData?.name || 'Usuario'}
        </h1>
      </div>

      {/* Contenedor principal con avatar y tarjetas */}
      <div className="relative px-6 md:px-12 pb-12">
        {/* Avatar superpuesto */}
        <div className="flex justify-start -mt-20 md:-mt-24 mb-8 ml-8">
          <div className="bg-white rounded-full w-44 h-44 md:w-52 md:h-52 shadow-2xl flex items-center justify-center border-4 border-white">
            <div className="text-[#251264]">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start">
          {/* Tarjeta del Padrino */}
          <article className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-full max-w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col">
            <h2 className="text-center text-lg font-bold mb-6">PADRINO</h2>
            
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-base mb-1">{padrinoData?.name}</h3>
              </div>
              
              <div className="text-center">
                <p className="text-sm">{padrinoData?.email}</p>
              </div>
              
              {padrinoData?.phone && (
                <div className="text-center">
                  <p className="text-sm font-semibold">{padrinoData.phone}</p>
                </div>
              )}
              
              {padrinoData?.location && (
                <div className="text-center">
                  <p className="text-sm">{padrinoData.location}</p>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleEditClick}
                className="flex-1 bg-[#251264] text-white text-sm px-6 py-2.5 rounded-full hover:bg-opacity-90 transition font-semibold"
              >
                Editar
              </button>
            </div>
          </article>

          {/* Tarjetas de los niños o mensaje si no tiene */}
          {childrenData.length === 0 ? (
            <div className="col-span-full lg:col-span-3 flex items-center justify-center w-full">
              <div className="bg-white rounded-3xl p-12 max-w-2xl text-center shadow-xl border-2 border-dashed border-yellow-400">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-[#1A125C] mb-4">
                  ¿Qué esperas para apadrinar?
                </h2>
                
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Aún no tienes niños apadrinados. Cambia la vida de un niño hoy y sé parte de su historia. 
                  Cada pequeño gesto cuenta.
                </p>

                <button
                  onClick={handleGoToApadrinamiento}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Conocer niños disponibles
                </button>

                <div className="mt-10 grid grid-cols-3 gap-6 text-left">
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#1A125C] text-sm mb-1">Conoce</h3>
                    <p className="text-xs text-gray-600">Historias reales de niños que necesitan apoyo</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#1A125C] text-sm mb-1">Apadrina</h3>
                    <p className="text-xs text-gray-600">Elige al niño que quieres acompañar</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#1A125C] text-sm mb-1">Transforma</h3>
                    <p className="text-xs text-gray-600">Sé parte de su desarrollo y crecimiento</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            childrenData.map((child) => (
              <article
                key={child.id_nino || child.id}
                className="bg-[#F9DC6B] text-[#251264] rounded-[40px] w-full max-w-[350px] h-[460px] px-6 pt-6 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] flex flex-col"
              >
                <h2 className="text-center text-sm md:text-base font-semibold mb-4">
                  {child.nombre}
                </h2>

                <div className="flex justify-center gap-4 mb-4">
                  <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center">
                    <div className="font-semibold text-xs">Age</div>
                    <div className="mt-0.5 text-2xl font-bold">{child.edad || 0}</div>
                  </div>
                  <div className="bg-[#FBE7A1] rounded-full w-[90px] py-2 text-center">
                    <div className="font-semibold text-xs">Gender</div>
                    <div className="mt-0.5 text-xl">
                      {child.genero === 'M' ? '♂' : '♀'}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] mb-3 h-[200px]">
                  <Image
                    src={child.fotoUrl || child.foto_url || "/placeholder-child.jpg"}
                    alt={child.nombre}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex justify-between items-center mt-1.5 gap-2 w-full">
                  <p className="text-xs md:text-sm leading-snug flex-1 line-clamp-3 pr-2">
                    {child.descripcion || 'Sin descripción'}
                  </p>
                  <button 
                    onClick={() => handleViewBitacora(child.id_nino || child.id)}
                    className="text-xs md:text-sm px-4 py-1.5 border-2 border-[#251264] rounded-full hover:bg-[#251264] hover:text-white transition whitespace-nowrap font-semibold"
                  >
                    bitacora
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      <Modal isOpen={isEditing} onClose={handleCancelEdit} title="Editar Perfil">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={editForm.nombre}
              onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={editForm.telefono}
              onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={editForm.direccion}
              onChange={(e) => setEditForm({ ...editForm, direccion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Tu dirección"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="flex-1"
            >
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
    </div>
  );
}