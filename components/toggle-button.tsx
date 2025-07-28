"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-16 items-center rounded-full bg-gray-200 px-1 transition-colors duration-500 dark:bg-card"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white foregroundshadow-md transition-all duration-500 ease-in-out transform ${
          isDark ? "translate-x-8 rotate-180" : "translate-x-0 rotate-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-gray-700 transition-opacity duration-500 rotate-180" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500 transition-opacity duration-500" />
        )}
      </div>
    </button>
  )
}
