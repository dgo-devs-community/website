const apiUrl = process.env.PUBLIC_STRAPI_API_URL;
const apiToken = process.env.STRAPI_API_TOKEN;

// Interface for the raw event data from Strapi
export interface StrapiEvent {
  id: number;
  Titulo: string;
  slug: string;
  Recurrente: boolean;
  FechaRecurrente: string;
  Fecha: string;
  Lugar: string;
  Descripcion: string;
  Banner?: {
    url: string;
  };
  Tipo?: string;
  Formulario?: string;
}

// Defines the types for our events
export interface UpcomingEvent {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  description: string;
  type?: string;
  formUrl?: string;
}

export interface PastEvent extends UpcomingEvent {
  gallery: string[]; // Array of image URLs for the gallery
  slug: string; // User-friendly URL for the event
}

// In-memory cache for events to avoid repeated API calls
let cachedEvents: { upcomingEvents: UpcomingEvent[]; pastEvents: PastEvent[] } | null = null;

export async function getEvents(): Promise<{ upcomingEvents: UpcomingEvent[]; pastEvents: PastEvent[] }> {
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    const response = await fetch(`${apiUrl}/api/eventos?populate=*&sort=Fecha:asc`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events from Strapi: ${response.statusText}`);
    }

    const { data }: { data: StrapiEvent[] } = await response.json();

    const upcomingEvents: UpcomingEvent[] = [];
    const pastEvents: PastEvent[] = [];
    const now = new Date();

    for (const event of data) {
      const attributes = event;

      const formattedEvent: UpcomingEvent = {
        id: event.id,
        title: attributes.Titulo,
        location: attributes.Lugar,
        date: attributes.Recurrente
          ? attributes.FechaRecurrente
          : new Date(attributes.Fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
        description: attributes.Descripcion,
        image: attributes.Banner?.url
          ? attributes.Banner.url.startsWith('http')
            ? attributes.Banner.url
            : `${apiUrl}${attributes.Banner.url}`
          : "/LogoFlatAzul.png", // Fallback for events without a banner
        type: attributes.Tipo,
        formUrl: attributes.Formulario,
      };

      if (attributes.Recurrente) {
        upcomingEvents.push(formattedEvent);
      } else {
        const eventDate = new Date(attributes.Fecha);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the beginning of the day

        if (eventDate >= today) {
          upcomingEvents.push(formattedEvent);
        } else {
          pastEvents.push({ ...formattedEvent, slug: attributes.slug, gallery: [] });
        }
      }
    }

    cachedEvents = { upcomingEvents, pastEvents };
    return cachedEvents;

  } catch (error) {
    console.error("Error fetching or processing events:", error);
    // Return empty arrays as a fallback to prevent crashes
    return { upcomingEvents: [], pastEvents: [] };
  }
}

export async function getUpcomingEvents(limit?: number) {
  const data = await getEvents();
  return limit ? data.upcomingEvents.slice(0, limit) : data.upcomingEvents;
}

export async function getPastEvents(limit?: number) {
  const data = await getEvents();
  const reversedPastEvents = [...data.pastEvents].reverse();
  return limit ? reversedPastEvents.slice(0, limit) : reversedPastEvents;
}

export async function getPastEventBySlug(slug: string) {
  const data = await getEvents();
  return data.pastEvents.find((event) => event.slug === slug);
}
