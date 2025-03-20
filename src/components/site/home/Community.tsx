import { Button } from "@/components/ui/button"

export default function Community() {
  return (
    <section id="comunidad" className="bg-gray-50 p-6 md:bg-transparent text-inherit md:p-0 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Comunidad</h2>
      <p className="mb-4 md:text-lg opacity-90 md:opacity-100 md:text-gray-700">
        Bienvenido a nuestra comunidad tech: un espacio donde desarrolladores, estudiantes y especialistas en tecnología
        colaboran, aprenden y construyen el futuro juntos.
      </p>
      <p className="mb-6 md:mb-8 md:text-lg opacity-90 md:opacity-100 md:text-gray-700">
        Explora nuevas oportunidades, aprende de expertos y sé parte de un movimiento en constante crecimiento.
      </p>
      <div className="w-full flex justify-center md:justify-start">
        <Button className=" bg-[#2196f3] cursor-pointer hover:bg-blue-600 md:px-6 md:py-5 md:text-lg">
          Registrarse ahora
        </Button>
      </div>
    </section>
  )
}