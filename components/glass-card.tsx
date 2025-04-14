import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-xl blur-xl -z-10 opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div
        className={cn(
          "relative bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden p-6",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
