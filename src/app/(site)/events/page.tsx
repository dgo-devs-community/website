import PastEventsCard from "@/components/site/pastevents/PastEventsCard";
import { getHomePageEvents } from "@/lib/Events";

export default async function EventsPage() {
  const { upcomingEvents } = await getHomePageEvents();
  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-8 md:px-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Próximos eventos
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            ¡Únete a nosotros y descubre los próximos eventos en el mundo de la
            tecnología!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <PastEventsCard
              key={event.id}
              image={event.image}
              title={event.title}
              description={event.description}
              location={event.location}
              date={event.date}
              formUrl={event.formUrl}
              type={event.type}
            />
          ))}
        </div>
      </div>
    </>
  );
}
