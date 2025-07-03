import TicketForm from "@/components/tickets/TicketForm";

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boletos para la Fiesta
          </h1>
          <p className="text-xl text-gray-600">
            Obtén tu boleto de forma rápida y sencilla
          </p>
        </div>

        <TicketForm />
      </div>
    </div>
  );
}
