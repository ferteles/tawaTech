import { WhatsApp } from "../Icones";
import { WHATSAPP } from "../links";

export function Chamada() {
  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="chamada" data-revela={0}>
          <div className="ambiente">
            <div className="grade-fundo" />
          </div>

          <div className="conteudo">
            <span className="pilula">Primeira conversa sem custo</span>
            <h2 style={{ marginBlock: "var(--s5)" }}>
              Conte o que precisa. <span className="brilho">Dizemos se dá.</span>
            </h2>
            <p className="lead">
              Primeira conversa sem custo e sem compromisso. Se o Calango Lab
              não for a melhor opção para o seu caso, você ouve isso na primeira
              conversa — não depois de assinar.
            </p>
            <div className="linha">
              <a className="botao botao--primario" href={WHATSAPP}>
                <WhatsApp /> Falar no WhatsApp
              </a>
              <a className="botao botao--fantasma" href="/contato">
                Escrever por aqui
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
