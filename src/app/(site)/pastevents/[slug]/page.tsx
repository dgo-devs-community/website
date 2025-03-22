import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getPastEventBySlug } from "@/lib/Events";
import Image from "next/image";

interface EventGalleryProps {
  params: Promise<{ slug: string }>;
}

export default async function EventGallery({ params }: EventGalleryProps) {
  const { slug } = await params;
  const event = await getPastEventBySlug(slug);

  if (!event) {
    return (
      <>
        <h1>Evento no encontrado</h1>
      </>
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

      <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        <div className="mb-8">
          <h2 className="text-xl">Acerca del evento</h2>
          <p className="text-gray-700 md:text-lg">{event.description}</p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          Galería de imágenes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.gallery.length < 1 ? (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold">Sin imágenes</h3>
              <div className="h-32" />
              <p>Se nos fue la mano con la fiesta y no tomamos fotos 😅</p>
            </div>
          ) : (
            event.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-gray-300"
              >
                <Image
                  src={image}
                  alt={event.title}
                  fill
                  className="object-cover "
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
