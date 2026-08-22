import { useEffect, useRef, useState } from "react";
import { SetaDireita } from "../Icones";
import { BLOCOS, CLASSES } from "../terminal";
import { esperarOcioso, esperarPerto, suportaCenas3D } from "../tres/qualidade";

/** Malha de arame que ondula atrás do herói. */
function Terreno() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !suportaCenas3D()) return;

    let vivo = true;
    let destruir: (() => void) | undefined;

    (async () => {
      await esperarOcioso();
      if (!vivo) return;
      const { montarTerreno } = await import("../tres/heroiTerreno");
      if (!vivo || !ref.current) return;
      destruir = montarTerreno(ref.current);
    })();

    return () => {
      vivo = false;
      destruir?.();
    };
  }, []);

  return <div className="heroi-3d" ref={ref} aria-hidden="true" />;
}

/**
 * Janela de terminal em 3D. Enquanto a cena não sobe, fica no ar a mesma
 * janela em HTML — que é também o que aparelho fraco e leitor de tela recebem.
 */
function Janela() {
  const palcoRef = useRef<HTMLDivElement | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const el = palcoRef.current;
    if (!el || !suportaCenas3D()) return;

    let vivo = true;
    let destruir: (() => void) | undefined;

    (async () => {
      await esperarPerto(el);
      await esperarOcioso();
      if (!vivo) return;

      const { montarJanela } = await import("../tres/janelaTerminal");
      if (!vivo || !palcoRef.current) return;

      destruir = await montarJanela(palcoRef.current);
      if (!vivo) {
        destruir?.();
        return;
      }
      setPronto(true);
    })();

    return () => {
      vivo = false;
      destruir?.();
    };
  }, []);

  return (
    <div className={pronto ? "janela-3d pronto" : "janela-3d"}>
      <div className="janela-3d__palco" ref={palcoRef} aria-hidden="true" />
      <div className="janela janela-3d__texto">
        <div className="janela__topo">
          <i />
          <i />
          <i />
          <span>entrega — calango lab</span>
        </div>
        <div className="janela__corpo">
          {BLOCOS.map((bloco) => (
            <div key={bloco.arquivo} style={{ marginBottom: "var(--s3)" }}>
              {bloco.linhas
                .filter((l) => l.t)
                .map((l, i) => (
                  <div key={i} className={CLASSES[l.tipo]}>
                    {l.t}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Heroi() {
  return (
    <>
      <div className="ambiente ambiente--topo">
        <div className="veu" />
        <div className="grade-fundo" />
        <Terreno />
        <div className="aurora aurora--verde" />
        <div className="aurora aurora--ocre" />
        <div className="veu-texto" />
      </div>

      <section className="heroi" data-marco="true">
        <div className="container conteudo">
          <div className="heroi__grade">
            <div>
              <span
                className="pilula"
                data-entrada="true"
                style={{ "--atraso": "0ms" } as React.CSSProperties}
              >
                Estúdio de software · desde 2013
              </span>

              <h1
                data-entrada="true"
                style={{ "--atraso": "70ms" } as React.CSSProperties}
              >
                Sites, lojas e os{" "}
                <span className="brilho">sistemas que os sustentam.</span>
              </h1>

              <p
                className="lead"
                data-entrada="true"
                style={{ "--atraso": "140ms" } as React.CSSProperties}
              >
                Para empresas que precisam de mais que uma vitrine: loja
                integrada ao estoque, portal com área restrita, sistemas que
                enfim conversam entre si e rotina que roda sozinha. Doze anos
                desenvolvendo, integrando e mantendo — com desenvolvimento,
                DevOps e infraestrutura na mesma casa, do orçamento à
                manutenção.
              </p>

              <div
                className="linha"
                data-entrada="true"
                style={{ "--atraso": "210ms" } as React.CSSProperties}
              >
                <a className="botao botao--primario" href="/contato">
                  Conversar sobre o projeto <SetaDireita />
                </a>
                <a className="botao botao--fantasma" href="/portfolio">
                  Ver portfólio
                </a>
              </div>

              <div
                className="prova"
                data-entrada="true"
                style={{ "--atraso": "280ms" } as React.CSSProperties}
              />
            </div>

            <div
              data-entrada="true"
              style={{ "--atraso": "210ms" } as React.CSSProperties}
            >
              <Janela />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
