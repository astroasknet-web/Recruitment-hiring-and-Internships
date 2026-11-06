/** The YugtyJobs mark: a briefcase-shaped QR tile in the Hire blue-to-violet gradient. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="yj-m" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3d8bff" />
          <stop offset="1" stopColor="#8b5cff" />
        </linearGradient>
      </defs>
      <rect x="2" y="8" width="28" height="20" rx="5" fill="url(#yj-m)" />
      <path d="M11 8V6.5A2.5 2.5 0 0 1 13.5 4h5A2.5 2.5 0 0 1 21 6.5V8" stroke="url(#yj-m)" strokeWidth="2.2" fill="none" />
      <g fill="#04060f">
        <rect x="8" y="13" width="5" height="5" rx="1" />
        <rect x="19" y="13" width="5" height="5" rx="1" />
        <rect x="8" y="21" width="5" height="3" rx="1" />
        <rect x="15" y="16" width="3" height="3" rx=".6" />
        <rect x="19" y="21" width="5" height="3" rx="1" />
      </g>
    </svg>
  );
}
