import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Todo lo que necesitas saber sobre los proyectos colaborativos de
            nuestra comunidad.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 md:px-8">
        <div className="space-y-10">
          {/* Sección: ¿Qué son estos proyectos? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">❓</span> ¿Qué son estos
              proyectos?
            </h2>
            <p className="text-lg">
              Son{" "}
              <strong>
                proyectos reales, útiles y con impacto local o digital
              </strong>
              , construidos de forma colaborativa entre personas de la
              comunidad. Los impulsamos como una forma de aprendizaje colectivo,
              práctica real y crecimiento mutuo.
            </p>
          </div>

          {/* Sección: ¿Quién los organiza? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">👥</span> ¿Quién los organiza?
            </h2>
            <p className="text-lg">
              Están son facilitados por algun miembro de la comunidad que decide
              tomar el liderazgo de un proyecto, pero se dirigen de forma
              horizontal.{" "}
              <strong>
                Hay profesionales y personas con experiencia técnica en la
                comunidad que actúan como mentores
              </strong>
              , guías o apoyo para quienes están comenzando.
            </p>
            <p>
              ⚠️ Nota importante: Este proyecto no está afiliado a ninguna
              institución educativa, empresa ni organismo gubernamental. Es una
              iniciativa completamente independiente y comunitaria, construida
              desde la colaboración entre personas como tú y yo.
            </p>
          </div>

          {/* Sección: ¿Necesito experiencia para participar? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">👶</span> ¿Necesito experiencia
              para participar?
            </h2>
            <p className="text-lg">
              <strong>No.</strong> Estos espacios están pensados especialmente
              para personas con{" "}
              <strong>poca o ninguna experiencia previa</strong> en proyectos de
              desarrollo o trabajo en equipo. Aquí se aprende haciendo, con
              apoyo y sin miedo a equivocarse.
            </p>
          </div>

          {/* Sección: ¿Qué gano si participo? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">🧠</span> ¿Qué gano si participo?
            </h2>
            <ul className="text-lg list-disc pl-6 space-y-1">
              <li>
                <strong>Experiencia real</strong> trabajando en un proyecto
                desde cero.
              </li>
              <li>
                <strong>Conocimientos técnicos y colaborativos</strong> (no solo
                código).
              </li>
              <li>
                <strong>Mentoría y acompañamiento</strong> de personas con más
                experiencia.
              </li>
              <li>
                <strong>
                  Contacto con otras personas con intereses similares
                </strong>
                .
              </li>
              <li>Y sí: ¡material para tu portafolio!</li>
            </ul>
          </div>

          {/* Sección: ¿Y qué gana la comunidad? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">🤝</span> ¿Y qué gana la
              comunidad?
            </h2>
            <ul className="text-lg list-disc pl-6 space-y-1">
              <li>
                Personas preparadas que luego pueden liderar o sumarse a más
                proyectos.
              </li>
              <li>
                Proyectos útiles, hechos desde adentro, que la comunidad
                necesita para crecer.
              </li>
              <li>Un entorno más fuerte, conectado y colaborativo.</li>
            </ul>
          </div>

          {/* Sección: ¿Cómo funcionan? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">⚙️</span> ¿Cómo funcionan?
            </h2>
            <ol className="text-lg list-decimal pl-6 space-y-1">
              <li>Se lanza una convocatoria abierta.</li>
              <li>Se arma un equipo diverso.</li>
              <li>Se define un objetivo concreto (un MVP funcional).</li>
              <li>
                Se planifica el trabajo (como se haria en una startup real).
              </li>
              <li>Se trabaja en conjunto con el apoyo de IA y mentores.</li>
            </ol>
          </div>

          {/* Sección: ¿Qué tipo de tareas hay? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">🎨</span> ¿Qué tipo de tareas hay?
            </h2>
            <ul className="text-lg list-disc pl-6 space-y-1">
              <li>Frontend (interfaz web)</li>
              <li>Backend (APIs, bases de datos)</li>
              <li>Diseño (UI/UX)</li>
              <li>Marketing y Contenido</li>
              <li>Organización, testing, ideas, documentación...</li>
            </ul>
          </div>

          {/* Sección: ¿Cuánto tiempo tengo que dedicar? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">⏰</span> ¿Cuánto tiempo tengo que
              dedicar?
            </h2>
            <p className="text-lg">
              Cada persona dedica lo que puede. Lo ideal es{" "}
              <strong>
                ser constante, aunque sean pocas horas a la semana
              </strong>
              . Las tareas están divididas para que se avancen en pasos chicos.
            </p>
          </div>

          {/* Sección: ¿Qué pasa si me trabo? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">💬</span> ¿Qué pasa si me trabo?
            </h2>
            <p className="text-lg">
              ¡Nada! Esto es parte del proceso. Puedes pedir ayuda, trabajar en
              pareja, buscar referencias o usar IA. Siempre habrá apoyo.
            </p>
          </div>

          {/* Sección: ¿Por qué hacer esto así? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">🔥</span> ¿Por qué hacer esto así?
            </h2>
            <p className="text-lg">
              Porque creemos que el conocimiento se construye en comunidad.
              <br />
              Porque no todos aprenden en bootcamps o cursos.
              <br />
              Porque <strong>la mejor manera de aprender es creando</strong>.
            </p>
          </div>

          {/* Sección: ¿Dónde trabajamos los proyectos? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">🧉</span> ¿Dónde trabajamos los
              proyectos?
            </h2>
            <p className="text-lg">
              Trabajamos de forma <strong>híbrida y flexible</strong>: algunas
              veces cada quien desde su casa, otras veces nos reunimos en cafés
              o algun starbucks para colaborar presencialmente. Lo importante es
              que puedas sumarte a tu ritmo y que también tengamos momentos para
              vernos, conocernos y compartir.
            </p>
          </div>

          {/* Sección: ¿Cómo me uno? */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="text-blue-500">📩</span> ¿Cómo me uno?
            </h2>
            <p className="text-lg mb-4">
              Ingresa al siguiente formulario para registrate
            </p>
            <p>
              <Button className="bg-blue-900 hover:bg-blue-800" asChild>
                <Link href="https://tally.so/r/mD9Yxl" target="_blank">
                  Aplica aqui
                </Link>
              </Button>
            </p>
            <p className="text-lg mb-4">
              Mantente al tanto en los canales oficiales de la comunidad:
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-900 hover:bg-blue-800" asChild>
                <Link
                  href="https://whatsapp.com/channel/0029Vb6VZubJuyAFsKgdch2U"
                  target="_blank"
                >
                  WhatsApp
                </Link>
              </Button>
              <Button className="bg-indigo-700 hover:bg-indigo-600" asChild>
                <Link href="https://discord.gg/G4RsQJwuP8" target="_blank">
                  Discord
                </Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                asChild
              >
                <Link
                  href="https://www.instagram.com/dgotechub"
                  target="_blank"
                >
                  Instagram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
