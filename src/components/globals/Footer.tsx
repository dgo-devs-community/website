import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      {/* Sección de contacto (anteriormente un componente separado) */}
      <div className="border-b border-blue-900">
        <div className="md:max-w-6xl mx-auto px-4 md:px-0 py-6 md:py-8 md:flex md:justify-between md:items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
            Mantente en contacto.
          </h2>
          <div className="flex space-x-6 justify-center">
            {siteConfig.socialLinks.slice(0, 4).map((social) => (
              <Link
                key={social.name}
                href={social.url}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  <social.icon className="h-6 w-6 hover:text-white/80 transition-colors" />
                }
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="md:max-w-6xl mx-auto px-4 md:px-0 pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Acerca de</h3>
            <p className="text-sm text-white/80 mb-4">
              {siteConfig.description} Creamos un espacio donde desarrolladores,
              estudiantes y especialistas en tecnología colaboran, aprenden y
              construyen el futuro juntos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/pastevents"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={
                    siteConfig.socialLinks.find(
                      (social) => social.name === "Instagram"
                    )?.url ?? ""
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white"
                >
                  {siteConfig.email}
                </Link>
              </li>
              <li className="text-sm text-white/80">{siteConfig.phone}</li>
              <li className="text-sm text-white/80">{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm border-t border-blue-900 pt-6">
          <p>© 2025 {siteConfig.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
