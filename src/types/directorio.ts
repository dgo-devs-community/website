export enum ProfileType {
  PERSONAL = 'Perfil Personal',
  PROJECT = 'Proyecto',
  SERVICE = 'Servicio',
  INITIATIVE = 'Iniciativa',
}

export enum Category {
  WEB_DEV = 'Desarrollo Web',
  MOBILE_DEV = 'Desarrollo Móvil',
  UI_UX = 'Diseño UI/UX',
  DATA_SCIENCE = 'Ciencia de Datos',
  ENTREPRENEURSHIP = 'Emprendimiento',
  CYBERSECURITY = 'Ciberseguridad',
  DEVOPS = 'DevOps',
  GAMEDEV = 'Desarrollo de Videojuegos',
  STUDENT = 'Estudiante',
}

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
  category: Category;
  title: string;
  bio: string;
  imageUrl: string;
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}