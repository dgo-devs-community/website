import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-[40vh]">
      <div className="absolute inset-0">
        <Image
          src="/heroImage.webp"
          alt="Tech community background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative min-h-[40vh] flex items-center justify-center p-6 md:p-12">
        <div className="flex flex-col text-center max-w-md md:max-w-2xl mx-auto items-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-[#031120]">
            La comunidad Tech líder y más grande de Durango.
          </h1>
          <Button
            className="bg-[#2196f3] cursor-pointer hover:bg-blue-600 md:px-6 md:py-5 md:text-lg"
            size="lg"
            asChild
          >
            <Link href={"https://discord.gg/mn5X7gw7uy"} target="_blank">
              <span className="ml-2 ">Unete a nosotros</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
