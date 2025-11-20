"use client";
import Image from "next/image";

export default function PageHeader({ 
  title, 
  imageSrc = "/family.svg", 
  imageAlt = "Imagen representativa" 
}) {
  return (
    <section className="w-full mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
        <div 
          className="col-span-2 flex items-center justify-center py-10 md:py-16 relative" 
          style={{background: 'linear-gradient(90deg, #FFCD00 0%, #FA5E60 100%)'}}
        >
          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            {title}
          </h1>
        </div>
        <div 
          className="flex items-center justify-center py-6 relative" 
          style={{backgroundColor: '#FA5E60'}}
        >
          <div className="relative w-full h-full min-h-[150px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}