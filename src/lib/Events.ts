import client from './strapi-api-client';
import type {
  StrapiMedia,
  StrapiEvent,
  UpcomingEvent,
  PastEvent,
  DynamicZone,
  DynamicZoneComponent,
  RichTextComponent,
  ImageGalleryComponent,
  QuoteComponent,
  VideoEmbedComponent
} from '../types/event.types';

const strapiUrl = process.env.PUBLIC_STRAPI_API_URL;

export async function getHomePageEvents(): Promise<{ upcomingEvents: UpcomingEvent[]; pastEvents: PastEvent[] }> {
  try {
    const { data: events } = await client.collection('eventos').find({
      fields: ['Titulo', 'Descripcion', 'Fecha', 'Lugar', 'Formulario', 'Recurrente', 'slug'],
      populate: {
        Banner: true,
      },
      sort: ['Fecha:desc'],
    });

    if (!events) {
      console.error('Error fetching events: ');
      return { upcomingEvents: [], pastEvents: [] };
    }

    const upcomingEvents: UpcomingEvent[] = [];
    const pastEvents: PastEvent[] = [];
    const now = Date.now();

    for (const event of events) {
      const isRecurring = event.Recurrente;
      const isUpcoming = isRecurring || new Date(event.Fecha).getTime() >= now;

      const baseEvent = {
        id: event.id,
      title: event.Titulo,
      location: event.Lugar,
      date: event.Recurrente ? event.FechaRecurrente
      : new Date(event.Fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      description: event.Descripcion,
      type: event.Tipo,
      formUrl: event.Formulario,
      image: `${strapiUrl}${event.Banner.url}` || "/LogoFlatAzul.png"
    };

    if (isUpcoming) {
      upcomingEvents.push(baseEvent);
    } else {
      pastEvents.push({ ...baseEvent, slug: event.slug });
    }
  }

  return { upcomingEvents, pastEvents: pastEvents.slice(0, 2)};

  } catch (error) {
  console.error('Error in getHomePageEvents:', error);
  return { upcomingEvents: [], pastEvents: [] };
  }
}

export async function getEventBySlug(slug: string): Promise<PastEvent | null> {
  try {
    const { data: events } = await client.collection('eventos').find({
      filters: { slug: { $eq: slug } },
      populate: {
        Banner: { populate: '*' },
        BlogEvento: {
          populate: {
            // This populates the 'galeria-de-imagenes' component
            'eventos.galeria-de-imagenes': {
              populate: {
                // This populates the 'images' relation within that component
                images: {
                  // This is the key: populate all fields of the image, including 'formats'
                  fields: ['url', 'name', 'alternativeText', 'caption', 'formats']
                }
              }
            },
            'eventos.video': { populate: '*' },
            'eventos.post-evento': { populate: '*' },
            'eventos.hero-image': { populate: '*' },
          }
        }
      }
    });


    if (!events || events.length === 0) {
      console.error('Error fetching event by slug: ');
      return null;
    }

    const event = events[0];

    const formattedEvent = {
      id: event.id,
      title: event.Titulo || 'Sin titulo',
      location: event.Lugar || 'Sin lugar',
      date: event.Fecha || 'Sin fecha',
      description: event.Descripcion || 'Sin descripcion',
      type: event.Tipo || 'Sin tipo',
      formUrl: event.Formulario || 'Sin formulario',
      image: event.Banner?.url || '/LogoFlatAzul.png',
      slug: event.slug || 'Sin slug',
      BlogEvento: event.BlogEvento
    };

    return formattedEvent;

  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
    }
}
