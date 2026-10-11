export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="velora-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#velora-grain)" />
      </svg>
    </div>
  );
}
