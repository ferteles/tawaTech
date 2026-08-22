const TECNOLOGIAS = [
  "WordPress",
  "Nuxt",
  "Next.js",
  "PHP",
  "JavaScript",
  "Astro",
  "MySQL",
  "Tailwind",
];

export function Tecnologias() {
  return (
    <section className="secao" style={{ paddingBlock: "var(--s8)" }}>
      <div className="container">
        <p
          className="rot"
          style={{
            justifyContent: "center",
            width: "100%",
            marginBottom: "var(--s5)",
          }}
        >
          A ferramenta certa é a que se mantém bem depois da entrega
        </p>
      </div>

      <div className="marquise" aria-hidden="true">
        <div className="marquise__trilho">
          {[...TECNOLOGIAS, ...TECNOLOGIAS].map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <p className="sr-only">Tecnologias: {TECNOLOGIAS.join(", ")}.</p>
    </section>
  );
}
