"use client";

import React, { forwardRef } from "react";
import { Ticket } from "@/types/tickets";
import { partyConfig } from "@/lib/party-config";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Image from "next/image";

interface FuturisticTicketProps {
  ticket: Ticket;
  showQR?: boolean;
}

const FuturisticTicket = forwardRef<HTMLDivElement, FuturisticTicketProps>(
  ({ ticket, showQR = true }, ref) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

    useEffect(() => {
      if (showQR && ticket.code) {
        QRCode.toDataURL(ticket.code, {
          width: 140,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        })
          .then(setQrCodeDataUrl)
          .catch(console.error);
      }
    }, [ticket.code, showQR]);

    return (
      <div
        ref={ref}
        className="relative w-[360px] h-[640px] bg-black rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-800/50 flex flex-col font-sans ticket-container"
      >
        {/* Background Aurora/Nebula Effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/40 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/40 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-blue-500/30 rounded-full filter blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-grid-pattern bg-repeat animate-pulse"></div>
        </div>

        {/* Main content with padding */}
        <div className="relative z-10 flex flex-col h-full p-6">
          <header className="text-center pb-4 border-b-2 border-dashed border-cyan-400/30">
            <h1
              className="font-bold text-4xl tracking-wider text-white mb-2"
              style={{
                textShadow: "0 0 10px #fff, 0 0 20px #00ffff, 0 0 30px #00ffff",
                fontFamily: "monospace",
              }}
            >
              {partyConfig.name}
            </h1>
            <p className="text-cyan-300 text-lg tracking-widest">
              TECH • NORTEÑO • DJ
            </p>
          </header>

          <section className="flex-grow flex flex-col justify-center items-center text-center my-6 space-y-6">
            {/* Fecha y Hora en una línea */}
            <div className="w-full">
              <p className="text-sm text-cyan-300 tracking-widest mb-2">
                FECHA Y HORA
              </p>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-xl font-bold text-white">
                  {partyConfig.date}
                </p>
                <span className="text-cyan-300">•</span>
                <p className="text-xl text-cyan-200">{partyConfig.time}</p>
              </div>
            </div>

            {/* Nombre del titular - MÁS PROMINENTE */}
            <div className="w-full">
              <p className="text-sm text-cyan-300 tracking-widest mb-3">
                INVITADO ESPECIAL
              </p>
              <p
                className="text-4xl font-bold text-white mb-2 leading-tight"
                style={{
                  textShadow:
                    "0 0 15px #fff, 0 0 25px #00ffff, 0 0 35px #00ffff",
                }}
              >
                {ticket.name}
              </p>
            </div>

            {/* Ticket ID más discreto */}
            <div className="w-full">
              <p className="text-xs text-cyan-300/70 tracking-widest mb-1">
                TICKET ID
              </p>
              <p className="text-sm font-mono text-cyan-400/80 bg-black/30 px-3 py-1 rounded border border-cyan-500/30">
                {ticket.code}
              </p>
            </div>
          </section>

          {showQR && (
            <footer className="mt-auto flex flex-col items-center justify-center pt-4 border-t-2 border-dashed border-cyan-400/30">
              <div className="bg-white/95 p-2 rounded-lg shadow-lg border border-cyan-500/50">
                {qrCodeDataUrl && (
                  <Image
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]"
                  />
                )}
              </div>
              <p className="mt-2 text-xs text-cyan-300 tracking-wider">
                ESCANEAR EN LA ENTRADA
              </p>
            </footer>
          )}
        </div>

        {/* Perforated edge effect */}
        <div className="absolute top-0 -left-4 w-8 h-full">
          <div
            className="h-full w-px bg-repeat-y bg-center"
            style={{
              backgroundImage: `radial-gradient(circle at center, #111827 4px, transparent 4px)`,
              backgroundSize: "1px 16px",
            }}
          ></div>
        </div>
        <div className="absolute top-0 -right-4 w-8 h-full">
          <div
            className="h-full w-px bg-repeat-y bg-center"
            style={{
              backgroundImage: `radial-gradient(circle at center, #111827 4px, transparent 4px)`,
              backgroundSize: "1px 16px",
            }}
          ></div>
        </div>

        {/* Holographic corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60 rounded-br-lg"></div>
      </div>
    );
  }
);

FuturisticTicket.displayName = "FuturisticTicket";

export default FuturisticTicket;
