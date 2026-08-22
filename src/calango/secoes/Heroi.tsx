import { SetaDireita } from "../Icones";

const BLOCOS: { linha: string; cor?: string }[][] = [
  [
    { linha: "$ git checkout -b ordens-de-servico" },
    { linha: "Switched to a new branch 'ordens-de-servico'" },
    { linha: "$ cat requisitos.md" },
    { linha: "# 12 regras levantadas com quem usa", cor: "c-fraco" },
    { linha: "# 9 telas mapeadas, 3 integrações", cor: "c-fraco" },
  ],
  [
    { linha: "$ npm run dev" },
    { linha: "▲ pronto em 1.4s", cor: "c-ocre" },
    { linha: "  app/ordens/page.tsx      ✓", cor: "c-verde" },
    { linha: "  lib/regras/estoque.ts    ✓", cor: "c-verde" },
    { linha: "  lib/regras/prazo.ts      ✓", cor: "c-verde" },
  ],
  [
    { linha: "$ npm test" },
    { linha: " PASS  lib/regras/estoque.test.ts", cor: "c-verde" },
    { linha: " PASS  lib/regras/prazo.test.ts", cor: "c-verde" },
    { linha: " 2 suítes · 34 testes · 1.9s" },
  ],
  [
    { linha: '$ git commit -m "entrega 3: ordens"' },
    { linha: " 14 arquivos alterados" },
    { linha: "$ vercel --prod" },
    { linha: " ● build 42s", cor: "c-ocre" },
    { linha: " ● sistema no ar", cor: "c-verde" },
  ],
];

export function Heroi() {
  return (
    <>
      <div className="ambiente ambiente--topo">
        <div className="veu" />
        <div className="grade-fundo" />
        <div className="heroi-3d" aria-hidden="true" />
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
              <div className="janela-3d">
                <div className="janela-3d__palco" aria-hidden="true" />
                <div className="janela janela-3d__texto">
                  <div className="janela__topo">
                    <i />
                    <i />
                    <i />
                    <span>entrega — calango lab</span>
                  </div>
                  <div className="janela__corpo">
                    {BLOCOS.map((bloco, i) => (
                      <div key={i} style={{ marginBottom: "var(--s3)" }}>
                        {bloco.map((l, j) => (
                          <div key={j} className={l.cor}>
                            {l.linha}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
