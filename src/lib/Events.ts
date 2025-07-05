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
      location: "Starbucks Punto Cero DT",
      date: "Todos los miércoles",
      description:
        "¿Trabajas en remoto? Sal de casa y vamonos a Starbucks a trabajar juntos.",
    },
    /* Quitar el comment cuando se agregue la v5 de las lightning talks
      {
      id: 2,
      title: "Lightning Talks v4.0",
      image: "/TalksV4.png",
      location: "1816 Coffee and brunch",
      date: "25 de Junio, 2025",
      description:
        "Ideas rápidas, impacto inmediato. Únete a nuestras charlas tecnológicas.",
    },
    */
    {
      id: 3,
      title: "Meet & Greet 4.0",
      image: "/LogoFlatAzul.png",
      location: "Por definir",
      date: "18 de Julio, 2025",
      description:
        "Ambiente relajado. Conoce a otros miembros de la comunidad y disfruta de una bebida.",
    },
    {
      id: 4,
      title: "DgoTecHub Fest 2025",
      image: "/LogoFlatAzul.png",
      location: "Por definir",
      date: "16 de Agosto, 2025",
      description:
        "Porque no todo es código, únete a nuestra fiesta. Dj, Norteño y algo más.",
    }
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
      location: "Core Centro Revueltas",
      date: "18 de Octubre, 2024",
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
      date: "27 de Noviembre, 2024",
      description:
        "Un evento de charlas rápidas que inspiró a muchos a compartir sus conocimientos y experiencias.",
      image: "/conference.jpg",
      slug: "charla-desarrollo-web-moderno",
      gallery: [],
    },
    {
      id: 6,
      title: "Lightning Talks Vol. 2: Habilidades blandas",
      location: "Aroma Café",
      date: "5 de Marzo, 2025",
      description:
        "Un enfoque en el desarrollo de habilidades blandas, cruciales para el éxito profesional.",
      image: "/lt3.jpg",
      slug: "charla-desarrollo-web-moderno",
      gallery: [],
    },
    {
      id: 7,
      title: "Lightning Talks Vol. 3: De todo un poco",
      location: "Boscoffee. Independencia #334",
      date: "30 de Abril, 2025",
      description:
        "Desde el impacto de la calidad del software, pasando por la influencia femenina en el mundo tech, hasta la importancia de hacer que el código se sienta humano",
      image: "/TalksV3-2.webp",
      slug: "charlas-tercera-edicion",
      gallery: [],
    },
    {
      id: 8,
      title: "Lightning Talks Vol. 4: De juegos, riesgos y código",
      location: "1816 Coffee and brunch",
      date: "25 de Junio, 2025",
      description:
        "Tres charlas, una misión: entender como el juego, la estrategia y el proceso dan forma al desarrollo de talento y software en la era digital.",
      image: "/LT4-portada-evento.webp",
      slug: "charlas-tercera-edicion",
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
  return limit ? data.pastEvents.slice(-limit).reverse() : data.pastEvents;
}

export async function getPastEventBySlug(slug: string) {
  const data = await getEvents();
  return data.pastEvents.find((event) => event.slug === slug);
}
