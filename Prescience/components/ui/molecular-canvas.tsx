'use client'

import React, { useRef, useEffect, useState } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
  color: string
  size: number
  id: number
}

interface Edge {
  a: number // point index
  b: number // point index
}

interface Ligand {
  x: number
  y: number
  z: number
  targetNodeIdx: number
  status: 'flying' | 'docked' | 'releasing'
  dockTime: number
  color: string
  affinity: number
  id: string
}

export function MolecularCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.6 })
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, lastX: 0, lastY: 0 })
  const statsRef = useRef({
    screenedCount: 148500,
    affinity: -9.4,
    activeSite: 'GLU-114'
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = canvas.width = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight

    const colorCyan = '#22d3ee'
    const colorIndigo = '#6366f1'
    const colorWhite = '#ffffff'

    // 1. Generate Geodesic Sphere (Icosahedron) Vertices
    const phi = (1 + Math.sqrt(5)) / 2
    const baseVertices: Point3D[] = [
      { x: -1, y: phi, z: 0, color: colorCyan, size: 5, id: 0 },
      { x: 1, y: phi, z: 0, color: colorCyan, size: 5, id: 1 },
      { x: -1, y: -phi, z: 0, color: colorCyan, size: 5, id: 2 },
      { x: 1, y: -phi, z: 0, color: colorCyan, size: 5, id: 3 },
      { x: 0, y: -1, z: phi, color: colorIndigo, size: 5, id: 4 },
      { x: 0, y: 1, z: phi, color: colorIndigo, size: 5, id: 5 },
      { x: 0, y: -1, z: -phi, color: colorIndigo, size: 5, id: 6 },
      { x: 0, y: 1, z: -phi, color: colorIndigo, size: 5, id: 7 },
      { x: phi, y: 0, z: -1, color: colorCyan, size: 5, id: 8 },
      { x: phi, y: 0, z: 1, color: colorCyan, size: 9, id: 9 }, // Active site (larger node)
      { x: -phi, y: 0, z: -1, color: colorCyan, size: 5, id: 10 },
      { x: -phi, y: 0, z: 1, color: colorCyan, size: 5, id: 11 }
    ]

    // Scale vertices to correct pixel scale
    const scaleFactor = 70
    const vertices = baseVertices.map((v) => ({
      ...v,
      x: v.x * scaleFactor,
      y: v.y * scaleFactor,
      z: v.z * scaleFactor
    }))

    // 2. Geodesic Sphere Edges
    const edges: Edge[] = [
      { a: 0, b: 1 }, { a: 0, b: 5 }, { a: 0, b: 7 }, { a: 0, b: 10 }, { a: 0, b: 11 },
      { a: 1, b: 5 }, { a: 1, b: 7 }, { a: 1, b: 8 }, { a: 1, b: 9 },
      { a: 2, b: 3 }, { a: 2, b: 4 }, { a: 2, b: 6 }, { a: 2, b: 10 }, { a: 2, b: 11 },
      { a: 3, b: 4 }, { a: 3, b: 6 }, { a: 3, b: 8 }, { a: 3, b: 9 },
      { a: 4, b: 5 }, { a: 4, b: 9 }, { a: 4, b: 11 },
      { a: 5, b: 9 }, { a: 5, b: 11 },
      { a: 6, b: 7 }, { a: 6, b: 8 }, { a: 6, b: 10 },
      { a: 7, b: 8 }, { a: 7, b: 10 },
      { a: 8, b: 9 }, { a: 10, b: 11 }
    ]

    // 3. Floating Ligands setup
    const ligands: Ligand[] = []
    const maxLigands = 5

    const createLigand = (): Ligand => {
      // Pick a random target node on the lattice
      const targetNodeIdx = Math.floor(Math.random() * vertices.length)
      // Start somewhere outside the screen limits
      const angle = Math.random() * Math.PI * 2
      const spawnDist = 200 + Math.random() * 50
      return {
        x: Math.cos(angle) * spawnDist,
        y: Math.sin(angle) * spawnDist,
        z: (Math.random() - 0.5) * 100,
        targetNodeIdx,
        status: 'flying',
        dockTime: 0,
        color: Math.random() > 0.5 ? colorCyan : colorIndigo,
        affinity: -(7.0 + Math.random() * 2.9),
        id: Math.random().toString(36).substr(2, 9)
      }
    }

    // Prepopulate some ligands
    for (let i = 0; i < maxLigands; i++) {
      ligands.push(createLigand())
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse drag rotation controls
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true
      mouseRef.current.lastX = e.clientX
      mouseRef.current.lastY = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top

      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.lastX
        const deltaY = e.clientY - mouseRef.current.lastY
        setRotation((prev) => ({
          x: prev.x - deltaY * 0.005,
          y: prev.y + deltaX * 0.005
        }))
        mouseRef.current.lastX = e.clientX
        mouseRef.current.lastY = e.clientY
      } else {
        // Track hover targeting coordinates
        mouseRef.current.x = clientX
        mouseRef.current.y = clientY
      }
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    let currentRotX = rotation.x
    let currentRotY = rotation.y

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Background telemetry grid
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.03)'
      ctx.lineWidth = 0.5
      const gridSize = 40
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Smooth easing of rotation coordinates
      if (!mouseRef.current.isDown) {
        currentRotY += 0.003 // Slow continuous yaw
      } else {
        currentRotX += (rotation.x - currentRotX) * 0.1
        currentRotY += (rotation.y - currentRotY) * 0.1
      }

      const cosX = Math.cos(currentRotX)
      const sinX = Math.sin(currentRotX)
      const cosY = Math.cos(currentRotY)
      const sinY = Math.sin(currentRotY)

      const center = { x: width / 2, y: height / 2 }

      // 4. Project Geodesic Vertices to 2D Screen
      const projectedVertices = vertices.map((v) => {
        // Y-axis rotation
        let x1 = v.x * cosY - v.z * sinY
        let z1 = v.x * sinY + v.z * cosY

        // X-axis rotation
        let y2 = v.y * cosX - z1 * sinX
        let z2 = v.y * sinX + z1 * cosX

        // Perspective Projection
        const depth = 350
        const scale = depth / (depth + z2)
        const screenX = center.x + x1 * scale
        const screenY = center.y + y2 * scale

        return {
          screenX,
          screenY,
          depth: z2,
          scale,
          color: v.color,
          size: v.size * scale,
          original: v
        }
      })

      // Update and Project Ligands
      const projectedLigands = ligands.map((lig) => {
        const targetNode = vertices[lig.targetNodeIdx]

        // Rotate target node 3D coordinates in sync
        let tx1 = targetNode.x * cosY - targetNode.z * sinY
        let tz1 = targetNode.x * sinY + targetNode.z * cosY
        let ty2 = targetNode.y * cosX - tz1 * sinX
        let tz2 = targetNode.y * sinX + tz1 * cosX

        if (lig.status === 'flying') {
          // Move toward target
          const dx = tx1 - lig.x
          const dy = ty2 - lig.y
          const dz = tz2 - lig.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 4) {
            lig.status = 'docked'
            lig.dockTime = Date.now()
            statsRef.current.affinity = lig.affinity
            statsRef.current.screenedCount += 1
          } else {
            lig.x += dx * 0.02
            lig.y += dy * 0.02
            lig.z += dz * 0.02
          }
        } else if (lig.status === 'docked') {
          // Lock onto rotating target coords
          lig.x = tx1
          lig.y = ty2
          lig.z = tz2

          // Release after 3 seconds
          if (Date.now() - lig.dockTime > 3000) {
            lig.status = 'releasing'
          }
        } else if (lig.status === 'releasing') {
          // Fly away outward
          lig.x += (lig.x - tx1) * 0.05 + 1.5
          lig.y += (lig.y - ty2) * 0.05 + 1.5

          // Reset when far away
          if (Math.abs(lig.x) > 300 || Math.abs(lig.y) > 300) {
            Object.assign(lig, createLigand())
          }
        }

        // Project ligand to screen coordinates
        const depth = 350
        const scale = depth / (depth + lig.z)
        const screenX = center.x + lig.x * scale
        const screenY = center.y + lig.y * scale

        return {
          screenX,
          screenY,
          depth: lig.z,
          scale,
          color: lig.color,
          size: 3.5 * scale,
          status: lig.status,
          affinity: lig.affinity,
          original: lig
        }
      })

      // Sort all items for correct depth compositing (back-to-front)
      const allElements = [
        ...projectedVertices.map(v => ({ ...v, type: 'node' })),
        ...projectedLigands.map(l => ({ ...l, type: 'ligand' }))
      ]
      allElements.sort((a, b) => b.depth - a.depth)

      // Draw Edges (Lattice covalent bonds)
      edges.forEach((edge) => {
        const vA = projectedVertices[edge.a]
        const vB = projectedVertices[edge.b]

        if (vA && vB) {
          const avgDepth = (vA.depth + vB.depth) / 2
          const opacity = Math.max(0.05, 1 - (avgDepth + scaleFactor) / (scaleFactor * 4))

          // Apply Depth-of-Field native blur filter
          const blurAmount = Math.max(0, (avgDepth + 50) * 0.02)
          ctx.filter = `blur(${blurAmount}px)`

          ctx.beginPath()
          ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.3})`
          ctx.lineWidth = Math.max(0.3, 1.2 * ((vA.scale + vB.scale) / 2))
          ctx.moveTo(vA.screenX, vA.screenY)
          ctx.lineTo(vB.screenX, vB.screenY)
          ctx.stroke()
        }
      })
      ctx.filter = 'none' // Reset filter

      // Draw dashed connection lines for docked/docking ligands
      projectedLigands.forEach((l) => {
        if (l.status === 'docked' || l.status === 'flying') {
          const targetNode = projectedVertices[l.original.targetNodeIdx]
          if (targetNode) {
            ctx.beginPath()
            ctx.setLineDash([3, 3])
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)'
            ctx.lineWidth = 0.8
            ctx.moveTo(l.screenX, l.screenY)
            ctx.lineTo(targetNode.screenX, targetNode.screenY)
            ctx.stroke()
            ctx.setLineDash([]) // Reset dash
          }
        }
      })

      // Draw all nodes and ligands with depth layering
      allElements.forEach((el) => {
        const blurAmount = Math.max(0, (el.depth + 60) * 0.03)
        ctx.filter = `blur(${blurAmount}px)`

        // Draw additive blending glows
        ctx.globalCompositeOperation = 'screen'

        const rad = el.size || 3.5
        const glow = ctx.createRadialGradient(
          el.screenX - rad * 0.3, 
          el.screenY - rad * 0.3, 
          rad * 0.1, 
          el.screenX, 
          el.screenY, 
          rad
        )
        glow.addColorStop(0, '#ffffff')
        glow.addColorStop(0.3, el.color)
        glow.addColorStop(1, 'rgba(0, 0, 0, 0.8)')

        ctx.beginPath()
        ctx.arc(el.screenX, el.screenY, rad, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Glow ring for ligands or active sites
        if (el.type === 'ligand' || (el.type === 'node' && el.size > 5 * el.scale)) {
          ctx.beginPath()
          ctx.arc(el.screenX, el.screenY, rad * 2.2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * el.scale})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        ctx.globalCompositeOperation = 'source-over' // Reset compositing
        ctx.filter = 'none' // Reset filter

        // Draw HUD details next to docked ligands (without blur)
        if (el.type === 'ligand' && (el as any).status === 'docked') {
          ctx.font = '7px Courier New'
          ctx.fillStyle = 'rgba(34, 211, 238, 0.75)'
          ctx.fillText(`BINDING: ${(el as any).affinity.toFixed(1)} kcal/mol`, el.screenX + 8, el.screenY - 2)
          
          ctx.beginPath()
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)'
          ctx.lineWidth = 0.5
          ctx.moveTo(el.screenX, el.screenY)
          ctx.lineTo(el.screenX + 6, el.screenY - 6)
          ctx.lineTo(el.screenX + 45, el.screenY - 6)
          ctx.stroke()
        }
      })

      // 5. Draw Sci-Fi HUD Vector Elements
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)'
      ctx.lineWidth = 0.5

      // Top-left HUD status board
      ctx.font = '8px monospace'
      ctx.fillStyle = 'rgba(34, 211, 238, 0.8)'
      ctx.fillText('INSILICO SIMULATOR v1.0.4', 20, 30)

      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'
      ctx.fillText(`ACTIVE_SITE: ${statsRef.current.activeSite}`, 20, 42)
      ctx.fillText(`ENERGY_AFFINITY: ${statsRef.current.affinity.toFixed(2)} kcal/mol`, 20, 54)
      ctx.fillText(`COMPOUNDS_SCREENED: ${statsRef.current.screenedCount.toLocaleString()}`, 20, 66)
      ctx.fillText(`VELOCITY: 148,503 NCE/s`, 20, 78)

      // Bottom-left coordinate vectors
      ctx.fillText(`PITCH: ${currentRotX.toFixed(3)} YAW: ${currentRotY.toFixed(3)}`, 20, height - 25)

      // Floating Calibration Target tracking the mouse cursor
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)'
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(mouseRef.current.x - 12, mouseRef.current.y)
        ctx.lineTo(mouseRef.current.x + 12, mouseRef.current.y)
        ctx.moveTo(mouseRef.current.x, mouseRef.current.y - 12)
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y + 12)
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)'
        ctx.stroke()
      }

      // Border calibration ticks
      const borderPadding = 15
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)'
      ctx.beginPath()
      ctx.moveTo(borderPadding, borderPadding)
      ctx.lineTo(borderPadding + 10, borderPadding)
      ctx.moveTo(borderPadding, borderPadding)
      ctx.lineTo(borderPadding, borderPadding + 10)

      ctx.moveTo(width - borderPadding, borderPadding)
      ctx.lineTo(width - borderPadding - 10, borderPadding)
      ctx.moveTo(width - borderPadding, borderPadding)
      ctx.lineTo(width - borderPadding, borderPadding + 10)

      ctx.moveTo(borderPadding, height - borderPadding)
      ctx.lineTo(borderPadding + 10, height - borderPadding)
      ctx.moveTo(borderPadding, height - borderPadding)
      ctx.lineTo(borderPadding, height - borderPadding - 10)

      ctx.moveTo(width - borderPadding, height - borderPadding)
      ctx.lineTo(width - borderPadding - 10, height - borderPadding)
      ctx.moveTo(width - borderPadding, height - borderPadding)
      ctx.lineTo(width - borderPadding, height - borderPadding - 10)
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [rotation])

  return (
    <div className="w-full h-full relative group cursor-grab active:cursor-grabbing bg-slate-950/20 rounded-2xl overflow-hidden border border-white/5 shadow-inner">
      {/* Dynamic scanline effect */}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(34,211,238,0.03)_50%,rgba(34,211,238,0.03))] bg-[length:100%_4px] pointer-events-none" />

      {/* Target status tag */}
      <div className="absolute top-4 right-4 z-20 text-[8px] font-mono border border-cyan-500/30 text-cyan-300 bg-cyan-500/10 rounded px-2 py-0.5 tracking-widest pointer-events-none">
        SIM_ACTIVE
      </div>

      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  )
}
