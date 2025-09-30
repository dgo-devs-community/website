// Definimos los tipos para nuestros eventos
export interface UpcomingEvent {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

export interface PastEvent extends UpcomingEvent {
  image: string;
  gallery: string[]; // Array de URLs de imágenes para la galería
  slug: string; // URL amigable para el evento
}

// Datos de eventos en memoria
// Para eventos futuros, dejo fijos los de coworking y club de conversación en inglés. 
const eventsData = {
  upcomingEvents: [
    {
      id: 1,
      title: "Co-working Starbucks",
      image: "/events/coworking/starbuckks.webp",
      location: "Starbucks Punto Cero DT",
      date: "Todos los miércoles, 9:30 am",
      description:
        "¿Trabajas en remoto? Sal de casa y vamonos a Starbucks a trabajar juntos.",
    },
    {
      id: 2,
      title: "English conversation club",
      image: "/events/english-club/temp-flyer.jpg",
      location: "Nube Coffee Lounge",
      date: "Wednesday September 10, 2025",
      description:
        "Practice your English, meet new people, and have fun!",
    },
    {
      id: 3,
      title: "Lightning Talks v6.0",
      image: "/events/lightning/LT6-save-date.png",
      location: "1816 Coffee and brunch",
      date: "24 de Septiembre, 2025",
      description:
        "Ideas rápidas, impacto inmediato. Únete a nuestras charlas tecnológicas.",
    },
  ],
  pastEvents: [
    {
      id: 1,
      title: "Networking en Starbucks",
      location: "Starbucks Durango",
      date: "Todos los miércoles",
      description:
        "¿Trabajas en remoto? Sal de casa y vamonos a Starbucks a trabajar juntos.",
      image: "/events/coworking/starbuckks.webp",
      slug: "networking-starbucks-vol-1",
      gallery: ["/events/coworking/starbuckks.webp", "/events/coworking/coworking.jpg"],
    },
    {
      id: 2,
      title: "Meet & Greet 1.0",
      location: "Core Centro Revueltas",
      date: "18 de Octubre, 2024",
      description:
        "El evento inaugural que dio vida a la comunidad DgoTecHub, donde se forjaron las primeras conexiones.",
      image: "/techmetuup.jpg",
      slug: "tech-meetup-1",
      gallery: ["/events/meet-n-greets/Meet&Greet1.jpg"],
    },
    {
      id: 3,
      title: "Meet & Greet 2.0",
      location: "Boscoffee",
      date: "10 de Enero, 2024",
      description:
        "Un segundo encuentro que celebró el crecimiento de la comunidad, con más participantes y entusiasmo.",
      image: "/events/meet-n-greets/meet-greet2.jpg",
      slug: "meet-greet-2",
      gallery: ["/events/meet-n-greets/meet-greet2.jpg",],
    },
    {
      id: 4,
      title: "Meet & Greet 3.0",
      location: "Bruné Café",
      date: "10 de Febrero, 2024",
      description:
        "La tercera edición que reafirmó el compromiso de la comunidad por el aprendizaje y la colaboración.",
      image: "/mg1.jpg",
      slug: "meet-greet-3",
      gallery: [],
    },
    {
      id: 5,
      title: "Lightning Talks Vol. 1: El inicio",
      location: "Coworking Space Durango",
      date: "27 de Noviembre, 2024",
      description:
        "Un evento de charlas rápidas que inspiró a muchos a compartir sus conocimientos y experiencias.",
      image: "/events/lightning/conference.jpg",
      slug: "charla-desarrollo-web-moderno",
      gallery: ["/events/lightning/conference.jpg", "/events/lightning/LT1-asistentes.jpg"],
    },
    {
      id: 6,
      title: "Lightning Talks Vol. 2: Habilidades blandas",
      location: "Aroma Café",
      date: "5 de Marzo, 2025",
      description:
        "Un enfoque en el desarrollo de habilidades blandas, cruciales para el éxito profesional.",
      image: "/events/lightning/LightningTalks1.jpg",
      slug: "charlas-segunda-edicion",
      gallery: ["/events/lightning/LightningTalks1.jpg", "/events/lightning/lightning-talks.jpg", "/events/lightning/lt3.jpg"],
    },
    {
      id: 7,
      title: "Lightning Talks Vol. 3: De todo un poco",
      location: "Boscoffee. Independencia #334",
      date: "30 de Abril, 2025",
      description:
        "Desde el impacto de la calidad del software, pasando por la influencia femenina en el mundo tech, hasta la importancia de hacer que el código se sienta humano",
      image: "/events/lightning/TalksV3-2.webp",
      slug: "charlas-tercera-edicion",
      gallery: ["/events/lightning/TalksV3-2.webp"],
    },
    {
      id: 8,
      title: "Lightning Talks Vol. 4: De juegos, riesgos y código",
      location: "1816 Coffee and brunch",
      date: "25 de Junio, 2025",
      description:
        "Tres charlas, una misión: entender como el juego, la estrategia y el proceso dan forma al desarrollo de talento y software en la era digital.",
      image: "/events/lightning/LT4-portada-evento.webp",
      slug: "charlas-cuarta-edicion",
      gallery: ["/events/lightning/LT4-portada-evento.webp", "/events/lightning/LT4-participant.jpg"],
    },
    {
      id: 9,
      title: "Meet & Greet 4.0",
      location: "1816 Coffee and brunch",
      date: "18 de Julio, 2025",
      description:
        "Ambiente relajado, conoce a los miembros de la comunidad. Café o cerveza, lo que tu prefieras.",
      image: "/LogoFlatAzul.png",
      slug: "meet-greet-4",
      gallery: [],
    },
    {
      id: 10,
      title: "Lightning Talks Vol. 5: Aprender, crear y protegerse en la era digital",
      location: "1816 Coffee and brunch",
      date: "30 de Julio, 2025",
      description:
        "De estrategias para aprender mejor, a los secretos de la IA, pasando por programar sin programar y la seguridad web. Una edición que mezcla curiosidad, técnica y experiencias reales para inspirarte.",
      image: "/events/lightning/lt5-flyer.png",
      slug: "charlas-quinta-edicion",
      gallery: ["/events/lightning/lt5-flyer.png", "/events/lightning/LT5-participantes.jpg"],
    },
    {
      id: 11,
      title: "Taller: Impuestos para Vibe Coders y Greybeards",
      location: "1816 Coffee and brunch",
      date: "27 de Agosto, 2025",
      description:
        "¿Trabajas de  manera remota? ¿Eres freelance y no sabes cómo debes pagar tus impuestos? El taller 'Impuestos para Vibe Coders' es para tí!",
      image: "/events/taxes/Flyer-Tax.jpg",
      slug: "taller-impuestos-primera-edicion",
      gallery: ["/events/taxes/Flyer-Tax.jpg", "/events/taxes/tax-participant.jpg"],
    },
    // When adding new entries to the past events use the following template. Remember to increase by 1 the id, and update the slug and image.
    // Suggestions: look at previous events for clues of slug, desciption and images location, e.g. lightning talks 
    /* 
    {
      id: 12,
      title: "Event title",
      location: "Event location",
      date: "Event date",
      description:
        "Event description",
      image: "/event-image.webp",
      slug: "event-slug",
      gallery: [],
    }
    */
  ],
};

export async function getEvents() {
  // Devolver directamente los datos definidos en este archivo
  return eventsData;
}

export async function getUpcomingEvents(limit?: number) {
  const data = await getEvents();
  return limit ? data.upcomingEvents.slice(0, limit) : data.upcomingEvents;
}

export async function getPastEvents(limit?: number) {
  const data = await getEvents();
  return limit ? data.pastEvents.slice(-limit).reverse() : data.pastEvents;
}

export async function getPastEventBySlug(slug: string) {
  const data = await getEvents();
  return data.pastEvents.find((event) => event.slug === slug);
}
