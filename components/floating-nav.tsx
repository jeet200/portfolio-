"use client"

import { motion } from "framer-motion"
import { Home, User, Briefcase, FolderKanban, Award, Mail } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FloatingNavProps {
  activeSection: string
}

export function FloatingNav({ activeSection }: FloatingNavProps) {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "competitions", label: "Achievements", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-md"></div>
        <nav className="flex items-center gap-1 sm:gap-4 bg-gray-900/80 backdrop-blur-md px-4 py-3 rounded-full border border-gray-800 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative flex items-center justify-center px-3 py-2 rounded-full transition-colors",
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:block text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.div>
  )
}
