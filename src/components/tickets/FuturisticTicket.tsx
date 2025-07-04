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
  ({ ticket }, ref) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
    const showQR = true;
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
        style={{
          padding: "1rem",
          position: "relative",
          width: "360px",
          height: "640px",
          backgroundColor: "#000000",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.2)",
          border: "1px solid rgba(15, 118, 110, 0.5)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
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
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "1.5rem",
          }}
        >
          <header
            style={{
              textAlign: "center",
              paddingBottom: "1rem",
              borderBottomWidth: "2px",
              borderBottomStyle: "dashed",
              borderBottomColor: "rgba(34, 211, 238, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {/* Logo container */}
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-cyan-400/30">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/Degradado Blanco@2x.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="w-auto h-auto max-w-[60px] max-h-[60px] object-contain"
                />
              </div>
            </div>

            <div>
              <h1
                className="font-bold text-2xl tracking-wider text-white mb-2"
                style={{
                  lineHeight: "1",
                  textShadow:
                    "0 0 10px #fff, 0 0 20px #00ffff, 0 0 30px #00ffff",
                  fontFamily: "Geist",
                }}
              >
                {partyConfig.name}
              </h1>
              <p className="text-cyan-300 text-sm tracking-widest">
                TECH • NORTEÑO • DJ
              </p>
            </div>
          </header>

          <section
            style={{
              paddingBlock: "0.75rem",
              marginBlock: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1rem",
              flex: "1",
            }}
          >
            {/* Date and Time */}
            <div className="w-full bg-black/20 border border-cyan-500/30 rounded-lg p-3">
              <div className="flex justify-center items-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-cyan-300/70 tracking-widest mb-1">
                    FECHA
                  </p>
                  <p className="text-lg font-bold text-white">
                    {partyConfig.date}
                  </p>
                </div>
                <div className="w-px h-8 bg-cyan-500/30"></div>
                <div className="text-center">
                  <p className="text-xs text-cyan-300/70 tracking-widest mb-1">
                    HORA
                  </p>
                  <p className="text-lg text-cyan-200">{partyConfig.time}</p>
                </div>
              </div>
            </div>

            {/* Guest Name */}
            <div className="w-full">
              <p className="text-xs text-cyan-300 tracking-widest mb-2">
                INVITADO ESPECIAL
              </p>
              <p
                className="text-3xl font-bold text-white mb-2 leading-tight"
                style={{
                  textShadow:
                    "0 0 15px #fff, 0 0 25px #00ffff, 0 0 35px #00ffff",
                }}
              >
                {ticket.name}
              </p>
            </div>
          </section>

          {showQR && (
            <footer
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "0.75rem",
                borderTop: "2px dashed rgba(34, 211, 238, 0.3)",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                }}
                className="bg-white/95 p-2 rounded-lg shadow-lg border border-cyan-500/50"
              >
                {qrCodeDataUrl ? (
                  <Image
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px]"
                  />
                ) : (
                  <div className="w-[80px] h-[80px] bg-gray-300 animate-pulse"></div>
                )}
              </div>
              <p
                style={{ marginTop: "0.5rem" }}
                className="text-xs text-cyan-300 tracking-wider"
              >
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
