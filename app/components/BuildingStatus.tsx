"use client"

import { useState, useEffect } from "react"

interface BuildingStatusProps {
  onProjectClick?: (projectId: string) => void
}

export default function BuildingStatus({ onProjectClick }: BuildingStatusProps) {
  const buildingItems = [
    { text: "Fern - AI tools for children with autism", projectName: "Fern", color: "#6b7280", projectId: "fern" }, // Muted gray-green
    { text: "RecReach - pickup sports startup", projectName: "RecReach", color: "#9ca3af", projectId: "recreach" }, // Muted red-gray
    { text: "Hive - robotics startup for human-AI integration", projectName: "Hive", color: "#a78bfa", projectId: "hive" }, // Muted purple
    { text: "Eden - AI intelligent robots with behaviors", projectName: "Eden", color: "#d97706", projectId: "eden" }, // Muted amber
    { text: "autonomous drone navigation", projectName: "", color: "", projectId: null },
    { text: "computer vision models", projectName: "", color: "", projectId: null },
    { text: "robotics control systems", projectName: "", color: "", projectId: null },
    { text: "neural network architectures", projectName: "", color: "", projectId: null },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentItem = buildingItems[currentIndex]

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentItem.text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentItem.text.slice(0, displayText.length + 1))
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


  // Function to render text with colored project names
  const renderColoredText = (text: string, projectName: string, color: string) => {
    if (!projectName || !color) {
      return text
    }
    
    const parts = text.split(projectName)
    if (parts.length === 1) {
      return text
    }
    
    return (
      <>
        {parts[0]}
        <span style={{ color: color, fontWeight: '600' }}>{projectName}</span>
        {parts[1]}
      </>
    )
  }

  const currentItem = buildingItems[currentIndex]
  const isProject = currentItem.projectId !== null

  const handleClick = () => {
    if (isProject && onProjectClick && displayText.length > 0) {
      onProjectClick(currentItem.projectId!)
    }
  }
  return (
    <div className="fixed top-1/2 right-32 transform -translate-y-1/2 z-10 select-none">
      <div className="flex flex-col items-start gap-2">
        <span className="text-gray-500 text-2xl">Building:</span>
        <span 
          className={`max-w-[500px] font-bold text-4xl font-mono transition-all duration-150 text-gray-400 ${
            isProject && displayText.length > 0 ? 'cursor-pointer hover:text-white hover:underline' : ''
          }`}
          onClick={handleClick}
        >
          {renderColoredText(displayText, currentItem.projectName, currentItem.color)}
          {isTyping && <span className="animate-pulse">|</span>}
        </span>
      </div>
    </div>
  )
}
