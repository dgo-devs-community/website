import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getEventBySlug } from "@/lib/Events";
import DynamicZoneRenderer from "@/components/dynamic-zone/DynamicZoneRenderer";

interface EventGalleryProps {
  params: Promise<{ slug: string }>;
}

export default async function EventGallery({ params }: EventGalleryProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  console.log(event);
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Evento no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, no pudimos encontrar el evento que estás buscando.
          </p>
          <Button asChild>
            <Link href="/pastevents">Volver a eventos pasados</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <Button
              asChild
              size="sm"
              className="text-white hover:text-white hover:border-b hover:border-white rounded-none bg-blue-900 hover:bg-blue-900 w-fit"
            >
              <Link href="/pastevents">
                <ChevronLeft className="h-6 w-6 -ml-3 " />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
          </div>
          <p className="text-lg opacity-90">
            {event.date} - {event.location}
          </p>
        </div>
      </div>
      {/* Dynamic Zone Renderer */}
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        {event.BlogEvento && event.BlogEvento.length > 0 ? (
          <DynamicZoneRenderer content={event.BlogEvento} />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Acerca del evento</h2>
              <p className="text-gray-700 md:text-lg">{event.description}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Sin galería disponible</h3>
              <p className="text-gray-600">
                Se nos fue la mano con la fiesta y no tomamos fotos 😅
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
