import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export default function TeamCard({
  image,
  name,
  role,
  bio,
  linkedin,
  github,
  twitter,
}: TeamCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-64">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-blue-600 text-sm">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
        <div className="flex gap-2">
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-gray-600 hover:text-blue-600" />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-600" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
