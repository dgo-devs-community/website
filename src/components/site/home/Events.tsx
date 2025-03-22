import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Events() {
  return (
    <section
      id="eventos"
      className="bg-transparent p-6 md:bg-gray-50 text-inherit md:p-8 md:mb-12 md:rounded-lg"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Eventos</h2>
      <p className="mb-6 md:text-lg opacity-90 md:opacity-100 md:text-gray-700">
        Participa en los eventos de nuestra comunidad: desde talleres prácticos
        y charlas inspiradoras hasta sesiones de networking que potencian tus
        mentes creativas.
      </p>
      <p className="mb-6 md:text-lg opacity-90 md:opacity-100 md:text-gray-700">
        Descubre lo último en tecnología, diseño y marketing mientras colaboras
        con profesionales que comparten tu pasión.
      </p>
      <p className="mb-4 md:mb-6 font-medium md:text-lg opacity-90 md:opacity-100 md:text-gray-700">
        ¡No te los pierdas!
      </p>
      <div className="w-full flex justify-center md:justify-start">
        <Button className=" bg-[#2196f3] cursor-pointer hover:bg-blue-600 md:px-6 md:py-5 md:text-lg">
          <Link target="_blank" href="https://discord.gg/G4RsQJwuP8">
            Registrarse ahora
          </Link>
        </Button>
      </div>
    </section>
  );
}
