import React from 'react';
import Image from 'next/image';
import { StrapiMedia } from '@/types/event.types';

interface ImageGalleryProps {
  images?: StrapiMedia[];
  className?: string;
  title?: string;
}

export default function ImageGallery({ 
  images = [], 
  className = '',
  title = 'Galería de imágenes'
}: ImageGalleryProps) {
  if (!images.length) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold">Sin imágenes</h3>
        <p className="text-gray-600">No hay imágenes disponibles para esta galería.</p>
      </div>
    );
  }
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => {
          // Use the largest available format or fallback to the original
          // URLs should already be absolute from the API processing
          const finalSrc = image.formats?.large?.url || 
                          image.formats?.medium?.url || 
                          image.formats?.small?.url || 
                          image.formats?.thumbnail?.url || 
                          image.url;
          
          return (
            <div
              key={image.id}
              className="relative aspect-video rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={finalSrc}
                alt={image.alternativeText || image.caption || 'Imagen de galería'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}