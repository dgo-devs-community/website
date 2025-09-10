'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Profile, Category } from '@/types/directorio';
import { getProfiles } from '@/lib/services/profileService';
import { CATEGORIES } from '@/lib/constants/directorio';
import ProfileCard from '@/components/directorio/ProfileCard';
import Input from '@/components/directorio/Input';
import Select from '@/components/directorio/Select';

export default function DirectorioPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const matchesCategory = selectedCategory === 'all' || profile.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [profiles, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      <section className="text-center py-6 sm:py-8 md:py-12 bg-white rounded-lg shadow-sm border border-slate-200 mx-2 sm:mx-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 px-2">Directorio de la Comunidad</h1>
        <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
          Un espacio para conectar, colaborar y dar visibilidad al talento tecnológico de Durango.
        </p>
      </section>

      <section className="my-4 sm:my-6 md:my-8 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-sm border border-slate-200 mx-2 sm:mx-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-end">
          <Input 
            id="search"
            label="Buscar por palabra clave"
            type="text"
            placeholder="Ej: React, UX, Emprendimiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select 
            id="category"
            label="Filtrar por categoría"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </div>
      </section>
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-slate-500">Cargando perfiles...</p>
        </div>
      ) : (
        <>
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mx-2 sm:mx-0">
            {filteredProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-10 bg-white rounded-lg border border-dashed border-slate-300 mx-2 sm:mx-0">
            <h3 className="text-lg md:text-xl font-semibold text-slate-700">No se encontraron perfiles</h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Intenta ajustar tu búsqueda o filtro.</p>
          </div>
        )}
        </>
      )}
    </div>
  );
}