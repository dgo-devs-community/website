import { env } from "@/env";
import client from "./strapi-api-client";
import type { UpcomingEvent, PastEvent } from "../types/event.types";

const strapiUrl = env.STRAPI_API_URL;

export async function getHomePageEvents(): Promise<{
  upcomingEvents: UpcomingEvent[];
  pastEvents: PastEvent[];
}> {
  try {
    const { data: events } = await client.collection("eventos").find({
      fields: [
        "Titulo",
        "Descripcion",
        "Fecha",
        "Lugar",
        "Formulario",
        "Recurrente",
        "Tipo",
        "slug",
      ],
      populate: {
        Banner: true,
      },
      sort: ["Fecha:desc"],
    });

    if (!events) {
      console.error("Error fetching events: ");
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
        date: event.Recurrente
          ? event.FechaRecurrente
          : new Date(event.Fecha).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
        description: event.Descripcion,
        type: event.Tipo,
        formUrl: event.Formulario,
        image: event.Banner?.url
          ? `${strapiUrl}${event.Banner.url}`
          : "/LogoFlatAzul.png",
      };
      console.log(baseEvent.image);
      if (isUpcoming) {
        upcomingEvents.push(baseEvent);
      } else {
        pastEvents.push({ ...baseEvent, slug: event.slug });
      }
    }

    return { upcomingEvents, pastEvents };
  } catch (error) {
    console.error("Error in getHomePageEvents:", error);
    return { upcomingEvents: [], pastEvents: [] };
  }
}

export async function getEventBySlug(slug: string): Promise<PastEvent | null> {
  try {
    const { data: events } = await client.collection("eventos").find({
      filters: { slug: { $eq: slug } },
      populate: {
        Banner: {
          populate: "*",
        },
        BlogEvento: {
          on: {
            "eventos.post-evento": {
              populate: "*",
            },
            "eventos.video": {
              populate: "*",
            },
            "eventos.galeria-de-imagenes": {
              populate: {
                Gallery: {
                  populate: "*",
                },
              },
            },
          },
        },
      },
    });

    if (!events || events.length === 0) {
      console.error("Error fetching event by slug: ");
      return null;
    }

    const event = events[0];

    const populatedBlogEvento = event.BlogEvento?.map((component: any) => {
      if (
        component.__component === "eventos.galeria-de-imagenes" &&
        component.Gallery
      ) {
        return {
          ...component,
          Gallery: component.Gallery.map((image: any) => ({
            ...image,
            url: `${strapiUrl}${image.url}`,
            formats: image.formats
              ? {
                  thumbnail: image.formats.thumbnail
                    ? {
                        ...image.formats.thumbnail,
                        url: `${strapiUrl}${image.formats.thumbnail.url}`,
                      }
                    : undefined,
                  small: image.formats.small
                    ? {
                        ...image.formats.small,
                        url: `${strapiUrl}${image.formats.small.url}`,
                      }
                    : undefined,
                  medium: image.formats.medium
                    ? {
                        ...image.formats.medium,
                        url: `${strapiUrl}${image.formats.medium.url}`,
                      }
                    : undefined,
                  large: image.formats.large
                    ? {
                        ...image.formats.large,
                        url: `${strapiUrl}${image.formats.large.url}`,
                      }
                    : undefined,
                }
              : undefined,
          })),
        };
      }
      return component;
    });

    const formattedEvent = {
      id: event.id,
      title: event.Titulo || "Sin titulo",
      location: event.Lugar || "Sin lugar",
      date:
        new Date(event.Fecha).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || "Sin fecha",
      description: event.Descripcion || "Sin descripcion",
      type: event.Tipo || "Sin tipo",
      formUrl: event.Formulario || "Sin formulario",
      image: event.Banner?.url || "/LogoFlatAzul.png",
      slug: event.slug || "Sin slug",
      BlogEvento: populatedBlogEvento,
    };

    return formattedEvent;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}
