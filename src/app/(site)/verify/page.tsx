import TicketVerification from "@/components/tickets/TicketVerification";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Verificación de Boletos
          </h1>
          <p className="text-xl text-gray-600">
            Verifica la validez de un boleto
          </p>
        </div>

        <TicketVerification />
      </div>
    </div>
  );
}
