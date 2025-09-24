// Tipos para manejo de medios en Strapi
export interface StrapiMedia {
  id: number;
  name: string;
  url: string;
  alternativeText: string;
  caption: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

// Rich text block interfaces for Strapi rich text editor
export interface RichTextBlock {
  type: string;
  children?: (TextNode | RichTextBlock)[];
  level?: number;
  format?: string;
  url?: string;
  newTab?: boolean;
  language?: string;
  code?: string;
  [key: string]: unknown;
}

export interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  linkType?: string;
  url?: string;
  newTab?: boolean;
}

export interface Block{
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  linkType?: string;
  url?: string;
  newTab?: boolean;
}
// Interfaces para componentes de zona dinámica
export interface DynamicZoneComponent {
  __component: string;
  id: number;
}

export interface RichTextComponent extends DynamicZoneComponent {
  __component: 'eventos.post-evento';
  Texto: RichTextBlock[];
}

export interface ImageGalleryComponent extends DynamicZoneComponent {
  __component: 'eventos.galeria-de-imagenes';
  Gallery: StrapiMedia[];
  title?: string;
}

export interface QuoteComponent extends DynamicZoneComponent {
  __component: 'eventos.bloque-de-cita';
  text: string;
  author?: string;
}

export interface VideoEmbedComponent extends DynamicZoneComponent {
  __component: 'eventos.video';
  Video: {
    url: string;
    oembed?: unknown;
  };
  caption?: string;
}

export type DynamicZone =
  | RichTextComponent
  | ImageGalleryComponent
  | QuoteComponent
  | VideoEmbedComponent;

// Interface para los datos crudos de eventos desde Strapi
export interface StrapiEvent {
  id: number;
  Titulo: string;
  slug: string;
  Recurrente: boolean;
  FechaRecurrente: string;
  Fecha: string;
  Lugar: string;
  Descripcion: string;
  Banner?: StrapiMedia;
  Tipo?: string;
  Formulario?: string;
  BlogEvento?: DynamicZone[];
}

// Tipos para los eventos en la aplicación
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
  slug: string;
  BlogEvento?: DynamicZone[];
}
