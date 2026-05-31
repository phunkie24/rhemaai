export default function BrandMark({ className = '', title = 'RhemaAI Solutions Ltd' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rhemaaiMarkGradient" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6B2ACF" />
          <stop offset="1" stopColor="#351071" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#rhemaaiMarkGradient)" />
      <circle cx="32" cy="32" r="25.4" fill="none" stroke="#FFFFFF" strokeWidth="3.2" />
      <path
        d="M44.6 22.6c-4.6-1.2-7.2.8-10.4 4.8l-4 5.2c-1.2 1.6-2.8 2.8-4.7 3.4l-14.1 4.5c4.4 3.8 10.4 4.7 16.1 2.4l-7.1 6.5c3.5 1.6 7.5.8 10.3-2.1l4.9-5.1c4.8-5 7.6-10.3 8.7-16.3.3-1.2.4-2.3.3-3.3Z"
        fill="#FFFFFF"
      />
      <path
        d="M34.9 27.4c3.1-5.9 6-8.4 10.1-7.6 2 .4 3.4 1.5 4.1 3.2 1.7-.3 3.1.1 4.4 1.3-2.9.5-5.2 1.8-7 4l-3.8 4.7c-2.1 2.6-4.8 4.7-7.9 6l-6.4 2.7c2.6-2.8 4.8-6.8 6.5-14.3Z"
        fill="#FFFFFF"
      />
      <path
        d="M19 16.6c4.2 4.3 9.2 7.7 15.4 10.1l9.5 3.7c-2.8 3.1-5.8 3.9-10 2.3l-9.8-3.8c-4.1-1.6-5.7-6.4-5.1-12.3Z"
        fill="#FFFFFF"
      />
      <path
        d="M13.5 26.1c5 3.7 11.1 5.9 18.1 6.8l4.8.6c-2.9 2.5-6.3 3.4-10.3 2.9l-5.2-.7c-4.1-.6-6.6-4.3-7.4-9.6Z"
        fill="#FFFFFF"
      />
      <path
        d="M17 34.4c4.5 1.3 9.6 1.4 15 .1l3.6-.9c-2.2 2.9-5.1 4.7-8.8 5.4l-3.9.8c-3.4.7-5.3-1.6-5.9-5.4Z"
        fill="#FFFFFF"
      />
      <path
        d="M33.5 14.2c-.2 5.8 1.7 10.5 5.5 14.2l4.6 4.5c-3.7-.8-7.1-2.7-10.1-5.7l-2.1-2.2c-2.7-2.8-2.4-6.7 2.1-10.8Z"
        fill="#FFFFFF"
      />
      <circle cx="43.1" cy="23.1" r="1.8" fill="#3E147A" />
    </svg>
  )
}
