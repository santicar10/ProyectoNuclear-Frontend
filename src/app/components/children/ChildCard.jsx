"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@components/common/Button";
import { useRouter } from "next/navigation";
import childrenService from "@/app/lib/services/children.service";

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

export default function ChildCard({ child, onDelete, showActions = false }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = () => {
    router.push(`/apadrinamiento/${child.id}`);
  };

  const handleEdit = () => {
    router.push(`/ninos/editar/${child.id}`);
  };

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar a ${child.nombre}?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await childrenService.delete(child.id);
    
    if (result.success) {
      alert(result.message);
      if (onDelete) onDelete(child.id);
    } else {
      alert(result.error);
    }
    
    setIsDeleting(false);
  };

  const age = childrenService.calculateAge(child.fechaNacimiento);

  return (
    <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="bg-gray-300 rounded-2xl overflow-hidden mb-4 aspect-square">
        <Image
          src={child.fotoUrl || "/placeholder-child.jpg"}
          alt={child.nombre}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
        {child.nombre}
      </h3>

      <div className="flex justify-center gap-6 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-700 mb-1">Edad</p>
          <p className="text-xl font-bold text-gray-900">{age}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-700 mb-1">Género</p>
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              {child.genero === 'M' ? (
                <path d="M12 2C9.243 2 7 4.243 7 7c0 2.206 1.454 4.07 3.438 4.723L10 13.5v2.25H8.5V18h1.5v2h2v-2h1.5v-2.25H12v-2.25l-.438-1.777C13.546 11.07 15 9.206 15 7c0-2.757-2.243-5-5-5z"/>
              ) : (
                <path d="M12 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0 2c-3.866 0-7 3.134-7 7v3h2v-3c0-2.757 2.243-5 5-5s5 2.243 5 5v3h2v-3c0-3.866-3.134-7-7-7z"/>
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