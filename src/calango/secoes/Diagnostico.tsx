const SINTOMAS = [
  "O site está no ar há anos e nunca trouxe um contato que virasse cliente.",
  "Publicar uma página nova depende de abrir chamado com quem fez o site.",
  "A loja vende, mas alguém confere estoque e emite nota na mão, pedido a pedido.",
  "O que a empresa faz de melhor não aparece em lugar nenhum na internet.",
];

export function Diagnostico() {
  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="problema__grade">
          <div data-revela={0}>
            <span className="rot">O diagnóstico</span>
            <h2 style={{ marginTop: "var(--s4)" }}>Onde a maioria trava</h2>
          </div>

          <div>
            <div className="sintomas">
              {SINTOMAS.map((texto, i) => (
                <div className="sintoma" data-revela={i} key={i}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <p>{texto}</p>
                </div>
              ))}
            </div>

            <p className="veredito" data-revela={4}>
              Site bonito que não vende é despesa. Loja que não integra é
              trabalho dobrado.{" "}
              <span className="brilho">
                O que resolve é o que está por baixo.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
