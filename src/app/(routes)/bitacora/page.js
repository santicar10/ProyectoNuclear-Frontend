// src/app/(routes)/bitacora/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/common/Button";
import LoadingState from "@components/common/LoadingState";
import ErrorState from "@components/common/ErrorState";
import Modal from "@components/common/Modal";
import { AddIcon } from "@components/common/Icons";
import authService from "@/app/lib/services/auth.service";
import childrenService from "@/app/lib/services/children.service";
import bitacoraService from "@/app/lib/services/bitacora.service";

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function GestionBitacorasPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [bitacoraEntries, setBitacoraEntries] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkRole();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadChildren();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (selectedChild) {
      loadBitacora();
    }
  }, [selectedChild]);

  const checkRole = () => {
    const user = authService.getUserData();
    const admin = user?.rol === "administrador";
    setIsAdmin(admin);
    setIsLoading(false);
  };

  const loadChildren = async () => {
    const result = await childrenService.getAll();
    if (result.success) {
      setChildren(result.data);
      if (result.data.length > 0) {
        setSelectedChild(result.data[0].id_nino || result.data[0].id);
      }
    } else {
      setError(result.error);
    }
  };

  const loadBitacora = async () => {
    if (!selectedChild) return;
    
    setIsLoading(true);
    const result = await bitacoraService.getByChildId(selectedChild, 1, 100);
    
    if (result.success) {
      setBitacoraEntries(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleChildChange = (e) => {
    setSelectedChild(e.target.value);
  };

  const handleCreate = () => {
    router.push(`/bitacora/${selectedChild}/crear`);
  };

  const handleEdit = (entryId) => {
    router.push(`/bitacora/${entryId}/editar`);
  };

  const handleDeleteClick = (entry) => {
    setEntryToDelete(entry);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;
    
    setIsDeleting(true);
    const result = await bitacoraService.delete(entryToDelete.id);
    
    if (result.success) {
      setBitacoraEntries(prev => prev.filter(e => e.id !== entryToDelete.id));
      setShowDeleteModal(false);
      setEntryToDelete(null);
    } else {
      alert(result.error || "Error al eliminar la entrada");
    }
    
    setIsDeleting(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso restringido</h1>
          <p className="text-gray-600 mb-6">
            Solo los administradores pueden gestionar bitácoras.
          </p>
          <Button
            variant="warning"
            className="rounded-full px-8 font-semibold"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  if (error && !selectedChild) {
    return <ErrorState message={error} onRetry={loadChildren} />;
  }

  const selectedChildData = children.find(c => 
    (c.id_nino || c.id) === parseInt(selectedChild)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Gestión de Bitácoras
            </h1>
            <p className="text-gray-600 mt-2">
              Administra las entradas de bitácora de cada niño
            </p>
          </div>
        </div>

        {/* Selector de niño */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Niño
          </label>
          <div className="flex gap-4">
            <select
              value={selectedChild || ""}
              onChange={handleChildChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              {children.map((child) => (
                <option key={child.id_nino || child.id} value={child.id_nino || child.id}>
                  {child.nombre} - {child.edad} años
                </option>
              ))}
            </select>
            {selectedChild && (
              <Button
                onClick={handleCreate}
                variant="warning"
                icon={AddIcon}
                iconPosition="left"
                className="rounded-full shadow-lg"
              >
                Nueva Entrada
              </Button>
            )}
          </div>
        </div>

        {/* Lista de entradas */}
        {isLoading ? (
          <LoadingState message="Cargando bitácora..." fullScreen={false} />
        ) : bitacoraEntries.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
            <p className="text-gray-600 text-lg mb-4">
              No hay entradas en la bitácora de {selectedChildData?.nombre}
            </p>
            <Button
              onClick={handleCreate}
              variant="warning"
              className="rounded-full"
            >
              Crear primera entrada
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bitacoraEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {entry.nombreNino || selectedChildData?.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">{entry.fecha}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(entry.id)}
                      variant="secondary"
                      size="sm"
                      icon={EditIcon}
                      iconPosition="left"
                      className="rounded-full"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(entry)}
                      variant="danger"
                      size="sm"
                      icon={DeleteIcon}
                      iconPosition="left"
                      className="rounded-full"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {entry.descripcion}
                </p>
                {entry.imagen && (
                  <div className="mt-4">
                    <img
                      src={entry.imagen}
                      alt="Bitácora"
                      className="rounded-lg max-h-64 object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar Entrada"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar esta entrada de bitácora? Esta acción no se puede deshacer.
          </p>
          
          {entryToDelete && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Fecha:</strong> {entryToDelete.fecha}
              </p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {entryToDelete.descripcion}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="outline"
              className="flex-1 rounded-full"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="danger"
              className="flex-1 rounded-full"
              isLoading={isDeleting}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}