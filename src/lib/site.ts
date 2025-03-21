import { Facebook, Instagram, Linkedin, Youtube, Twitter, Github, Disc } from "lucide-react"

// Tipos para las redes sociales
export interface SocialLink {
  name: string
  url: string
  icon: typeof Facebook | typeof Instagram | typeof Linkedin | typeof Youtube | typeof Twitter | typeof Github | typeof Disc
}

// Tipos para los miembros
export interface Member {
  id: number
  name: string
  role: string
  bio: string
  image: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

// Información del sitio
export const siteConfig = {
  name: "Tech Community Durango",
  description: "La más grande comunidad Tech en Durango",
  url: "https://techcommunitydurango.com",
  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DTH%20-%20logo.svg%202-g7zdpDDy2yl5N36QtZfsPa4Hnfmtit.png",
  email: "contacto@techcommunitydurango.com",
  phone: "+52 618 123 4567",
  address: "Durango, México",

  // Redes sociales
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/tech-community-durango",
      icon: Linkedin,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/c/techcommunitydurango",
      icon: Youtube,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/techcommunitydurango",
      icon: Facebook,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/techcommunitydurango",
      icon: Instagram,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/techdurango",
      icon: Twitter,
    },
    {
      name: "GitHub",
      url: "https://github.com/tech-community-durango",
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

  // Miembros de la comunidad (ejemplos)
  communityMembers: {
    professionals: {
      description:
        "Desarrolladores, diseñadores, project managers y especialistas en marketing digital que comparten su experiencia y conocimientos con la comunidad.",
      extendedDescription:
        "Nuestros miembros profesionales trabajan en empresas locales e internacionales, aportando diversidad de perspectivas y experiencias.",
      image: "/placeholder.svg?height=200&width=350",
    },
    students: {
      description:
        "Jóvenes apasionados por la tecnología que buscan complementar su formación académica con experiencias prácticas y mentorías.",
      extendedDescription:
        "Los estudiantes encuentran en nuestra comunidad un espacio para desarrollar proyectos, practicar habilidades y conectar con el mundo profesional.",
      image: "/placeholder.svg?height=200&width=350",
    },
  },

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
      description: "Fomentamos el desarrollo de habilidades a través de proyectos reales y colaborativos.",
      icon: "Code",
    },
    {
      title: "Innovación Constante",
      description: "Exploramos nuevas tecnologías y metodologías para mantenernos a la vanguardia.",
      icon: "Lightbulb",
    },
    {
      title: "Networking Efectivo",
      description: "Conectamos profesionales y entusiastas para crear oportunidades de colaboración y crecimiento.",
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
      description: "Creemos que el aprendizaje y la colaboración florecen en un entorno amigable y sin presiones.",
      icon: "Coffee",
    },
  ],
}

