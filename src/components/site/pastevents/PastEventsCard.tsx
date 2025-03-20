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
}

export default function PastEventsCard({
  image,
  title,
  description,
  location,
  slug,
  date,
}: PastEventsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ">
      <div className="relative h-64">
        <Image src={image || ""} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-blue-600 text-sm">
          {date} - {location}
        </p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="w-full flex justify-center mb-5">
        <Button asChild variant="outline" className="w-11/12 text-blue-500 border border-blue-500 md:text-base  hover:bg-blue-500 hover:text-white">
            {slug ? <Link href={`/pastevents/${slug}`}>Ver Galería</Link> : <Link target="_blank" href="https://discord.gg/G4RsQJwuP8">Quiero asistir</Link>}
            
        </Button>
      </div>
    </div>
  );
}
