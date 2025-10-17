"use client"

import type React from "react"

import { X, GripVertical } from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function DesktopWindow({
  appKey = "about",
  title = "Window",
  children,
  zIndex = 100,
  onClose = () => {},
  onFocus = () => {},
  onMinimize = () => {},
  onMaximize = () => {},
}: {
  appKey?: string
  title?: string
  children?: React.ReactNode
  zIndex?: number
  onClose?: () => void
  onFocus?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}) {
  const winRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const pos = useRef<{ x: number; y: number }>({ x: 120, y: 100 })
  const grabbing = useRef(false)
  const start = useRef<{ x: number; y: number; sx: number; sy: number }>({ x: 0, y: 0, sx: 0, sy: 0 })
  const rafRef = useRef<number | null>(null)

  // initial offset based on appKey
  useEffect(() => {
    const offsets: Record<string, { x: number; y: number }> = {
      about: { x: 80, y: 80 },
      projects: { x: 160, y: 120 },
      philosophy: { x: 260, y: 140 },
      experience: { x: 200, y: 160 },
      blog: { x: 240, y: 180 },
    }
    const off = offsets[appKey] ?? { x: 120, y: 120 }
    pos.current = off
    applyTransform()
  }, [appKey])

  const applyTransform = () => {
    if (!winRef.current) return
    const { x, y } = pos.current
    winRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      grabbing.current = true
      onFocus()
      start.current = { x: e.clientX, y: e.clientY, sx: pos.current.x, sy: pos.current.y }
      ;(e.target as Element).setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!grabbing.current) return
      const dx = e.clientX - start.current.x
      const dy = e.clientY - start.current.y
      pos.current.x = start.current.sx + dx
      pos.current.y = start.current.sy + dy
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyTransform)
    }
    const onPointerUp = (e: PointerEvent) => {
      grabbing.current = false
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {}
    }

    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onFocus])

  return (
    <div
      ref={winRef}
      className="absolute top-0 left-0 w-[min(95vw,1200px)] md:w-[900px]"
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      {/* Ultra-transparent glassmorphism container */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden relative">
        {/* Multiple ultra-subtle glassmorphism layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/2 to-green-100/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-200/5 via-transparent to-white/6 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-green-50/4 pointer-events-none"></div>
        
        {/* Ultra-glass header */}
        <div
          ref={headerRef}
          className={cn(
            "flex items-center justify-between px-6 py-4 cursor-grab active:cursor-grabbing relative",
            "bg-white/8 backdrop-blur-xl border-b border-white/25",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/6 before:via-white/3 before:to-white/2 before:pointer-events-none"
          )}
          style={{ userSelect: "none" }}
        >
          {/* Ultra-subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/4 via-white/2 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-400/60 hover:bg-red-500/70 transition-all duration-300 group shadow-lg backdrop-blur-sm border border-white/20"
                aria-label="Close window"
              >
                <div className="w-full h-full rounded-full bg-red-400/60 group-hover:bg-red-500/70 group-hover:scale-110 transition-all duration-300 shadow-inner"></div>
              </button>
              <button
                onClick={onMinimize}
                className="w-3.5 h-3.5 rounded-full bg-yellow-400/60 hover:bg-yellow-500/70 transition-all duration-300 group shadow-lg backdrop-blur-sm border border-white/20"
                aria-label="Minimize window"
              >
                <div className="w-full h-3.5 rounded-full bg-yellow-400/60 group-hover:bg-yellow-500/70 group-hover:scale-110 transition-all duration-300 shadow-inner"></div>
              </button>
              <button
                onClick={onMaximize}
                className="w-3.5 h-3.5 rounded-full bg-green-400/60 hover:bg-green-500/70 transition-all duration-300 group shadow-lg backdrop-blur-sm border border-white/20"
                aria-label="Maximize window"
              >
                <div className="w-full h-full rounded-full bg-green-400/60 group-hover:bg-green-500/70 group-hover:scale-110 transition-all duration-300 shadow-inner"></div>
              </button>
            </div>
            <div className="font-semibold text-green-800/90 text-sm tracking-wide drop-shadow-sm">{title}</div>
          </div>
          
        </div>
        
        {/* Ultra-transparent content area */}
        <div className="h-[70vh] overflow-auto bg-white/3 backdrop-blur-2xl relative">
          {/* Ultra-subtle content background overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/2 via-white/1 to-white/3 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-green-50/2 via-transparent to-white/2 pointer-events-none"></div>
          <div className="relative z-10">{children}</div>
        </div>
        
        {/* Enhanced edge highlights for ultra-glass effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div className="absolute inset-0 rounded-3xl border border-white/40 shadow-inner"></div>
          <div className="absolute inset-px rounded-3xl border border-white/20"></div>
        </div>
      </div>
    </div>
  )
}     