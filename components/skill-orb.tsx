"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillOrbProps {
  icon: string
  position: "top" | "right" | "bottom" | "left"
  delay?: number
}

export function SkillOrb({ icon, position, delay = 0 }: SkillOrbProps) {
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "-top-12 left-1/2 -translate-x-1/2"
      case "right":
        return "top-1/2 -right-12 -translate-y-1/2"
      case "bottom":
        return "-bottom-12 left-1/2 -translate-x-1/2"
      case "left":
        return "top-1/2 -left-12 -translate-y-1/2"
      default:
        return ""
    }
  }

  const getIconPath = () => {
    switch (icon) {
      case "python":
        return "/placeholder.svg?height=40&width=40"
      case "java":
        return "/placeholder.svg?height=40&width=40"
      case "html":
        return "/placeholder.svg?height=40&width=40"
      case "javascript":
        return "/placeholder.svg?height=40&width=40"
      default:
        return "/placeholder.svg?height=40&width=40"
    }
  }

  const orbitAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay,
      },
    },
  }

  return (
    <motion.div
      className={cn("absolute w-10 h-10 flex items-center justify-center", getPositionStyles())}
      variants={orbitAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-full blur-sm"></div>
        <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center relative z-10">
          <img src={getIconPath() || "/placeholder.svg"} alt={icon} className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}
