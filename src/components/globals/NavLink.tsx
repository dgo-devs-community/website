
'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from 'next/navigation'

interface NavLinkProps {
    path: string
    text: string
  }
  
  
  export default function NavLink({ path, text }: NavLinkProps) {

    const pathname = usePathname()
    const isActive = pathname === path
    
    return (
        <Link
        href={path}
        className={cn(
          "text-sm font-medium relative transition-colors",
          "hover:text-white/90",
          isActive ? "text-white" : "text-white/80",
        )}
      >
        {text}
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-0.5 bg-white rounded-full transition-all duration-300",
            isActive ? "w-full" : "w-0 group-hover:w-full",
          )}
          style={{
            transform: isActive ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        {isActive && (
          <span
            className="absolute -bottom-1 left-0 h-0.5 w-full bg-white rounded-full"
            style={{
              transform: "scaleX(1)",
              transformOrigin: "left",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </Link>
    )
  }
  
