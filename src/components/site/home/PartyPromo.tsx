import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { partyConfig } from "@/lib/party-config";
import { Ticket, Calendar, Users, CheckCircle } from "lucide-react";
import { shouldShowPartyInfo } from "@/lib/feature-flags";

export default function PartyPromo() {
  // Don't render the component if party info should be hidden
  if (!shouldShowPartyInfo()) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {partyConfig.name}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            La fiesta tech más esperada del año... ¡con DJ en vivo y música
            norteña pa’ que se armae el bailongo! 🪗🎧
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{partyConfig.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕐</span>
              <span>{partyConfig.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{partyConfig.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información del evento */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white">
            <Users className="h-12 w-12 mb-4 text-blue-300" />
            <h3 className="text-xl font-bold mb-2">Ambiente Inigualable</h3>
            <p className="text-blue-100">
              Conecta con desarrolladores, emprendedores y compas de la tech… ¡y
              échate un zapateado con el DJ y el norteño en vivo!
            </p>
          </Card>

          {/* Precio */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
            <Ticket className="h-12 w-12 mb-4 mx-auto text-green-300" />
            <h3 className="text-xl font-bold mb-2">Precio Especial</h3>
            <div className="text-3xl font-bold text-green-300 mb-2">
              ${partyConfig.price} {partyConfig.currency}
            </div>
            <p className="text-blue-100">
              Incluye acceso completo a la fiesta, networking tech y ambiente
              musical bien prendido.
            </p>
          </Card>

          {/* Proceso */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CheckCircle className="h-12 w-12 mb-4 text-green-300" />
            <h3 className="text-xl font-bold mb-2">Proceso Simple</h3>
            <ul className="text-blue-100 space-y-1">
              <li>1. Realiza transferencia</li>
              <li>2. Sube comprobante</li>
              <li>3. Recibe tu boleto</li>
              <li>4. ¡Y vente a la pachanga tech!</li>
            </ul>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/tickets">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎟️ Obtener Mi Boleto
            </Button>
          </Link>
          <p className="text-blue-100 mt-4">
            Cupo limitado • Generación instantánea • Pago por transferencia
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-black/20 backdrop-blur-md border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              ¿Tienes tu boleto?
            </h3>
            <p className="text-blue-100 mb-4">
              Verifica tu código o presenta tu QR en el evento
            </p>
            <Link href="/verify">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Verificar Boleto
              </Button>
            </Link>
          </Card>

          <Card className="p-6 bg-black/20 backdrop-blur-md border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              Información Bancaria
            </h3>
            <div className="text-blue-100 space-y-1 text-sm">
              <p>
                <strong>Banco:</strong> Banco Ejemplo
              </p>
              <p>
                <strong>Cuenta:</strong> 1234567890
              </p>
              <p>
                <strong>Concepto:</strong> Boleto Fiesta 2025
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
