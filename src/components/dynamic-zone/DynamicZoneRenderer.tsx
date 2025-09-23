'use client';

import React from 'react';
import { DynamicZone } from '@/types/event.types';
import RichText from './RichText';
import ImageGallery from './ImageGallery';
import VideoEmbed from './VideoEmbed';

interface DynamicZoneRendererProps {
  content: DynamicZone[];
  className?: string;
}

export default function DynamicZoneRenderer({ content, className = '' }: DynamicZoneRendererProps) {
  if (!content?.length) return null;

  return (
    <div className={`space-y-8 ${className}`}>
      {content.map((component, index) => {
        switch (component.__component) {
          case 'eventos.post-evento':
            return <RichText key={component.id || index} content={component.Texto} />;
          case 'eventos.galeria-de-imagenes':
            console.log('Gallery component data:', component);
            // Handle both direct images array and nested Gallery object
            const galleryImages = component.images || 
                               (component.Gallery && Array.isArray(component.Gallery) ? component.Gallery : []);
            console.log('Processed gallery images:', galleryImages);
            
            return (
              <div key={component.id || index} className="my-8">
                <h3 className="text-xl font-bold mb-4">{component.title || 'Galería de imágenes'}</h3>
                <ImageGallery 
                  images={galleryImages} 
                  title={component.title || 'Galería de imágenes'}
                />
                {galleryImages.length === 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">No se encontraron imágenes en la galería.</p>
                    <pre className="text-xs mt-2 overflow-auto p-2 bg-yellow-100 rounded">
                      {JSON.stringify(component, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          case 'eventos.video':
            // Check if Video is an object with a url property or directly the URL string
            const videoUrl = typeof component.Video === 'string' ? component.Video : component.Video?.url;
            return (
              <div key={component.id || index}>
                <VideoEmbed url={videoUrl} caption={component.caption} />
              </div>
            );
          default:
            return (
              <div key={component.id || index} className="text-gray-400">
                Componente no soportado: {component.__component}
              </div>
            );
        }
      })}
    </div>
  );
}