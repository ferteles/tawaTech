const PASSOS = [
  {
    titulo: "Conversa",
    texto: "Entender o problema. Sem compromisso e sem cobrança.",
  },
  {
    titulo: "Diagnóstico",
    texto:
      "Proposta com escopo, prazo e valor fechados. Você sabe o que vai receber e quanto custa antes de assinar.",
  },
  {
    titulo: "Construção",
    texto:
      "Entregas parciais. A cada etapa você valida, e o que estiver fora do esperado é corrigido antes de seguir.",
  },
  {
    titulo: "Entrega",
    texto: "Sistema no ar, equipe treinada, documentação na mão.",
  },
  {
    titulo: "Continuidade",
    texto: "Manutenção e evolução, para o sistema envelhecer bem.",
  },
];

export function Processo() {
  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="cabeca" data-revela={0}>
          <span className="rot">Processo</span>
          <h2>Como o trabalho anda</h2>
          <p className="lead">
            Cinco etapas com data e entrega. Você vê o caminho inteiro antes de
            assinar — e valida cada trecho antes que o próximo comece.
          </p>
        </div>

        <div className="trilha">
          <span className="trilha__fio" aria-hidden="true" />
          {PASSOS.map((p, i) => (
            <div className="passo" data-revela={i} key={p.titulo}>
              <span className="passo__marca" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
