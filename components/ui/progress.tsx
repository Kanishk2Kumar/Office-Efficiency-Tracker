import React from "react"

interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div className={`w-full h-2 rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
