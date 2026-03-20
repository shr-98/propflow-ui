/**
 * PropFlowLogo
 * ─────────────────────────────────────────────────────────────────────────────
 * ORIGINAL LOGO DESIGN — not derived from any third-party mark.
 *
 * Concept: A stylised "P" formed from two overlapping arcs suggesting:
 *   • upward movement / property towers  (arc)
 *   • interconnected spaces / workflows  (circle cutout)
 * The wordmark uses DM Sans, bold weight, sage-600 colour.
 *
 * This is entirely original artwork — no Godrej trefoil or any registered
 * trademark has been referenced in its construction.
 */

interface PropFlowLogoProps {
  collapsed?: boolean
  className?: string
}

export function PropFlowLogo({ collapsed = false, className = '' }: PropFlowLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* ── Mark ── */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Outer arc — represents a building/property silhouette */}
        <path
          d="M6 28 L6 10 Q6 4 16 4 Q26 4 26 12 Q26 20 16 20 L6 20"
          stroke="#35a571"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner accent dot — "place pin" metaphor */}
        <circle cx="16" cy="12" r="3" fill="#35a571" opacity="0.7" />
        {/* Ground line — stability */}
        <line
          x1="4"
          y1="28"
          x2="28"
          y2="28"
          stroke="#35a571"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      {/* ── Wordmark ── */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-[15px] text-sage-700 tracking-tight">
            PropFlow
          </span>
          <span className="font-body text-[9px] font-medium text-stone-400 tracking-widest uppercase">
            FM Suite
          </span>
        </div>
      )}
    </div>
  )
}
