/** Decorative illustrations for the About page. All are aria-hidden. */

type IllustrationProps = { className?: string };

const svgProps = { "aria-hidden": true, focusable: false } as const;

function Trees({ fill = "#cfe0f4" }: { fill?: string }) {
  return (
    <g fill={fill}>
      <ellipse cx="60" cy="180" rx="55" ry="60" />
      <ellipse cx="110" cy="200" rx="45" ry="45" />
      <ellipse cx="335" cy="180" rx="55" ry="60" />
      <ellipse cx="290" cy="205" rx="40" ry="40" />
    </g>
  );
}

/** Pale suburban street drawn inside the circular hero backdrop. */
export function AboutHeroBackdrop({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 600 560" preserveAspectRatio="xMidYMax slice" {...svgProps}>
      <defs>
        <linearGradient id="about-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9def5" />
          <stop offset="1" stopColor="#eef5fd" />
        </linearGradient>
      </defs>
      <rect width="600" height="560" fill="url(#about-sky)" />
      <g fill="#ffffff" opacity="0.7">
        <ellipse cx="420" cy="90" rx="70" ry="22" />
        <ellipse cx="470" cy="76" rx="42" ry="22" />
        <ellipse cx="150" cy="120" rx="55" ry="16" />
      </g>
      {/* Distant trees */}
      <g fill="#a9c8ea">
        <path d="M520 360 560 200l40 160Z" />
        <path d="M60 380 95 240l35 140Z" />
        <ellipse cx="470" cy="330" rx="50" ry="70" />
      </g>
      {/* Row of houses */}
      <g fill="#dbe8f7" stroke="#b3cdec" strokeWidth="4" strokeLinejoin="round">
        <path d="M330 400V300l70-55 70 55v100Z" />
        <path d="M440 410V290l80-62 80 62v120Z" />
        <path d="M180 400V320l55-45 55 45v80Z" />
      </g>
      <g fill="#f7fbff">
        <rect x="370" y="320" width="22" height="28" />
        <rect x="408" y="320" width="22" height="28" />
        <rect x="480" y="310" width="26" height="32" />
        <rect x="530" y="310" width="26" height="32" />
        <rect x="505" y="365" width="30" height="45" />
        <rect x="205" y="335" width="20" height="24" />
        <rect x="245" y="335" width="20" height="24" />
      </g>
      {/* Lawn and sidewalk */}
      <path d="M0 400h600v160H0Z" fill="#e3eefa" />
      <path d="M0 450c180-15 420-15 600 0v110H0Z" fill="#d3e4f6" />
      <path d="M200 560 300 420h40l-20 140Z" fill="#f4f8fd" />
    </svg>
  );
}

/** Small row of pale houses tucked into the "You matter to us" panel. */
export function HousesRow({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 240 90" {...svgProps}>
      <g fill="#c7dbf2">
        <path d="M200 90 220 30l20 60Z" />
        <path d="M0 90 14 50l14 40Z" />
      </g>
      <g fill="#dbe8f7" stroke="#b3cdec" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M30 90V60l25-20 25 20v30Z" />
        <path d="M78 90V50l32-25 32 25v40Z" />
        <path d="M142 90V58l26-20 26 20v32Z" />
      </g>
      <g fill="#f7fbff">
        <rect x="47" y="66" width="10" height="12" />
        <rect x="96" y="58" width="12" height="14" />
        <rect x="114" y="58" width="12" height="14" />
        <rect x="104" y="76" width="12" height="14" />
        <rect x="160" y="64" width="11" height="13" />
      </g>
    </svg>
  );
}

/** Gold outline house with a key, over soft blue trees (pricing philosophy). */
export function HouseKeyGold({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 400 260" {...svgProps}>
      <Trees />
      <path d="M20 245h360" stroke="#cfe0f4" strokeWidth="4" strokeLinecap="round" />
      <g fill="none" stroke="var(--color-gold-500)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 120 170 30l100 90" />
        <path d="M225 80V45h25v57" />
        <path d="M95 100v140h95" />
        <path d="M125 240v-80h40v80" />
        <path d="M125 190h40" />
        <circle cx="265" cy="165" r="38" />
        <circle cx="265" cy="165" r="12" />
        <path d="M292 192l75 60M330 222l-14 16M350 238l-14 16" />
      </g>
    </svg>
  );
}

/** Navy house with gold flag and key, inside a pale circle (buying and selling). */
export function HouseKeyNavy({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 400 260" {...svgProps}>
      <Trees fill="#c4d9f1" />
      <path d="M40 248h320" stroke="#b9d0ec" strokeWidth="5" strokeLinecap="round" />
      <path d="M115 248V130l85-75 85 75v118Z" fill="#ffffff" />
      <g fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="var(--color-navy-900)" d="M90 140 200 45l110 95" />
        <path stroke="var(--color-navy-900)" d="M115 130v118h170V130" />
        <path stroke="var(--color-navy-900)" d="M200 248v-80h40v80" fill="var(--color-navy-800)" />
        <path stroke="var(--color-gold-500)" d="M145 248v-90M145 160h30v28h-30" />
        <circle stroke="var(--color-gold-500)" cx="290" cy="175" r="30" />
        <circle stroke="var(--color-gold-500)" cx="290" cy="175" r="9" />
        <path stroke="var(--color-gold-500)" d="M312 196l55 45M340 219l-11 13M356 232l-11 13" />
      </g>
    </svg>
  );
}
