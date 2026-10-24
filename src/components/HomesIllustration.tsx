/** Decorative pale-blue row of homes used beside section copy. */
export function HomesIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 150" aria-hidden="true" focusable="false">
      <g fill="#e1ecf8">
        <path d="M30 150V90l-10 4 40-50 40 50-10-4v60Z" />
        <path d="M270 150v-55l-12 4 42-55 42 55-12-4v55Z" />
        <ellipse cx="60" cy="146" rx="60" ry="8" />
        <ellipse cx="300" cy="146" rx="60" ry="8" />
      </g>
      <path d="M95 150V85l85-60 85 60v65Z" fill="#cfdff2" />
      <path d="M85 92 180 22l95 70" fill="none" stroke="#b6cdea" strokeWidth="10" strokeLinejoin="round" />
      <g fill="#f4f8fd">
        <rect x="120" y="98" width="34" height="28" rx="2" />
        <rect x="206" y="98" width="34" height="28" rx="2" />
        <rect x="164" y="104" width="32" height="46" rx="2" />
        <rect x="166" y="54" width="28" height="24" rx="2" />
      </g>
    </svg>
  );
}
