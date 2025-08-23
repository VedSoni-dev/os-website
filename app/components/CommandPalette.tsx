"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { AppKey } from "@/lib/ui-store"

export default function CommandPalette({
  open = false,
  onOpenChange = () => {},
  onAction = () => {},
  onReset = () => {},
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onAction?: (k: Exclude<AppKey, "palette" | null>) => void
  onReset?: () => void
}) {
  const [input, setInput] = React.useState("")
  const [history, setHistory] = React.useState<string[]>([
    "vedant@desktop:~$ Welcome to Vedant's Terminal",
    "Type '--help' to see available commands",
    "",
  ])
  const [commandHistory, setCommandHistory] = React.useState<string[]>([])
  const [historyIndex, setHistoryIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const commands = {
    "--help": () => [
      "Available commands:",
      "  about       - Open about section",
      "  projects    - Open projects/startups gallery",
      "  talk        - Open talk to me section",
      "  experience  - Open experience section",
      "  reset       - Reset desktop",
      "  clear       - Clear terminal history",
      "  --help      - Show this help message",
      "",
    ],
    about: () => {
      onAction("about")
      return ["Opening About section..."]
    },
    projects: () => {
      onAction("projects")
      return ["Opening Projects/Startups gallery..."]
    },
    talk: () => {
      onAction("talk")
      return ["Opening Talk to Me section..."]
    },
    experience: () => {
      onAction("experience")
      return ["Opening Experience section..."]
    },
    reset: () => {
      onReset()
      return ["Resetting desktop..."]
    },
    clear: () => {
      setHistory(["vedant@desktop:~$ Terminal cleared", ""])
      return []
    },
  }

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const newHistory = [...history, `vedant@desktop:~$ ${cmd}`]

    if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands]()
      setHistory([...newHistory, ...output, ""])
    } else if (trimmedCmd === "") {
      setHistory([...newHistory, ""])
    } else {
      setHistory([...newHistory, `Command not found: ${cmd}`, "Type '--help' for available commands", ""])
    }

    setCommandHistory((prev) => [...prev, cmd])
    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onOpenChange])

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 bg-[#FAFAF0] border-2 border-black">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <div className="bg-[#FAFAF0] text-black font-mono text-sm">
          {/* Terminal header */}
          <div className="bg-gray-200 text-black px-4 py-2 border-b border-gray-400 flex items-center justify-between">
            <span>vedant@desktop: Terminal</span>
            <button onClick={() => onOpenChange(false)} className="text-red-600 hover:text-red-500 text-lg font-bold">
              ×
            </button>
          </div>

          {/* Terminal content */}
          <div className="p-4 h-96 overflow-y-auto">
            {/* History */}
            <div className="mb-2">
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>

            {/* Current input line */}
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">vedant@desktop:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-black font-mono"
                placeholder="Type a command..."
                autoComplete="off"
              />
              <span className="animate-pulse text-black">|</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
