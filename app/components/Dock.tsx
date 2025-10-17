"use client"

import type React from "react"
import { User, Images, FileText, Palette, MessageCircle, BookOpen } from "lucide-react"
import type { AppKey } from "@/lib/ui-store"

const ACCENT = "#FF2E63"

type DockItem = {
  key: Exclude<AppKey, "palette" | null>
  label: string
  icon: React.ComponentType<any>
}

const ITEMS: DockItem[] = [
  { key: "about", label: "About", icon: User },
  { key: "projects", label: "Projects", icon: Images },
  { key: "talk", label: "Contact", icon: MessageCircle },
  { key: "experience", label: "Experience", icon: FileText },
  { key: "blog", label: "Blog", icon: BookOpen },
]

export default function Dock({
  activeApp = null,
  onOpen = () => {},
  onOpenPalette = () => {},
}: {
  activeApp?: AppKey | null
  onOpen?: (k: Exclude<AppKey, "palette" | null>) => void
  onOpenPalette?: () => void
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-white border-[3px] border-black shadow-[6px_6px_0_0_#000]">
      {ITEMS.map((it) => {
        const Icon = it.icon
        const isActive = activeApp === it.key
        return (
          <button
            key={it.key}
            onClick={() => onOpen(it.key)}
            className={`relative flex flex-col items-center gap-1 w-20 h-20 border-[3px] rounded-lg transition-all duration-200 focus-visible:outline-4 hover:translate-y-[-2px] border-black bg-[#FAFAF0] ${
              isActive ? "shadow-[6px_6px_0_0_#000]" : "shadow-[4px_4px_0_0_#000]"
            }`}
            style={{ outlineColor: ACCENT }}
            aria-label={it.label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-semibold text-black leading-none">{it.label}</span>
          </button>
        )
      })}
      <div className="mx-1 w-[2px] self-stretch bg-black/20" />
      <button
        onClick={onOpenPalette}
        className="relative flex flex-col items-center gap-1 w-20 h-20 border-[3px] rounded-lg transition-all duration-200 focus-visible:outline-4 hover:translate-y-[-2px] border-black bg-[#FAFAF0] shadow-[4px_4px_0_0_#000]"
        style={{ outlineColor: ACCENT }}
        aria-label="Command Palette"
        title="Command Palette"
      >
        <Palette className="w-6 h-6" />
        <span className="text-xs font-semibold text-black leading-none">Search</span>
      </button>
    </div>
  )
}
