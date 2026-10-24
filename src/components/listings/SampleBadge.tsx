export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-white/95 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm ${className}`}
    >
      Sample listing
    </span>
  );
}

export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start justify-center gap-2.5 rounded-lg border border-gold-500/40 bg-[#fdf5df] px-4 py-3 text-sm text-navy-900 sm:items-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950 sm:mt-0"
      >
        !
      </span>
      <span>Design preview — sample properties, photos and prices. Not live availability.</span>
    </p>
  );
}
