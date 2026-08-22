import { Cabecalho } from "./Cabecalho";
import { Rodape } from "./Rodape";
import { useEfeitosDaPagina } from "./ganchos";
import { Heroi } from "./secoes/Heroi";
import { Numeros } from "./secoes/Numeros";
import { Diagnostico } from "./secoes/Diagnostico";
import { Servicos } from "./secoes/Servicos";
import { Fluxo } from "./secoes/Fluxo";
import { Processo } from "./secoes/Processo";
import { Tecnologias } from "./secoes/Tecnologias";
import { Sobre } from "./secoes/Sobre";
import { Chamada } from "./secoes/Chamada";
import "./estilo.css";

export default function CalangoApp() {
  useEfeitosDaPagina();

  return (
    <>
      <a className="sr-only" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Heroi />
        <Numeros />
        <Diagnostico />
        <Servicos />
        <Fluxo />
        <Processo />
        <Tecnologias />
        <Sobre />
        <Chamada />
      </main>
      <Rodape />
    </>
  );
}
