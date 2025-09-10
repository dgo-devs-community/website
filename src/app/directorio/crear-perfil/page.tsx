'use client';

import React from 'react';

export default function CrearPerfilPage() {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      <div className="max-w-2xl mx-auto bg-white p-3 sm:p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2">Crear tu Ficha</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-lg font-semibold text-blue-800 mb-3">Formulario temporalmente deshabilitado</h2>
          <p className="text-blue-700 mb-4">
            Estamos trabajando en mejorar el proceso de registro. Por el momento, los perfiles se agregan manualmente.
          </p>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="font-medium text-blue-800 mb-2">📞 Para agregar tu perfil:</p>
            <p className="text-blue-700 text-sm">
              Contacta al administrador en Discord: <strong>@dgotechub</strong>
            </p>
            <p className="text-blue-600 text-xs mt-2">
              Proporciona: nombre, título, categoría, biografía y enlaces (GitHub, LinkedIn, portafolio)
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Volver al Directorio
          </button>
        </div>
      </div>
    </div>
  );
}