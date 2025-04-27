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
const eventsData = {
  upcomingEvents: [
    {
      id: 1,
      title: "Co-working Starbucks",
      image: "/starbuckks.webp",
      location: "Starbucks Durango",
      date: "Todos los miércoles",
      description:
        "¿Trabajas en remoto? Sal de casa y vamonos a Starbucks a trabajar juntos.",
    },
    {
      id: 2,
      title: "Lightning Talks v3.0",
      image: "/techmetuup.jpg",
      location: "Boscoffee. Independencia #334",
      date: "30 de Abril, 2025",
      description:
        "Ideas rápidas, impacto inmediato. Únete a nuestras charlas tecnológicas.",
    },
    {
      id: 3,
      title: "Meet & Greet 4.0",
      image: "/LogoFlatAzul.png",
      location: "Cafe",
      date: "15 de Abril, 2025",
      description:
        "La cuarta edición de nuestro evento insignia, con más sorpresas y aprendizaje. No te lo pierdas.",
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
      image: "/lightning-talks.jpg",
      slug: "networking-starbucks-vol-1",
      gallery: [],
    },
    {
      id: 2,
      title: "Meet & Greet 1.0",
      location: "Cafe",
      date: "10 de Diciembre, 2023",
      description:
        "El evento inaugural que dio vida a la comunidad DgoTecHub, donde se forjaron las primeras conexiones.",
      image: "/techmetuup.jpg",
      slug: "tech-meetup-2023",
      gallery: [],
    },
    {
      id: 3,
      title: "Meet & Greet 2.0",
      location: "Cafe",
      date: "10 de Enero, 2024",
      description:
        "Un segundo encuentro que celebró el crecimiento de la comunidad, con más participantes y entusiasmo.",
      image: "/LightningTalks1.jpg",
      slug: "tech-meetup-2023",
      gallery: ["LightningTalks1.jpg", "LightningTalks2.jpg"],
    },
    {
      id: 4,
      title: "Meet & Greet 3.0",
      location: "Cafe",
      date: "10 de Febrero, 2024",
      description:
        "La tercera edición que reafirmó el compromiso de la comunidad por el aprendizaje y la colaboración.",
      image: "/mg1.jpg",
      slug: "tech-meetup-2023",
      gallery: [],
    },
    {
      id: 5,
      title: "Lightning Talks Vol. 1: El inicio",
      location: "Coworking Space Durango",
      date: "15 de Septiembre, 2023",
      description:
        "Un evento de charlas rápidas que inspiró a muchos a compartir sus conocimientos y experiencias.",
      image: "/conference.jpg",
      slug: "charla-desarrollo-web-moderno",
      gallery: [],
    },
    {
      id: 5,
      title: "Lightning Talks Vol. 2: Habilidades blandas",
      location: "Aroma Café",
      date: "15 de Septiembre, 2023",
      description:
        "Un enfoque en el desarrollo de habilidades blandas, cruciales para el éxito profesional.",
      image: "/lt3.jpg",
      slug: "charla-desarrollo-web-moderno",
      gallery: [],
    },
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
  return limit ? data.pastEvents.slice(0, limit) : data.pastEvents;
}

export async function getPastEventBySlug(slug: string) {
  const data = await getEvents();
  return data.pastEvents.find((event) => event.slug === slug);
}
