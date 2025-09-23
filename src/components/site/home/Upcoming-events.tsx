import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, ChevronRight } from "lucide-react";
import { getHomePageEvents } from "@/lib/Events";

interface UpcomingEventsProps {
  limit?: number;
}

export default async function UpcomingEvents({
  limit = 3,
}: UpcomingEventsProps) {
  const { upcomingEvents } = await getHomePageEvents();
  const limitedUpcomingEvents = upcomingEvents.slice(0, limit);

  return (
    <section className="bg-white p-6 md:bg-gray-50 md:p-8 md:rounded-lg md:sticky md:top-24">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">
          Próximos eventos
        </h2>
        <Link href="/events">
          <Button variant="link" className="text-blue-900 p-0 cursor-pointer">
            Ver todos
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {limitedUpcomingEvents.map((event) => (
          <Card key={event.id} className="border-gray-200 md:shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="font-medium md:text-lg">{event.title}</h3>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-start mb-2 md:mb-3">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
              <p className="text-sm md:text-base">{event.description}</p>
            </CardContent>
            <CardFooter className="w-full">
              {event.formUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full text-blue-500 border border-blue-500 md:text-base cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  <Link target="_blank" href={event.formUrl}>
                    Quiero asistir
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button
          asChild
          variant="link"
          className="text-blue-900 md:text-lg cursor-pointer"
        >
          <Link href="/events">
            Ver agenda completa{" "}
            <ChevronRight className="h-4 w-4 ml-1 md:h-5 md:w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
