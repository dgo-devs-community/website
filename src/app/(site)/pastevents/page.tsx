import PastEventsCard from "@/components/site/pastevents/PastEventsCard";
import { Card } from "@/components/ui/card";
import { getPastEvents } from "@/lib/Events";

export default async function NamePage() {
    const pastEvents = await getPastEvents();
  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Eventos pasados
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Revive los mejores momentos de nuestra comunidad tech a traves de nuestros eventos pasados.
          </p>
        </div>
      </div>


      <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
                <PastEventsCard key={event.id} 
                image={event.image}
                title={event.title}
                description={event.description}
                location={event.location}
                slug={event.slug}
                date={event.date}
                />

            ))}
        </div>

      </div>
    </>
  );
}