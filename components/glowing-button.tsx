"use client"

import type React from "react"

import { forwardRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowingButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  href?: string
  color?: "cyan" | "purple" | "gradient"
}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, href, color = "gradient", variant = "default", ...props }, ref) => {
    const baseClasses = cn(
      "relative group overflow-hidden",
      variant === "default" && "text-white border-none",
      variant === "outline" && "bg-transparent border border-gray-700 hover:bg-gray-800/50",
      className,
    )

    const glowClasses = cn(
      "absolute inset-0 w-full h-full transition-all duration-300 blur-md group-hover:blur-xl opacity-70 group-hover:opacity-90",
      color === "cyan" && "bg-cyan-600",
      color === "purple" && "bg-purple-600",
      color === "gradient" && "bg-gradient-to-r from-purple-600 to-cyan-600",
    )

    const contentClasses = cn(
      "relative z-10 flex items-center justify-center",
      variant === "default" && color === "gradient" && "bg-gradient-to-r from-purple-500 to-cyan-500",
      variant === "default" && color === "cyan" && "bg-cyan-600",
      variant === "default" && color === "purple" && "bg-purple-600",
      variant === "outline" && "text-white",
    )

    const button = (
      <Button ref={ref} className={baseClasses} variant="ghost" {...props}>
        <span className={glowClasses}></span>
        <span className={contentClasses}>{children}</span>
      </Button>
    )

    if (href) {
      return <Link href={href}>{button}</Link>
    }

    return button
  },
)

GlowingButton.displayName = "GlowingButton"
