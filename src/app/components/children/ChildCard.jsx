"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@components/common/Button";
import { EditIcon, DeleteIcon } from "@components/common/icons";
import { useRouter } from "next/navigation";
import childrenService from "@/app/lib/services/children.service";

export default function ChildCard({ child, onDelete, showActions = false }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const childId = child.id_nino || child.id;

  const handleView = () => {
    if (!childId) {
      console.error("ID del niño no disponible:", child);
      alert("Error: No se puede cargar el detalle del niño");
      return;
    }
    
    router.push(`/apadrinamiento/${childId}`);
  };

  const handleEdit = () => {
    if (!childId) {
      console.error("ID del niño no disponible:", child);
      alert("Error: No se puede editar el niño");
      return;
    }
    
    router.push(`/ninos/editar/${childId}`);
  };

  const handleDelete = async () => {
    if (!childId) {
      console.error("ID del niño no disponible:", child);
      alert("Error: No se puede eliminar el niño");
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar a ${child.nombre}?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await childrenService.delete(childId);
    
    if (result.success) {
      alert(result.message);
      if (onDelete) onDelete(childId);
    } else {
      alert(result.error);
    }
    
    setIsDeleting(false);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="bg-gray-300 rounded-2xl overflow-hidden mb-4 aspect-square">
        <Image
          src={child.fotoUrl || child.foto_url || "/placeholder-child.jpg"}
          alt={child.nombre || "Niño"}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
        {child.nombre || "Sin nombre"}
      </h3>

      <div className="flex justify-center gap-6 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-700 mb-1">Edad</p>
          <p className="text-xl font-bold text-gray-900">{child.edad || 0}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-700 mb-1">Género</p>
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              {child.genero === 'M' || child.genero === 'masculino' ? (
                <path d="M12 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0 2c-3.866 0-7 3.134-7 7v3h2v-3c0-2.757 2.243-5 5-5s5 2.243 5 5v3h2v-3c0-3.866-3.134-7-7-7z"/>
              ) : (
                <path d="M12 2C9.243 2 7 4.243 7 7c0 2.206 1.454 4.07 3.438 4.723L10 13.5v2.25H8.5V18h1.5v2h2v-2h1.5v-2.25H12v-2.25l-.438-1.777C13.546 11.07 15 9.206 15 7c0-2.757-2.243-5-5-5z"/>
              )}
            </svg>
          </div>
        </div>
      </div>

      {showActions ? (
        <div className="flex gap-2">
          <Button
            onClick={handleEdit}
            variant="secondary"
            size="sm"
            icon={EditIcon}
            iconPosition="left"
            className="rounded-full flex-1"
          >
            Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            size="sm"
            icon={DeleteIcon}
            iconPosition="left"
            isLoading={isDeleting}
            className="rounded-full flex-1"
          >
            Eliminar
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button
            onClick={handleView}
            variant="warning"
            className="rounded-full px-6 font-bold shadow-md hover:shadow-lg border-2 border-gray-900"
          >
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
}