import { SetaDireita } from "../Icones";

export function Sobre() {
  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="problema__grade">
          <div data-revela={0}>
            <span className="rot">Sobre</span>
            <h2 style={{ marginTop: "var(--s4)" }}>Quem constrói e quem mantém</h2>
          </div>

          <div className="pilha pilha--larga" data-revela={1}>
            <p className="lead">
              Doze anos construindo para a web — tempo suficiente para ter visto
              site nascer, dar resultado, envelhecer mal e precisar ser
              resgatado. É isso que ensina a construir pensando no que vem
              depois da entrega, e não só no dia do lançamento.
            </p>
            <p>
              Somos três, uma pessoa por ofício: desenvolvimento, DevOps e
              infraestrutura. Quem escreve o sistema está na mesma sala de quem
              mantém o servidor de pé — e é aí, na emenda entre construir e
              sustentar, que projeto costuma morrer.
            </p>
            <div className="linha">
              <a className="botao botao--fantasma" href="/equipe">
                Conhecer a equipe
              </a>
              <a className="botao botao--texto" href="/sobre">
                Sobre o Calango Lab <SetaDireita />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
