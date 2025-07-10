"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DownloadTicketPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendDownloadLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/tickets/send-download-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setError(data.error || "Error al enviar el enlace de descarga");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎫 Recuperar mi Boleto
          </h1>
          <p className="text-gray-600">
            Ingresa tu email para recibir los enlaces de descarga de tus boletos
            pagados
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSendDownloadLink} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      ❌ Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      ✅ Enviado
                    </h3>
                    <div className="mt-2 text-sm text-green-700">{message}</div>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email}
            >
              {isLoading ? "Enviando..." : "📧 Enviar Enlaces de Descarga"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex items-center">
                <span className="mr-2">💡</span>
                <span>
                  Solo recibirás enlaces para boletos pagados y aprobados
                </span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🔄</span>
                <span>Puedes usar este servicio las veces que necesites</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">⏱️</span>
                <span>Los boletos pendientes no aparecerán en el email</span>
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            ¿Tienes problemas? Contáctanos en{" "}
            <a
              href="mailto:dgotechub@gmail.com"
              className="text-blue-600 hover:text-blue-500"
            >
              dgotechub@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
