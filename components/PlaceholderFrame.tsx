/**
 * Stand-in for real photography. Flat fill + hairline border, fixed aspect —
 * swap for next/image later without touching call sites or layout.
 */
export default function PlaceholderFrame({
  aspect = '4 / 3',
  className = '',
}: {
  aspect?: string
  className?: string
}) {
  return (
    <div
      className={`rounded-[14px] border border-hairline bg-ground-alt ${className}`}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    />
  )
}
