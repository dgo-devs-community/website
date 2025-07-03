"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { partyConfig, bankInfo } from "@/lib/party-config";
import { createTicket } from "@/lib/ticket-service";
import {
  generateTicketImage,
  downloadTicketImage,
  shareTicket,
} from "@/lib/ticket-generator";
import { TicketFormData, Ticket } from "@/types/tickets";
import {
  Upload,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function TicketForm() {
  const [formData, setFormData] = useState<TicketFormData>({
    name: "",
    email: "",
    quantity: 1,
    receipt: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [ticketImage, setTicketImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo no es válido";
    }

    if (formData.quantity < 1 || formData.quantity > 10) {
      newErrors.quantity = "La cantidad debe ser entre 1 y 10";
    }

    if (!formData.receipt) {
      newErrors.receipt = "El comprobante de pago es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          receipt: "Solo se permiten archivos JPG, PNG o PDF",
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, receipt: "El archivo no debe exceder 5MB" });
        return;
      }

      setFormData({ ...formData, receipt: file });
      setErrors({ ...errors, receipt: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Crear boleto
      const newTicket = await createTicket(formData);
      setTicket(newTicket);

      // Generar imagen del boleto
      const imageUrl = await generateTicketImage(newTicket);
      setTicketImage(imageUrl);
    } catch (error) {
      console.error("Error al crear boleto:", error);
      setErrors({
        submit:
          error instanceof Error ? error.message : "Error al crear el boleto",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (ticketImage && ticket) {
      downloadTicketImage(ticketImage, ticket.code);
    }
  };

  const handleShare = () => {
    if (ticket) {
      const shareUrls = shareTicket(ticket);
      if (shareUrls) {
        // Mostrar opciones de compartir
        const shareText = `¡Conseguí mi boleto para ${partyConfig.name}! 🎉`;
        if (navigator.share) {
          navigator.share({
            title: partyConfig.name,
            text: shareText,
            url: window.location.origin,
          });
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      quantity: 1,
      receipt: null,
    });
    setTicket(null);
    setTicketImage(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (ticket && ticketImage) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              ¡Boleto Generado Exitosamente!
            </h2>
            <p className="text-gray-600">
              Tu código de boleto es:{" "}
              <span className="font-mono font-bold text-xl">{ticket.code}</span>
            </p>
          </div>

          <div className="mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ticketImage}
              alt="Boleto generado"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Descargar Boleto
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
            <Button onClick={resetForm} variant="outline">
              Generar Otro Boleto
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Información importante:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Guarda tu código de boleto: {ticket.code}</li>
              <li>• Presenta este boleto en el evento</li>
              <li>• El QR code será escaneado en la entrada</li>
              <li>• En caso de problemas, contacta al organizador</li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{partyConfig.name}</h2>
          <p className="text-gray-600">
            {partyConfig.date} • {partyConfig.time}
          </p>
          <p className="text-gray-600">{partyConfig.location}</p>
          <p className="text-xl font-bold text-blue-600 mt-2">
            ${partyConfig.price} {partyConfig.currency} por boleto
          </p>
        </div>

        {/* Información bancaria */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold mb-2">
            Información para transferencia:
          </h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Banco:</strong> {bankInfo.bank}
            </p>
            <p>
              <strong>Cuenta:</strong> {bankInfo.account}
            </p>
            <p>
              <strong>CLABE:</strong> {bankInfo.clabe}
            </p>
            <p>
              <strong>Titular:</strong> {bankInfo.holder}
            </p>
            <p>
              <strong>Concepto:</strong> {bankInfo.concept}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium mb-1"
            >
              Cantidad de boletos *
            </label>
            <select
              id="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} boleto{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label htmlFor="receipt" className="block text-sm font-medium mb-1">
              Comprobante de pago *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Arrastra tu comprobante aquí o haz clic para seleccionar
              </p>
              <input
                type="file"
                id="receipt"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Seleccionar archivo
              </Button>
              {formData.receipt && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.receipt.name}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Formatos permitidos: JPG, PNG, PDF (máximo 5MB)
            </p>
            {errors.receipt && (
              <p className="text-red-500 text-sm mt-1">{errors.receipt}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold mb-2">
              Total: ${partyConfig.price * formData.quantity}{" "}
              {partyConfig.currency}
            </p>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{errors.submit}</p>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Generando boleto..." : "Generar Boleto"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Proceso:</h3>
          <ol className="text-sm text-gray-700 space-y-1">
            <li>1. Realiza la transferencia bancaria</li>
            <li>2. Sube tu comprobante de pago</li>
            <li>3. Recibe tu boleto instantáneamente</li>
            <li>4. Presenta el código QR en el evento</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
