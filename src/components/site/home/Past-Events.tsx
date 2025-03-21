
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPastEvents } from "@/lib/Events";
import { ChevronRight } from "lucide-react";
import PastEventsCard from "../pastevents/PastEventsCard";

interface PastEventsProps {
  limit?: number;
}

export default async function PastEvents({ limit = 2 }: PastEventsProps) {
  const pastEvents = await getPastEvents(limit);

  return (
    <section className="bg-white p-6 md:p-0 md:mb-12">
      <div className="flex items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">Pasados</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 mb-4 md:mb-6">
        {pastEvents.map((event) => (
          <PastEventsCard
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
            location={event.location}
            slug={event.slug}
            date={event.date}
          />
        ))}
      </div>

      <div className="w-full flex justify-center md:justify-start">
        <Button
          variant="link"
          className="text-blue-900 md:text-lg cursor-pointer"
          asChild
        >
          <Link href="/pastevents">
            Ver galería completa
            <ChevronRight className="h-4 w-4 ml-1 md:h-5 md:w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
