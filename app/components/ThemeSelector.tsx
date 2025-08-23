"use client"

import { useState, useEffect } from "react"
import { useThemeStore, themes, type Theme } from "@/lib/theme-store"

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const body = document.body
    // Remove all theme classes
    body.classList.remove("cyberpunk-theme", "tokyo-night-theme", "ghibli-theme", "forest-theme")

    // Add specific theme class
    if (theme === "cyberpunk") {
      body.classList.add("cyberpunk-theme")
    } else if (theme === "tokyo-night") {
      body.classList.add("tokyo-night-theme")
    } else if (theme === "ghibli") {
      body.classList.add("ghibli-theme")
    } else if (theme === "forest") {
      body.classList.add("forest-theme")
    }
  }, [theme, mounted])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)

    // Apply theme to document root
    const root = document.documentElement
    const themeColors = themes[newTheme].colors

    if (newTheme === "default") {
      // Reset to default CSS variables
      root.style.removeProperty("--theme-background")
      root.style.removeProperty("--theme-primary")
      root.style.removeProperty("--theme-secondary")
      root.style.removeProperty("--theme-accent")
      root.style.removeProperty("--theme-text")
    } else {
      // Apply theme colors as CSS variables
      root.style.setProperty("--theme-background", themeColors.background)
      root.style.setProperty("--theme-primary", themeColors.primary)
      root.style.setProperty("--theme-secondary", themeColors.secondary)
      root.style.setProperty("--theme-accent", themeColors.accent)
      root.style.setProperty("--theme-text", themeColors.text)
    }
  }

  return (
    <div className="relative">
      {!mounted ? (
        <div className="w-10 h-10 border-[3px] border-black bg-white shadow-[4px_4px_0_0_#000] flex items-center justify-center font-black text-lg">
          🎨
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 border-[3px] border-black bg-white shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 flex items-center justify-center font-black text-lg ${
              theme === "cyberpunk" ? "cyberpunk-glow" : ""
            }`}
            title="Change Theme"
          >
            🎨
          </button>

          {isOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

              <div
                className={`absolute top-12 right-0 z-50 w-48 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] ${
                  theme === "cyberpunk" ? "cyberpunk-window" : ""
                }`}
              >
                <div className="p-2">
                  <div
                    className={`font-black text-sm mb-2 px-2 ${
                      theme === "cyberpunk" ? "cyberpunk-text-glow text-white" : ""
                    }`}
                  >
                    Choose Theme
                  </div>
                  {Object.entries(themes).map(([key, themeData]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key as Theme)}
                      className={`w-full text-left px-3 py-2 text-sm font-semibold border-[2px] border-black mb-1 transition-all duration-200 flex items-center justify-between ${
                        theme === key
                          ? key === "cyberpunk"
                            ? "cyberpunk-button text-white shadow-[2px_2px_0_0_#000]"
                            : "bg-yellow-300 shadow-[2px_2px_0_0_#000]"
                          : key === "cyberpunk" && theme === "cyberpunk"
                            ? "bg-transparent text-white hover:cyberpunk-button hover:shadow-[2px_2px_0_0_#000]"
                            : theme === "cyberpunk"
                              ? "bg-transparent text-white hover:bg-gray-800 hover:shadow-[2px_2px_0_0_#000]"
                              : "bg-white hover:bg-gray-100 hover:shadow-[2px_2px_0_0_#000]"
                      }`}
                    >
                      <span>{themeData.name}</span>
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-black"
                          style={{ backgroundColor: themeData.colors.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border border-black"
                          style={{ backgroundColor: themeData.colors.secondary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border border-black"
                          style={{ backgroundColor: themeData.colors.accent }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
