"use client"

import { create } from "zustand"

export type AppKey = "about" | "projects" | "talk" | "philosophy" | "experience" | "palette" | null

type UIState = {
  activeApp: AppKey
  openApps: Exclude<AppKey, "palette" | null>[]
  setActiveApp: (app: AppKey | ((prev: AppKey) => AppKey)) => void
  setOpenApps: (apps: Exclude<AppKey, "palette" | null>[]) => void
  openApp: (app: Exclude<AppKey, "palette" | null>) => void
  closeApp: (app: Exclude<AppKey, "palette" | null>) => void
  focusApp: (app: Exclude<AppKey, "palette" | null>) => void
  openPalette: () => void
  closePalette: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  activeApp: "about",
  openApps: ["about"],
  setActiveApp: (app) =>
    set((s) => ({
      activeApp: typeof app === "function" ? (app as (p: AppKey) => AppKey)(s.activeApp) : app,
    })),
  setOpenApps: (apps) => set({ openApps: apps }),
  openApp: (app) => {
    const state = get()
    if (state.openApps.includes(app)) {
      // Move to top if already open
      set((s) => ({
        openApps: [...s.openApps.filter(a => a !== app), app],
        activeApp: app
      }))
    } else {
      // Add new app
      set((s) => ({
        openApps: [...s.openApps, app],
        activeApp: app
      }))
    }
  },
  closeApp: (app) => {
    set((s) => ({
      openApps: s.openApps.filter(a => a !== app),
      activeApp: s.activeApp === app ? (s.openApps.length > 1 ? s.openApps[s.openApps.length - 2] : null) : s.activeApp
    }))
  },
  focusApp: (app) => {
    set((s) => ({
      openApps: [...s.openApps.filter(a => a !== app), app],
      activeApp: app
    }))
  },
  openPalette: () => set({ activeApp: "palette" }),
  closePalette: () => set({ activeApp: null })
}))
