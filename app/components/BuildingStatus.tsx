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

  return (
    <div className="fixed top-1/2 right-32 transform -translate-y-1/2 text-4xl text-gray-400 font-mono z-10 pointer-events-none select-none">
      <div className="flex flex-col items-start gap-2">
        <span className="text-gray-500 text-2xl">Building:</span>
        <span className="min-w-[400px] font-bold">
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </div>
  )
}
