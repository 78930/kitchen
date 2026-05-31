export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Madhu's Kitchen logo"
    >
      {/* Background */}
      <rect width="44" height="44" rx="10" fill="#0F3D2E" />
      {/* Gold border */}
      <rect x="0.75" y="0.75" width="42.5" height="42.5" rx="9.25" stroke="#F3B942" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Flame */}
      <path
        d="M22 17 C20 14 18.5 11 22 7 C25.5 11 24 14 22 17Z"
        fill="#F3B942"
      />
      {/* Inner flame highlight */}
      <path
        d="M22 15.5 C21.2 13.5 20.8 11.5 22 9.2 C23.2 11.5 22.8 13.5 22 15.5Z"
        fill="#0F3D2E"
        opacity="0.35"
      />

      {/* Side accent lines flanking flame base */}
      <line x1="12.5" y1="18" x2="18" y2="18" stroke="#F3B942" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1="26" y1="18" x2="31.5" y2="18" stroke="#F3B942" strokeWidth="0.75" strokeOpacity="0.55" />

      {/* M letterform */}
      <path
        d="M10 34 L10 20 L22 28.5 L34 20 L34 34"
        stroke="#F3B942"
        strokeWidth="2.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Decorative base line */}
      <line x1="13" y1="37.5" x2="31" y2="37.5" stroke="#F3B942" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
  )
}
