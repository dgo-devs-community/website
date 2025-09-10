import { Profile, ProfileType, Category } from '@/types/directorio';
import { supabase } from '@/lib/supabase';

// Interfaz para los datos de la base de datos
interface ProfileDB {
  id: string;
  name: string;
  type: string;
  category: string;
  title: string;
  bio: string;
  image_url: string;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Función para convertir datos de DB a formato de la aplicación
function transformDBToProfile(dbProfile: ProfileDB): Profile {
  return {
    id: dbProfile.id,
    name: dbProfile.name,
    type: dbProfile.type as ProfileType,
    category: dbProfile.category as Category,
    title: dbProfile.title,
    bio: dbProfile.bio,
    imageUrl: dbProfile.image_url,
    links: {
      github: dbProfile.github_url || undefined,
      linkedin: dbProfile.linkedin_url || undefined,
      portfolio: dbProfile.portfolio_url || undefined,
    }
  };
}

// Función para convertir datos de la aplicación a formato de DB
function transformProfileToDB(profile: Omit<Profile, 'id'>): Omit<ProfileDB, 'id' | 'created_at' | 'updated_at' | 'is_active' | 'featured'> {
  return {
    name: profile.name,
    type: profile.type,
    category: profile.category,
    title: profile.title,
    bio: profile.bio,
    image_url: profile.imageUrl,
    github_url: profile.links.github || null,
    linkedin_url: profile.links.linkedin || null,
    portfolio_url: profile.links.portfolio || null,
  };
}

export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }

    return data?.map(transformDBToProfile) || [];
  } catch (error) {
    console.error('Error in getProfiles:', error);
    // Fallback a datos vacíos en caso de error
    return [];
  }
};

export const addProfile = async (profileData: Omit<Profile, 'id'>): Promise<Profile> => {
  try {
    const dbData = {
      ...transformProfileToDB(profileData),
      is_active: false, // Los nuevos perfiles empiezan como inactivos
      featured: false
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error adding profile:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from insert');
    }

    return transformDBToProfile(data);
  } catch (error) {
    console.error('Error in addProfile:', error);
    throw error;
  }
};

// Función adicional para obtener perfiles destacados
export const getFeaturedProfiles = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured profiles:', error);
      throw error;
    }

    return data?.map(transformDBToProfile) || [];
  } catch (error) {
    console.error('Error in getFeaturedProfiles:', error);
    return [];
  }
};

// Función para obtener estadísticas
export const getProfileStats = async () => {
  try {
    const { data, error } = await supabase
      .from('profile_stats')
      .select('*');

    if (error) {
      console.error('Error fetching profile stats:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getProfileStats:', error);
    return [];
  }
};