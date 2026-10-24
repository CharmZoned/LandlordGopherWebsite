/** Decorative suburban backdrop drawn behind the mascot in the hero. */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe2f7" />
          <stop offset="1" stopColor="#f3f8fe" />
        </linearGradient>
        <linearGradient id="hero-lawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc254" />
          <stop offset="1" stopColor="#4f9a35" />
        </linearGradient>
        <linearGradient id="hero-siding" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa8c8" />
          <stop offset="1" stopColor="#7891b3" />
        </linearGradient>
      </defs>

      <rect width="600" height="560" fill="url(#hero-sky)" />

      {/* Tree line */}
      <g fill="#5d9447">
        <ellipse cx="40" cy="330" rx="70" ry="90" />
        <ellipse cx="560" cy="300" rx="80" ry="110" />
        <ellipse cx="130" cy="350" rx="50" ry="60" fill="#6aa451" />
      </g>

      {/* House */}
      <g>
        <path d="M180 380V230l140-95 160 95v150Z" fill="url(#hero-siding)" />
        <path d="M160 240 320 128l185 112" fill="none" stroke="#44566f" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M400 380V250h120v130Z" fill="url(#hero-siding)" />
        <path d="M388 258 460 205l78 53" fill="none" stroke="#44566f" strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" />
        <g stroke="#6a83a5" strokeWidth="2" opacity="0.55">
          <path d="M180 262h220M180 292h220M180 322h220M180 352h220M400 282h120M400 312h120M400 342h120" />
        </g>
        <g fill="#f7fbff" stroke="#ffffff" strokeWidth="6">
          <rect x="285" y="175" width="70" height="52" rx="2" />
          <rect x="205" y="268" width="62" height="64" rx="2" />
          <rect x="425" y="285" width="70" height="56" rx="2" />
        </g>
        <g fill="#b9d3ee">
          <rect x="290" y="180" width="60" height="42" />
          <rect x="210" y="273" width="52" height="54" />
          <rect x="430" y="290" width="60" height="46" />
        </g>
        <g stroke="#ffffff" strokeWidth="3">
          <path d="M320 180v42M290 201h60M236 273v54M210 300h52M460 290v46M430 313h60" />
        </g>
        {/* Porch and door */}
        <path d="M285 380v-92h86v92Z" fill="#f7fbff" />
        <rect x="306" y="300" width="44" height="80" fill="#3d5270" />
        <path d="M270 292h116" stroke="#f7fbff" strokeWidth="10" strokeLinecap="round" />
      </g>

      {/* Shrubs */}
      <g fill="#4e8a3a">
        <ellipse cx="200" cy="385" rx="38" ry="22" />
        <ellipse cx="400" cy="388" rx="34" ry="20" />
        <ellipse cx="520" cy="388" rx="40" ry="22" />
      </g>

      {/* Lawn and walkway */}
      <path d="M0 380h600v180H0Z" fill="url(#hero-lawn)" />
      <path d="M306 380h44l90 180H230Z" fill="#e7edf3" />
      <path d="M0 470c150-20 420-25 600-10v100H0Z" fill="#5aa63e" opacity="0.55" />
    </svg>
  );
}
