"use client"

import { useState, useEffect } from "react"

export default function BuildingStatus() {
  const buildingItems = [
    "Fern - AI tools for children with autism",
    "RecReach - pickup sports startup",
    "Hive - robotics startup for human-AI integration",
    "Eden - AI intelligent robots with behaviors",
    "autonomous drone navigation",
    "computer vision models",
    "robotics control systems",
    "neural network architectures",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const currentItem = buildingItems[currentIndex]

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentItem.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentItem.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next item
        setCurrentIndex((prev) => (prev + 1) % buildingItems.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentIndex, buildingItems])

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 12000 + Math.random() * 8000) // Random interval between 12-20 seconds

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="fixed top-1/2 right-32 transform -translate-y-1/2 z-10 pointer-events-none select-none">
      <div className="flex flex-col items-start gap-2">
        <span className="text-gray-500 text-2xl">Building:</span>
        <span 
          className={`min-w-[400px] font-bold text-4xl font-mono transition-all duration-150 ${
            glitchActive ? 'text-red-500 filter contrast-150' : 'text-gray-400'
          }`}
          style={{
            textShadow: glitchActive 
              ? '2px 0 #00ffff, -2px 0 #ff00ff' 
              : 'none'
          }}
        >
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </span>
      </div>
    </div>
  )
}
