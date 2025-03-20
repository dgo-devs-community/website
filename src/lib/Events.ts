// Definimos los tipos para nuestros eventos
export interface UpcomingEvent {
    id: number
    image: string
    title: string
    location: string
    date: string
    description: string
  }
  
  export interface PastEvent extends UpcomingEvent {
    image: string
    gallery: string[] // Array de URLs de imágenes para la galería
    slug: string // URL amigable para el evento
  }
  
  // Datos de eventos en memoria
  const eventsData = {
    upcomingEvents: [
      {
        id: 1,
        title: "Networking",
        image: "https://placehold.co/250x150",
        location: "Starbucks Durango",
        date: "Todos los domingos, 5pm",
        description: "¿Trabajas en remoto? Únete para conocer en los proyectos mientras compartes espacio con otros.",
      },
      {
        id: 2,
        title: "Lighting Talks",
        image: "https://placehold.co/250x150",
        location: "Pendiente",
        date: "Fecha por confirmar",
        description: "Ideas rápidas, impacto inmediato. Únete a nuestras charlas tecnológicas.",
      },
      {
        id: 3,
        title: "Workshop: Introducción a React",
        image: "https://placehold.co/250x150",
        location: "Coworking Space Durango",
        date: "15 de Abril, 2024 - 6pm",
        description: "Aprende los fundamentos de React y crea tu primera aplicación en este taller práctico.",
      },
      {
        id: 4,
        title: "Hackathon Durango 2024",
        image: "https://placehold.co/250x150",
        location: "Universidad Tecnológica",
        date: "20-21 de Mayo, 2024",
        description: "48 horas para crear soluciones innovadoras a problemas reales. ¡Inscríbete ya!",
      },
      {
        id: 5,
        title: "Tech Meetup",
        image: "https://placehold.co/250x150",
        location: "Centro de Convenciones",
        date: "10 de Junio, 2024 - 7pm",
        description: "Charlas sobre las últimas tendencias en Inteligencia Artificial y Machine Learning.",
      },
    ],
    pastEvents: [
      {
        id: 1,
        title: "Networking en Starbucks",
        location: "Starbucks Durango",
        date: "15 de Enero, 2024",
        description: "Primer encuentro de networking para profesionales tech en Durango.",
        image: "https://placehold.co/250x150",
        slug: "networking-starbucks-vol-1",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        id: 2,
        title: "Tech Meetup 2023",
        location: "Coworking Durango",
        date: "10 de Diciembre, 2023",
        description: "Encuentro anual de la comunidad tech con charlas y networking.",
        image: "https://placehold.co/250x150",
        slug: "tech-meetup-2023",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        id: 3,
        title: "Workshop: Git y GitHub",
        location: "Universidad Tecnológica",
        date: "5 de Noviembre, 2023",
        description: "Taller práctico sobre control de versiones con Git y GitHub.",
        image: "https://placehold.co/250x150",
        slug: "workshop-git-github",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        id: 4,
        title: "Hackathon Durango 2023",
        location: "Centro de Convenciones",
        date: "20-21 de Octubre, 2023",
        description: "48 horas de innovación y desarrollo de soluciones tecnológicas.",
        image: "https://placehold.co/250x150",
        slug: "hackathon-durango-2023",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        id: 5,
        title: "Charla: Desarrollo Web Moderno",
        location: "Biblioteca Central",
        date: "15 de Septiembre, 2023",
        description: "Introducción a las tecnologías modernas de desarrollo web.",
        image: "https://placehold.co/250x150",
        slug: "charla-desarrollo-web-moderno",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
    ],
  }
  
  export async function getEvents() {
    // Devolver directamente los datos definidos en este archivo
    return eventsData
  }
  
  export async function getUpcomingEvents(limit?: number) {
    const data = await getEvents()
    return limit ? data.upcomingEvents.slice(0, limit) : data.upcomingEvents
  }
  
  export async function getPastEvents(limit?: number) {
    const data = await getEvents()
    return limit ? data.pastEvents.slice(0, limit) : data.pastEvents
  }
  
  export async function getPastEventBySlug(slug: string) {
    const data = await getEvents()
    return data.pastEvents.find((event) => event.slug === slug)
  }
  
  