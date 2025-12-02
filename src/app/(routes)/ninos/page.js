"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/common/Button";
import ChildCard from "@components/children/ChildCard";
import LoadingState from "@components/common/LoadingState";
import ErrorState from "@components/common/ErrorState";
import { AddIcon } from "@components/common/Icons";

// Hooks con inyección de dependencias
import { useService } from "@/app/lib/hooks/useService";

// Servicios
import childrenService from "@/app/lib/services/children.service";
import authService from "@/app/lib/services/auth.service";

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
  const [isAdmin, setIsAdmin] = useState(false);
  
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
    // Verificar rol del usuario
    const user = authService.getUserData();
    setIsAdmin(user?.rol === "administrador");
    
    loadAll();
  }, [loadAll]);

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert("No tienes permisos para eliminar niños.");
      return;
    }

    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este niño?");
    if (!confirmDelete) return;

    const result = await remove(id);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleCreate = () => {
    if (!isAdmin) {
      alert("No tienes permisos para crear niños.");
      return;
    }
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
            {isAdmin ? "Gestión de Niños" : "Niños"}
          </h1>
          {isAdmin && (
            <Button
              onClick={handleCreate}
              variant="warning"
              icon={AddIcon}
              iconPosition="left"
              className="rounded-full shadow-lg"
            >
              Agregar Niño
            </Button>
          )}
        </div>

        {!children || children.length === 0 ? (
          <EmptyState onCreateClick={handleCreate} isAdmin={isAdmin} />
        ) : (
          <ChildrenGrid 
            children={children} 
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
}

// Componentes internos siguiendo SRP

function EmptyState({ onCreateClick, isAdmin }) {
  return (
    <div className="bg-white rounded-3xl p-12 text-center shadow-2xl">
      <p className="text-gray-600 text-lg mb-4">
        {isAdmin ? "No hay niños registrados" : "No hay niños disponibles"}
      </p>
      {isAdmin && (
        <Button
          onClick={onCreateClick}
          variant="warning"
          className="rounded-full"
        >
          Registrar primer niño
        </Button>
      )}
    </div>
  );
}

function ChildrenGrid({ children, onDelete, isAdmin }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children.map((child) => (
        <ChildCard
          key={child.id_nino || child.id}
          child={child}
          onDelete={onDelete}
          showActions={isAdmin} 
        />
      ))}
    </div>
  );
}