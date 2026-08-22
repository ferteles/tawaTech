const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SetaDireita() {
  return (
    <svg {...base} strokeWidth={2.2}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function SetaEsquerda() {
  return (
    <svg {...base} strokeWidth={2.2}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function WhatsApp() {
  return (
    <svg {...base} strokeWidth={2}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Carrinho() {
  return (
    <svg {...base} strokeWidth={2}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2.5l2.2 11.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  );
}

export function Codigo() {
  return (
    <svg {...base} strokeWidth={2}>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}

export function Janela() {
  return (
    <svg {...base} strokeWidth={2}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 4v5" />
    </svg>
  );
}

export function No() {
  return (
    <svg {...base} strokeWidth={2}>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.5 6H14a3 3 0 0 1 3 3v6.5" />
      <path d="M5 8.5V15a3 3 0 0 0 3 3h8.5" />
    </svg>
  );
}

export function Faisca() {
  return (
    <svg {...base} strokeWidth={2}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M18.5 4.5v3M20 6h-3" />
    </svg>
  );
}
