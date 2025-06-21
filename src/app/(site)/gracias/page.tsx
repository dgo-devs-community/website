import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GraciasPage() {
  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ¡Gracias por registrarte!
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Tu registro ha sido completado con éxito.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-5xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¡Bienvenido/a a nuestra comunidad!
          </h2>
          <p className="text-lg mb-8">
            Estamos muy contentos de que te hayas unido a nosotros. Pronto recibirás más información sobre los proyectos colaborativos y cómo puedes participar.
          </p>
          <p className="text-lg mb-8">
            Mientras tanto, te invitamos a explorar nuestro sitio y unirte a nuestros canales de comunicación para mantenerte al día con todas las novedades.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button className="bg-blue-900 hover:bg-blue-800" asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button className="bg-indigo-700 hover:bg-indigo-600" asChild>
              <Link href="https://discord.gg/G4RsQJwuP8" target="_blank">Unirse a Discord</Link>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-400" asChild>
              <Link href="/faq">Ver FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}