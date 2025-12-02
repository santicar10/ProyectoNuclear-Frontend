"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/common/Button";
import ChildCard from "@components/children/ChildCard";
import LoadingState from "@components/common/LoadingState";
import ErrorState from "@components/common/ErrorState";
import { AddIcon } from "@components/common/Icons";

// Hooks con inyección de dependencias
import { useService } from "@/app/lib/hooks/useService";

// Servicio (puede ser inyectado para testing)
import childrenService from "@/app/lib/services/children.service";

/**
 * Página de listado de niños refactorizada siguiendo SOLID
 * 
 * Principios aplicados:
 * - SRP: Componente solo renderiza, lógica en hooks
 * - OCP: Fácil de extender cambiando el servicio
 * - DIP: Depende de abstracciones (useService, childrenService)
 */
export default function ChildrenListPage({ 
  // Inyección de dependencia para testing
  service = childrenService 
}) {
  const router = useRouter();
  
  // Hook genérico de servicio CRUD
  const {
    data: children,
    isLoading,
    error,
    loadAll,
    remove,
    setData,
  } = useService(service);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleDelete = async (id) => {
    const result = await remove(id);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleCreate = () => {
    router.push('/ninos/crear');
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadAll} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Gestión de Niños
          </h1>
          <Button
            onClick={handleCreate}
            variant="warning"
            icon={AddIcon}
            iconPosition="left"
            className="rounded-tl-[45px] rounded-tr-lg rounded-bl-lg rounded-br-[45px] rounded-full shadow-lg"
          >
            Agregar Niño
          </Button>
        </div>

        {!children || children.length === 0 ? (
          <EmptyState onCreateClick={handleCreate} />
        ) : (
          <ChildrenGrid 
            children={children} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

// Componentes internos siguiendo SRP

function EmptyState({ onCreateClick }) {
  return (
    <div className="bg-white rounded-3xl p-12 text-center shadow-2xl">
      <p className="text-gray-600 text-lg mb-4">No hay niños registrados</p>
      <Button
        onClick={onCreateClick}
        variant="warning"
        className="rounded-full"
      >
        Registrar primer niño
      </Button>
    </div>
  );
}

function ChildrenGrid({ children, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children.map((child) => (
        <ChildCard
          key={child.id_nino || child.id}
          child={child}
          onDelete={onDelete}
          showActions={true}
        />
      ))}
    </div>
  );
}
