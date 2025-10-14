import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PastEventsCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  slug?: string;
  date: string;
  formUrl?: string;
  type?: string;
}

export default function PastEventsCard({
  image,
  title,
  description,
  location,
  slug,
  date,
  formUrl,
  type,
}: PastEventsCardProps) {
  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-64">
        <Image src={image || ""} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          {type && (
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mb-2 ${
                {
                  Taller: "bg-blue-100 text-blue-800",
                  Charlas: "bg-green-100 text-green-800",
                  Meetup: "bg-purple-100 text-purple-800",
                }[type] || "bg-gray-100 text-gray-800"
              }`}
            >
              {type}
            </span>
          )}
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-blue-600 text-sm mb-2">
            {date} - {location}
          </p>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="w-full flex justify-center mt-4 pt-4">
          {slug ? (
            <Button
              asChild
              variant="outline"
              className="w-11/12 text-blue-500 border border-blue-500 md:text-base hover:bg-blue-500 hover:text-white"
            >
              <Link href={`/pastevents/${slug}`}>Ver Galería</Link>
            </Button>
          ) : formUrl ? (
            <Button
              asChild
              variant="outline"
              className="w-11/12 text-blue-500 border border-blue-500 md:text-base hover:bg-blue-500 hover:text-white"
            >
              <Link target="_blank" href={formUrl}>
                Quiero asistir
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
