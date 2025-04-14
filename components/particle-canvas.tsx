"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.1

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 0.5
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = Math.random() * 0.5 - 0.25
        const speedY = Math.random() * 0.5 - 0.25

        // Colors: cyan and purple with low opacity
        const colors = ["rgba(139, 92, 246, 0.5)", "rgba(45, 212, 191, 0.5)"]
        const color = colors[Math.floor(Math.random() * colors.length)]

        particlesRef.current.push({ x, y, size, speedX, speedY, color })
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Mouse interaction
        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius

          particle.x += Math.cos(angle) * force * 2
          particle.y += Math.sin(angle) * force * 2
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(150, 150, 150, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
