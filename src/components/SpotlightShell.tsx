'use client'

import type { ReactNode, PointerEvent } from 'react'

export default function SpotlightShell({
  children,
}: {
  children: ReactNode
}) {
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative min-h-screen"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(56, 189, 248, 0.15), transparent 40%)',
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}