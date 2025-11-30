// src/app/(routes)/bitacora/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Textarea from "@components/common/Textarea";
import authService from "@/app/lib/services/auth.service";
import bitacoraService from "@/app/lib/services/bitacora.service";
import { generateBitacoraPDF } from "@/app/lib/utils/pdfGenerator";

const ArrowBackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const AddIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default function BitacoraPage() {
  const params = useParams();
  const router = useRouter();
  const [bitacoraEntries, setBitacoraEntries] = useState([]);
  const [childName, setChildName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
    loadBitacora();
  }, [params.id]);

  const checkAuth = () => {
    const userData = authService.getUserData();
    setUserRole(userData?.rol);
  };

  const loadBitacora = async () => {
    setIsLoading(true);
    const result = await bitacoraService.getByChildId(params.id, page);
    
    if (result.success) {
      if (page === 1) {
        setBitacoraEntries(result.data);
        setChildName(result.data[0]?.nombreNino || "");
      } else {
        setBitacoraEntries(prev => [...prev, ...result.data]);
      }
      setHasMore(result.hasMore);
    }
    
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    loadBitacora();
  };

  const handleGeneratePDF = async () => {
    try {
      await generateBitacoraPDF(childName, bitacoraEntries);
    } catch (error) {
      alert("Error al generar PDF: " + error.message);
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.trim()) {
      alert("Debes escribir algo en la bitácora");
      return;
    }

    setIsSubmitting(true);
    const result = await bitacoraService.createEntry(params.id, {
      descripcion: newEntry,
    });

    if (result.success) {
      setShowAddModal(false);
      setNewEntry("");
      setPage(1);
      loadBitacora();
      alert("Entrada agregada exitosamente");
    } else {
      alert(result.error || "Error al agregar entrada");
    }

    setIsSubmitting(false);
  };

  const handleBack = () => {
    router.push("/perfil");
  };

  const isAdmin = userRole === "administrador";

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowBackIcon />
            <span>Volver</span>
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white flex items-center justify-between">
            <h1 className="text-4xl font-bold">BITACORA</h1>
            {isAdmin && (
              <Button
                onClick={() => setShowAddModal(true)}
                variant="warning"
                icon={AddIcon}
                iconPosition="left"
                className="rounded-full shadow-lg bg-white text-gray-900 hover:bg-gray-100"
              >
                Agregar entrada
              </Button>
            )}
          </div>
        </div>

        {/* Entradas de bitácora */}
        {bitacoraEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay entradas en la bitácora</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bitacoraEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-yellow-100 rounded-3xl p-6 shadow-md"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {entry.nombreNino || childName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{entry.fecha}</p>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {entry.descripcion}
                    </p>
                  </div>

                  {entry.imagen && (
                    <div className="flex-shrink-0 w-48 h-48 bg-gray-200 rounded-2xl overflow-hidden">
                      <Image
                        src={entry.imagen}
                        alt="Bitácora"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-8">
          {hasMore && (
            <Button
              onClick={handleLoadMore}
              isLoading={isLoading}
              variant="warning"
              className="rounded-full px-8 font-semibold"
            >
              Cargar más
            </Button>
          )}

          {bitacoraEntries.length > 0 && (
            <Button
              onClick={handleGeneratePDF}
              variant="warning"
              className="rounded-full px-8 font-semibold"
            >
              PDF
            </Button>
          )}
        </div>
      </div>

      {/* Modal para agregar entrada */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Agregar entrada a la bitácora"
        size="lg"
      >
        <div className="space-y-6">
          <Textarea
            label="Descripción"
            name="descripcion"
            placeholder="Escribe aquí la entrada de la bitácora..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            rows={10}
            labelClassName="text-gray-800"
            textareaClassName="bg-yellow-100 border-none rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl focus:ring-yellow-400"
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="rounded-full flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="warning"
              onClick={handleAddEntry}
              isLoading={isSubmitting}
              className="rounded-full flex-1 font-bold"
            >
              Agregar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}