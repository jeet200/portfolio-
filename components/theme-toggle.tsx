"use client"
import { Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <button
        onClick={() => setTheme("light")}
        className="relative w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center z-10"
      >
        <Sun className="h-5 w-5 text-cyan-400" />
      </button>
    </div>
  )
}
