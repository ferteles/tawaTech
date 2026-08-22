import { useCallback, useEffect, useRef, useState } from "react";
import { ETAPAS } from "../etapas";
import { SetaDireita, SetaEsquerda } from "../Icones";
import { esperarOcioso, esperarPerto, suportaCenas3D } from "../tres/qualidade";
import type { CenaFluxo } from "../tres/fluxoCena";

export function Fluxo() {
  const [ativo, setAtivo] = useState(0);
  const [tem3d, setTem3d] = useState(false);

  const fluxoRef = useRef<HTMLDivElement | null>(null);
  const palcoRef = useRef<HTMLDivElement | null>(null);
  const rotulosRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cenaRef = useRef<CenaFluxo | null>(null);

  useEffect(() => {
    const raiz = fluxoRef.current;
    if (!raiz || !suportaCenas3D()) return;

    let vivo = true;
    let destruir: (() => void) | undefined;

    (async () => {
      await esperarPerto(raiz);
      await esperarOcioso();
      if (!vivo) return;

      const { montarFluxo } = await import("../tres/fluxoCena");
      if (!vivo) return;

      // O palco só ganha tamanho depois que .fluxo--3d entra na folha de estilo.
      setTem3d(true);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (!vivo || !palcoRef.current) return;

      const cena = montarFluxo({
        palco: palcoRef.current,
        rotulos: rotulosRef.current,
        aoMudarEtapa: setAtivo,
      });
      cenaRef.current = cena;
      destruir = cena.destruir;
    })();

    return () => {
      vivo = false;
      cenaRef.current = null;
      destruir?.();
    };
  }, []);

  const irPara = useCallback((i: number) => {
    const alvo = ((i % ETAPAS.length) + ETAPAS.length) % ETAPAS.length;
    if (cenaRef.current) cenaRef.current.irPara(alvo);
    else setAtivo(alvo);
  }, []);

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      irPara(ativo + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      irPara(ativo - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      irPara(0);
    } else if (e.key === "End") {
      e.preventDefault();
      irPara(ETAPAS.length - 1);
    }
  };

  const etapa = ETAPAS[ativo];

  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="cabeca">
          <span className="rot">Como um sistema nasce</span>
          <h2>O caminho, em cinco etapas</h2>
          <p className="lead">
            Arraste para girar, passe o cursor pelos nós, clique num deles ou
            use as setas do teclado. É o mesmo fluxo que roda em todo projeto —
            só que dá para andar por ele.
          </p>
        </div>

        <div
          className={tem3d ? "fluxo fluxo--3d" : "fluxo"}
          ref={fluxoRef}
          tabIndex={-1}
          onKeyDown={aoTeclar}
        >
          <div className="fluxo__grade">
            <div className="fluxo__palco" ref={palcoRef}>
              {ETAPAS.map((e, i) => (
                <span
                  key={e.titulo}
                  ref={(el) => {
                    rotulosRef.current[i] = el;
                  }}
                  className={
                    i === ativo ? "fluxo__rotulo ativo" : "fluxo__rotulo"
                  }
                  onClick={() => irPara(i)}
                >
                  {e.titulo}
                </span>
              ))}
            </div>

            <div className="fluxo__painel">
              <div className="fluxo__painel-texto">
                <span className="rot">
                  <span className="n">{String(ativo + 1).padStart(2, "0")}</span>{" "}
                  / Etapa
                </span>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </div>

              <div className="fluxo__nav">
                <button
                  className="fluxo__seta"
                  type="button"
                  aria-label="Etapa anterior"
                  onClick={() => irPara(ativo - 1)}
                >
                  <SetaEsquerda />
                </button>
                <span
                  className="fluxo__barra"
                  aria-hidden="true"
                  style={
                    {
                      "--avanco": (ativo + 1) / ETAPAS.length,
                    } as React.CSSProperties
                  }
                />
                <button
                  className="fluxo__seta"
                  type="button"
                  aria-label="Próxima etapa"
                  onClick={() => irPara(ativo + 1)}
                >
                  <SetaDireita />
                </button>
              </div>
            </div>

            <ol className="fluxo__lista">
              {ETAPAS.map((e, i) => (
                <li key={e.titulo} aria-current={i === ativo ? "step" : "false"}>
                  <button
                    className="fluxo__item-botao"
                    type="button"
                    onClick={() => irPara(i)}
                  >
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    <b>{e.titulo}</b>
                    <span>{e.texto}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
