"use client"

import { useEffect, useRef } from "react"

export function HexagonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let hexagons: {
      x: number
      y: number
      size: number
      opacity: number
      targetOpacity: number
      color: string
    }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initHexagons()
    }

    const initHexagons = () => {
      hexagons = []
      const hexSize = 30
      const horizontalSpacing = hexSize * 1.8
      const verticalSpacing = hexSize * 1.6

      const columns = Math.ceil(canvas.width / horizontalSpacing) + 1
      const rows = Math.ceil(canvas.height / verticalSpacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2)
          const y = row * verticalSpacing

          // Colors: cyan and purple with low opacity
          const colors = ["rgba(139, 92, 246, 0.15)", "rgba(45, 212, 191, 0.15)"]
          const color = colors[Math.floor(Math.random() * colors.length)]

          hexagons.push({
            x,
            y,
            size: hexSize,
            opacity: 0,
            targetOpacity: Math.random() * 0.2 + 0.05,
            color,
          })
        }
      }
    }

    const drawHexagon = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      // Draw outline
      ctx.strokeStyle = color.replace("0.15", "0.3")
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hexagons.forEach((hexagon) => {
        // Animate opacity
        if (hexagon.opacity < hexagon.targetOpacity) {
          hexagon.opacity += 0.002
        } else {
          hexagon.targetOpacity = Math.random() * 0.2 + 0.05
        }

        const color = hexagon.color.replace("0.15", hexagon.opacity.toString())
        drawHexagon(hexagon.x, hexagon.y, hexagon.size, color)
      })
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
