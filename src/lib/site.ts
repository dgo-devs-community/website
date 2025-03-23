import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Github,
  Disc,
} from "lucide-react";

// Tipos para las redes sociales
export interface SocialLink {
  name: string;
  url: string;
  icon:
    | typeof Facebook
    | typeof Instagram
    | typeof Linkedin
    | typeof Youtube
    | typeof Twitter
    | typeof Github
    | typeof Disc;
}

// Tipos para los miembros
export interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// Información del sitio
export const siteConfig = {
  name: "DgoTecHub Community",
  description: "La comunidad Tech líder y más grande de Durango.",
  url: "https://www.dgotechub.com",
  logo: "/logo.webp",
  email: "Envianos un DM en Instagram!",
  phone: "",
  address: "Durango, México",

  // Redes sociales
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/dgotechub-community",
      icon: Linkedin,
    },
    {
      name: "YouTube",
      url: "/",
      icon: Youtube,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/dgotechub",
      icon: Facebook,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/dgotechub",
      icon: Instagram,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/techdurango",
      icon: Twitter,
    },
    {
      name: "GitHub",
      url: "https://github.com/dgo-devs-community",
      icon: Github,
    },
  ] as SocialLink[],

  // Miembros destacados
  teamMembers: [
    {
      id: 1,
      name: "Ana García",
      role: "Fundadora & Organizadora",
      bio: "Desarrolladora Full Stack con más de 8 años de experiencia. Apasionada por crear comunidades tecnológicas inclusivas y accesibles para todos.",
      image: "/placeholder.svg?height=300&width=300",
      socialLinks: {
        linkedin: "https://linkedin.com/in/anagarcia",
        github: "https://github.com/anagarcia",
        twitter: "https://twitter.com/anagarcia",
      },
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Co-organizador & Mentor",
      bio: "Ingeniero de Software especializado en desarrollo móvil. Entusiasta de las metodologías ágiles y defensor del código abierto.",
      image: "/placeholder.svg?height=300&width=300",
      socialLinks: {
        linkedin: "https://linkedin.com/in/carlosrodriguez",
        github: "https://github.com/carlosrodriguez",
      },
    },
    {
      id: 3,
      name: "Laura Martínez",
      role: "Coordinadora de Eventos",
      bio: "Especialista en UX/UI con experiencia en organización de eventos. Enfocada en crear experiencias memorables para la comunidad tech.",
      image: "/placeholder.svg?height=300&width=300",
      socialLinks: {
        linkedin: "https://linkedin.com/in/lauramartinez",
        twitter: "https://twitter.com/lauramartinez",
      },
    },
    {
      id: 4,
      name: "Miguel Hernández",
      role: "Mentor & Desarrollador Backend",
      bio: "Arquitecto de software con experiencia en sistemas distribuidos. Apasionado por compartir conocimientos y ayudar a nuevos desarrolladores.",
      image: "/placeholder.svg?height=300&width=300",
      socialLinks: {
        linkedin: "https://linkedin.com/in/miguelhernandez",
        github: "https://github.com/miguelhernandez",
      },
    },
  ] as Member[],


  // Valores de la comunidad
  communityValues: [
    {
      title: "Comunidad Inclusiva",
      description:
        "Creamos un espacio donde todos son bienvenidos, sin importar su nivel de experiencia o especialidad técnica.",
      icon: "Users",
    },
    {
      title: "Aprendizaje Práctico",
      description:
        "Fomentamos el desarrollo de habilidades a través de proyectos reales y colaborativos.",
      icon: "Code",
    },
    {
      title: "Innovación Constante",
      description:
        "Exploramos nuevas tecnologías y metodologías para mantenernos a la vanguardia.",
      icon: "Lightbulb",
    },
    {
      title: "Networking Efectivo",
      description:
        "Conectamos profesionales y entusiastas para crear oportunidades de colaboración y crecimiento.",
      icon: "Share2",
    },
    {
      title: "Mentorías",
      description:
        "Facilitamos el intercambio de conocimiento entre miembros experimentados y aquellos que están comenzando.",
      icon: "GraduationCap",
    },
    {
      title: "Ambiente Relajado",
      description:
        "Creemos que el aprendizaje y la colaboración florecen en un entorno amigable y sin presiones.",
      icon: "Coffee",
    },
  ],
};
