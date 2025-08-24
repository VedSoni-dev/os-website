import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "default" | "tokyo-night" | "ghibli" | "cyberpunk" | "forest"

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "default",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      // Only persist on client side
      skipHydration: true,
    },
  ),
)

export const themes = {
  default: {
    name: "Default",
    colors: {
      background: "#FAFAF0",
      primary: "#FF2E63",
      secondary: "#FFE66D",
      accent: "#4ECDC4",
      text: "#000000",
    },
  },
  "tokyo-night": {
    name: "Tokyo Night",
    colors: {
      background: "#1a1b26",
      primary: "#7aa2f7",
      secondary: "#bb9af7",
      accent: "#7dcfff",
      text: "#c0caf5",
    },
  },
  ghibli: {
    name: "Studio Ghibli",
    colors: {
      background: "#f7f3e9",
      primary: "#8fbc8f",
      secondary: "#daa520",
      accent: "#cd853f",
      text: "#2f4f2f",
    },
  },
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      background: "#0a0a0f",
      primary: "#ff0080",
      secondary: "#00ffff",
      accent: "#ff6600",
      text: "#ffffff",
    },
    special: {
      backgroundImage: "/cyberpunk-city-4k.png",
      glowPrimary: "#ff0080",
      glowSecondary: "#00ffff",
      glowAccent: "#ff6600",
      neonPink: "#ff1493",
      neonCyan: "#00ffff",
      neonOrange: "#ff6600",
      darkOverlay: "rgba(10, 10, 15, 0.85)",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      background: "#2d5016",
      primary: "#90ee90",
      secondary: "#ffd700",
      accent: "#ff6347",
      text: "#f0f8ff",
    },
  },
}
