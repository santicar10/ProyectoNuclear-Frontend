"use client";
import VoluntariadoForm from "@/app/components/common/forms/VoluntariadoForm";
import PageHeader from "@components/common/PageHeader";

export default function VoluntariadoPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <PageHeader 
        title="¿QUIERES SER VOLUNTARIO?" 
        imageSrc="/family.svg"
        imageAlt="Voluntariado"
      />

      <div className="w-full max-w-4xl px-6 py-10">
        <VoluntariadoForm />
      </div>
    </main>
  );
}