"use client"

import { useEffect, useState } from "react"

// Glitch text effect component
export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState(children)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        setIsGlitching(true)
        // Corrupt the text slightly
        const corrupted = children.split('').map(char => 
          Math.random() < 0.1 ? String.fromCharCode(Math.random() * 26 + 65) : char
        ).join('')
        setGlitchText(corrupted)
        
        setTimeout(() => {
          setIsGlitching(false)
          setGlitchText(children)
        }, 200)
      }
    }, 8000 + Math.random() * 4000) // Random interval between 8-12 seconds

    return () => clearInterval(glitchInterval)
  }, [children])

  return (
    <span 
      className={`${className} ${isGlitching ? 'glitch-active' : ''}`}
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {glitchText}
      {isGlitching && (
        <>
          <span 
            className="glitch-layer-1"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#ff0000',
              animation: 'glitch 0.2s infinite',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {glitchText}
          </span>
          <span 
            className="glitch-layer-2"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#00ffff',
              animation: 'glitch 0.2s infinite',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {glitchText}
          </span>
        </>
      )}
    </span>
  )
}

// Background glitch effect component
export function BackgroundGlitch() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance every interval
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 300)
      }
    }, 15000 + Math.random() * 10000) // Random interval between 15-25 seconds

    return () => clearInterval(glitchInterval)
  }, [])

  if (!glitchActive) return null

  return (
    <div 
      className="background-glitch"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1000,
        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 0, 0, 0.1) 50%, transparent 70%)',
        animation: 'backgroundGlitch 0.3s ease-in-out'
      }}
    />
  )
}

// Random error popup component
export function ErrorPopups() {
  const [errors, setErrors] = useState<Array<{ id: number; message: string; x: number; y: number }>>([])

  useEffect(() => {
    const errorInterval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every interval
        const newError = {
          id: Date.now(),
          message: getRandomErrorMessage(),
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 100)
        }
        
        setErrors(prev => [...prev, newError])
        
        // Remove error after 3 seconds
        setTimeout(() => {
          setErrors(prev => prev.filter(e => e.id !== newError.id))
        }, 3000)
      }
    }, 20000 + Math.random() * 15000) // Random interval between 20-35 seconds

    return () => clearInterval(errorInterval)
  }, [])

  return (
    <>
      {errors.map(error => (
        <div
          key={error.id}
          className="error-popup"
          style={{
            position: 'fixed',
            top: error.y,
            left: error.x,
            background: '#ff0000',
            color: '#ffffff',
            padding: '8px 12px',
            border: '2px solid #000',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 1001,
            animation: 'errorPopup 0.3s ease-in-out',
            boxShadow: '4px 4px 0px #000'
          }}
        >
          ERROR: {error.message}
        </div>
      ))}
    </>
  )
}

// Random error messages
function getRandomErrorMessage(): string {
  const errors = [
    "SYSTEM_FAULT_0x7F",
    "MEMORY_LEAK_DETECTED",
    "UNEXPECTED_BEHAVIOR",
    "QUANTUM_FLUX_ERROR",
    "REALITY_CHECK_FAILED",
    "GLITCH_IN_MATRIX",
    "TEMPORAL_ANOMALY",
    "DIMENSION_MISMATCH"
  ]
  return errors[Math.floor(Math.random() * errors.length)]
}

// Add CSS animations to global styles
export function GlitchStyles() {
  return (
    <style jsx global>{`
      @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-2px, 2px) }
        40% { transform: translate(-2px, -2px) }
        60% { transform: translate(2px, 2px) }
        80% { transform: translate(2px, -2px) }
        100% { transform: translate(0) }
      }
      
      @keyframes backgroundGlitch {
        0% { opacity: 0; transform: scale(1) }
        50% { opacity: 1; transform: scale(1.1) }
        100% { opacity: 0; transform: scale(1) }
      }
      
      @keyframes errorPopup {
        0% { opacity: 0; transform: scale(0.8) }
        100% { opacity: 1; transform: scale(1) }
      }
      
      .glitch-active {
        animation: glitch 0.2s infinite;
      }
    `}</style>
  )
}
