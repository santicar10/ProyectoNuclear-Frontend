"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/common/Button";
import ChildCard from "@components/children/ChildCard";
import { AddIcon } from "@components/common/icons";
import childrenService from "@/app/lib/services/children.service";

export default function ChildrenListPage() {
  const router = useRouter();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    setIsLoading(true);
    const result = await childrenService.getAll();
    
    if (result.success) {
      setChildren(result.data);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const handleCreate = () => {
    router.push('/ninos/crear');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-gray-600 text-2xl">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="bg-white rounded-2xl p-8 max-w-md shadow-xl">
          <p className="text-red-600 text-center">{error}</p>
          <Button onClick={loadChildren} variant="warning" fullWidth className="mt-4 rounded-lg">
            Reintentar
          </Button>
        </div>
      </div>
    );
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
            className="rounded-full shadow-lg"
          >
            Agregar Niño
          </Button>
        </div>

        {children.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl">
            <p className="text-gray-600 text-lg mb-4">No hay niños registrados</p>
            <Button
              onClick={handleCreate}
              variant="warning"
              className="rounded-full"
            >
              Registrar primer niño
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {children.map((child) => (
              <ChildCard
                key={child.id_nino || child.id}
                child={child}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}