import TeamCard from "@/components/site/community/TeamCard";
import ValueCard from "@/components/site/community/ValueCard";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import {
  Code,
  Coffee,
  GraduationCap,
  Lightbulb,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";

const getIcons = (iconName: string) => {
  const icons = {
    Users: <Users className="h-8 w-8 text-blue-500" />,
    Code: <Code className="h-8 w-8 text-blue-500" />,
    Lightbulb: <Lightbulb className="h-8 w-8 text-blue-500" />,
    Share2: <Share2 className="h-8 w-8 text-blue-500" />,
    GraduationCap: <GraduationCap className="h-8 w-8 text-blue-500" />,
    Coffee: <Coffee className="h-8 w-8 text-blue-500" />,
  };
  return icons[iconName as keyof typeof icons];
};

export default function CommunityPage() {
  const showTeam = false; //TODO: Desarollar esta sección
  return (
    <>
      <div className="bg-blue-900 text-white py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestra Comunidad
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Un espacio donde desarrolladores, estudiantes y especialistas en
            tecnología colaboran, aprenden y contruyen el futuro juntos.
          </p>
        </div>
      </div>

      {/* Seccion de valores */}

      <div className="max-w-6xl mx-auto py-12 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          ¿Qué nos hace diferentes?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {siteConfig.communityValues.map((value, index) => (
            <ValueCard
              key={index}
              icon={getIcons(value.icon)}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>

      {/* Seccion de miembros */}

      {showTeam ? (
        <>
          <div className="max-w-6xl mx-auto py-12 md:py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Nuestro Equipo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {siteConfig.teamMembers.map((member) => (
                <TeamCard
                  key={member.name}
                  image={member.image}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  linkedin={member.socialLinks?.linkedin}
                  github={member.socialLinks?.github}
                  twitter={member.socialLinks?.twitter}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}

      {/* CTA */}
      <div className="max-w-6xl mx-auto py-12 md:py-8">
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center items-center flex flex-col gap-4">
          <h3 className="text-2xl font-bold">
            ¿Quieres ser parte de nuestra comunidad?
          </h3>
          <p className="max-w-2xl mx-auto">
            Únete a nosotros y forma parte de un grupo de personas apasionadas
            por la tecnología que comparten conocimientos, experiencias y
            oportunidades.
          </p>
          <Button
            className="bg-white w-fit text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg"
            asChild
          >
            <Link href={"https://discord.gg/G4RsQJwuP8"} target="_blank">
              Unetenos ahora
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
