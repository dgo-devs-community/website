import Community from "@/components/site/home/Community";
import Events from "@/components/site/home/Events";
import Hero from "@/components/site/home/Hero";
import PastEvents from "@/components/site/home/Past-Events";
import UpcomingEvents from "@/components/site/home/Upcoming-events";
import PartyPromo from "@/components/site/home/PartyPromo";
import EventProgressMeter from "@/components/site/EventProgressMeter";
import LiveActivityFeed from "@/components/site/LiveActivityFeed";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Promocional de la fiesta */}
      <PartyPromo />

      {/* Medidor de progreso del evento */}
      <section className="py-12 bg-gray-50">
        <EventProgressMeter />
      </section>

      <div className="md:max-w-6xl md:mx-auto md:grid md:grid-cols-12 md:gap-8 md:py-12 md:px-0">
        {/* Left Column on Desktop / Main Column on Mobile */}
        <div className="md:col-span-7">
          <Community />
          <Events />
          {/* Mostrar solo los últimos 2 eventos pasados */}
          <PastEvents limit={2} />
        </div>

        {/* Right Column on Desktop / Bottom Section on Mobile */}
        <div className="md:col-span-5 space-y-6">
          {/* Feed de actividad en vivo */}
          <div className="px-4 md:px-0">
            <LiveActivityFeed />
          </div>

          {/* Mostrar solo los últimos 3 próximos eventos */}
          <UpcomingEvents limit={3} />
        </div>
      </div>
    </>
  );
}
