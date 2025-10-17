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
    body.classList.remove("cyberpunk-theme", "tokyo-night-theme", "ghibli-theme", "forest-theme", "dune-theme", "dune-dark-theme")

    // Add specific theme class
    if (theme === "cyberpunk") {
      body.classList.add("cyberpunk-theme")
    } else if (theme === "tokyo-night") {
      body.classList.add("tokyo-night-theme")
    } else if (theme === "ghibli") {
      body.classList.add("ghibli-theme")
    } else if (theme === "forest") {
      body.classList.add("forest-theme")
    } else if (theme === "dune") {
      body.classList.add("dune-theme")
    } else if (theme === "dune-dark") {
      body.classList.add("dune-dark-theme")
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
      root.style.removeProperty("--dune-background-image")
      root.style.removeProperty("--dune-sand-texture")
      root.style.removeProperty("--dune-tech-glow")
      root.style.removeProperty("--dune-shadow-color")
    } else {
      // Apply theme colors as CSS variables
      root.style.setProperty("--theme-background", themeColors.background)
      root.style.setProperty("--theme-primary", themeColors.primary)
      root.style.setProperty("--theme-secondary", themeColors.secondary)
      root.style.setProperty("--theme-accent", themeColors.accent)
      root.style.setProperty("--theme-text", themeColors.text)
      
      // Apply Dune theme special properties
      if (newTheme === "dune" || newTheme === "dune-dark") {
        const special = themes[newTheme].special
        if (special) {
          root.style.setProperty("--dune-background-image", special.backgroundImage)
          root.style.setProperty("--dune-sand-texture", special.sandTexture)
          root.style.setProperty("--dune-tech-glow", special.techGlow)
          root.style.setProperty("--dune-shadow-color", special.shadowColor)
        }
      }
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
              theme === "cyberpunk" ? "cyberpunk-glow" : 
              theme === "dune" || theme === "dune-dark" ? "dune-glow" : ""
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
                  theme === "cyberpunk" ? "cyberpunk-window" : 
                  theme === "dune" || theme === "dune-dark" ? "dune-window" : ""
                }`}
              >
                <div className="p-2">
                  <div
                    className={`font-black text-sm mb-2 px-2 ${
                      theme === "cyberpunk" ? "cyberpunk-text-glow text-white" : 
                      theme === "dune" || theme === "dune-dark" ? "dune-text-glow" : ""
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
                            : key === "dune" || key === "dune-dark"
                              ? "dune-button text-black shadow-[2px_2px_0_0_#000]"
                              : "bg-yellow-300 shadow-[2px_2px_0_0_#000]"
                          : key === "cyberpunk" && theme === "cyberpunk"
                            ? "bg-transparent text-white hover:cyberpunk-button hover:shadow-[2px_2px_0_0_#000]"
                            : (key === "dune" || key === "dune-dark") && (theme === "dune" || theme === "dune-dark")
                              ? "bg-transparent text-black hover:dune-button hover:shadow-[2px_2px_0_0_#000]"
                              : theme === "cyberpunk"
                                ? "bg-transparent text-white hover:bg-gray-800 hover:shadow-[2px_2px_0_0_#000]"
                                : theme === "dune" || theme === "dune-dark"
                                  ? "bg-transparent text-black hover:bg-gray-100 hover:shadow-[2px_2px_0_0_#000]"
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
