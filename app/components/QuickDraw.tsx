"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface Point {
  x: number
  y: number
}

export default function QuickDraw() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState<Point[][]>([])
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [guesses, setGuesses] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 300
    canvas.height = 300

    // Set drawing style
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getMousePos(e)
    setCurrentStroke([pos])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const pos = getMousePos(e)
    setCurrentStroke((prev) => [...prev, pos])

    // Draw on canvas
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return

    setIsDrawing(false)
    setStrokes((prev) => [...prev, currentStroke])
    setCurrentStroke([])

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.beginPath()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setStrokes([])
    setCurrentStroke([])
    setGuesses([])
  }

  const analyzeDrawing = async () => {
    if (strokes.length === 0) return

    setIsAnalyzing(true)
    try {
      // Convert strokes to detailed path description
      const pathDescription = analyzeDrawingPaths(strokes)

      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"), // Using more powerful model
        prompt: `You are an expert at recognizing drawings in a Quick Draw game. Analyze this drawing data and make your best guess.

Drawing Analysis:
${pathDescription}

Based on this drawing data, what do you think this is? Consider:
- The shape patterns and curves
- Number of separate elements
- Relative positions and sizes
- Common objects people draw

Give me 3 guesses in order of confidence, separated by commas. Use simple, common nouns that people typically draw (like: cat, house, car, tree, sun, flower, person, dog, bird, fish, star, heart, etc.).

Format: guess1, guess2, guess3`,
      })

      const newGuesses = text
        .trim()
        .split(",")
        .map((g) => g.trim())
        .slice(0, 3)
      setGuesses(newGuesses)
      setAttempts((prev) => prev + 1)

      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1000)
    } catch (error) {
      console.error("Error analyzing drawing:", error)
      setGuesses(["mystery object", "abstract art", "masterpiece"])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeDrawingPaths = (strokeData: Point[][]) => {
    const canvas = canvasRef.current
    if (!canvas) return "No drawing data"

    const width = canvas.width
    const height = canvas.height

    let description = `Canvas size: ${width}x${height}\n`
    description += `Number of strokes: ${strokeData.length}\n`

    strokeData.forEach((stroke, index) => {
      if (stroke.length < 2) return

      const startX = stroke[0].x
      const startY = stroke[0].y
      const endX = stroke[stroke.length - 1].x
      const endY = stroke[stroke.length - 1].y

      // Calculate stroke characteristics
      const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
      const isCircular = isStrokeCircular(stroke)
      const isStraight = isStrokeStraight(stroke)
      const direction = getStrokeDirection(stroke)

      description += `Stroke ${index + 1}: `
      description += `start(${Math.round(startX)},${Math.round(startY)}) `
      description += `end(${Math.round(endX)},${Math.round(endY)}) `
      description += `length=${Math.round(length)} `

      if (isCircular) description += "CIRCULAR "
      if (isStraight) description += "STRAIGHT "
      description += `direction=${direction} `
      description += `points=${stroke.length}\n`
    })

    return description
  }

  const isStrokeCircular = (stroke: Point[]): boolean => {
    if (stroke.length < 10) return false
    const start = stroke[0]
    const end = stroke[stroke.length - 1]
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
    return distance < 30 && stroke.length > 20
  }

  const isStrokeStraight = (stroke: Point[]): boolean => {
    if (stroke.length < 3) return true
    const start = stroke[0]
    const end = stroke[stroke.length - 1]
    const expectedLength = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
    const actualLength = stroke.reduce((acc, point, i) => {
      if (i === 0) return 0
      const prev = stroke[i - 1]
      return acc + Math.sqrt(Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2))
    }, 0)
    return Math.abs(actualLength - expectedLength) < expectedLength * 0.2
  }

  const getStrokeDirection = (stroke: Point[]): string => {
    if (stroke.length < 2) return "none"
    const start = stroke[0]
    const end = stroke[stroke.length - 1]
    const dx = end.x - start.x
    const dy = end.y - start.y

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left"
    } else {
      return dy > 0 ? "down" : "up"
    }
  }

  const handleCorrectGuess = (guess: string) => {
    setScore((prev) => prev + 1)
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false)
      clearCanvas()
    }, 2000)
  }

  const handleButtonClick = () => {
    console.log("[v0] QuickDraw button clicked!")
    setShowCanvas(true)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showCanvas ? (
        <button
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 px-4 py-2 font-bold cursor-pointer animate-pulse"
          style={{ pointerEvents: "auto" }}
        >
          🎨 AI Quick Draw
        </button>
      ) : (
        <div
          className={`bg-white border-[4px] border-black shadow-[8px_8px_0_0_#000] p-4 transition-all duration-300 ${showCelebration ? "animate-bounce" : ""}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-lg">🎨 AI Quick Draw!</h3>
              <p className="text-xs text-gray-600">
                Score: {score} | Attempts: {attempts}
              </p>
            </div>
            <button
              onClick={() => setShowCanvas(false)}
              className="bg-red-500 text-white border-[2px] border-black px-2 py-1 text-sm font-bold hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium mb-2">Draw something and I'll make 3 guesses! 🤖</p>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="border-[3px] border-black cursor-crosshair bg-white hover:bg-gray-50 transition-colors"
              style={{ touchAction: "none" }}
            />
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={analyzeDrawing}
              disabled={strokes.length === 0 || isAnalyzing}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-[2px] border-black px-3 py-1 text-sm font-bold hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? "🤔 AI Thinking..." : "🔮 Analyze!"}
            </button>
            <button
              onClick={clearCanvas}
              className="bg-orange-500 text-white border-[2px] border-black px-3 py-1 text-sm font-bold hover:bg-orange-600 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>

          {guesses.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-[2px] border-black p-3 rounded">
              <p className="text-sm font-bold mb-2">🤖 My AI guesses:</p>
              {guesses.map((guess, index) => (
                <div key={index} className="flex justify-between items-center mb-1">
                  <span className="text-sm">
                    {index + 1}. <span className="font-bold text-lg">{guess}</span>
                  </span>
                  <button
                    onClick={() => handleCorrectGuess(guess)}
                    className="bg-green-500 text-white border border-black px-2 py-1 text-xs font-bold hover:bg-green-600 transition-colors"
                  >
                    ✓ Correct!
                  </button>
                </div>
              ))}
            </div>
          )}

          {showCelebration && (
            <div className="absolute inset-0 bg-yellow-400 bg-opacity-90 flex items-center justify-center border-[4px] border-black">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <div className="font-bold text-xl">Nice drawing!</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
