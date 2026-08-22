export type TipoLinha = "cmd" | "saida" | "nota" | "ok" | "destaque";

export type BlocoTerminal = {
  arquivo: string;
  linhas: { t: string; tipo: TipoLinha }[];
};

export const CORES: Record<TipoLinha, string> = {
  cmd: "#FFFFFF",
  saida: "#999999",
  nota: "#666666",
  ok: "#FF0000",
  destaque: "#999999",
};

/** Classe CSS equivalente à cor, usada na versão em HTML da janela. */
export const CLASSES: Partial<Record<TipoLinha, string>> = {
  ok: "c-ok",
  destaque: "c-destaque",
  nota: "c-fraco",
};

export const BLOCOS: BlocoTerminal[] = [
  {
    arquivo: "levantamento",
    linhas: [
      { t: "$ git checkout -b ordens-de-servico", tipo: "cmd" },
      { t: "Switched to a new branch 'ordens-de-servico'", tipo: "saida" },
      { t: "", tipo: "saida" },
      { t: "$ cat requisitos.md", tipo: "cmd" },
      { t: "# 12 regras levantadas com quem usa", tipo: "nota" },
      { t: "# 9 telas mapeadas, 3 integrações", tipo: "nota" },
    ],
  },
  {
    arquivo: "implementação",
    linhas: [
      { t: "$ npm run dev", tipo: "cmd" },
      { t: "▲ pronto em 1.4s", tipo: "destaque" },
      { t: "", tipo: "saida" },
      { t: "  app/ordens/page.tsx      ✓", tipo: "ok" },
      { t: "  lib/regras/estoque.ts    ✓", tipo: "ok" },
      { t: "  lib/regras/prazo.ts      ✓", tipo: "ok" },
    ],
  },
  {
    arquivo: "teste",
    linhas: [
      { t: "$ npm test", tipo: "cmd" },
      { t: "", tipo: "saida" },
      { t: " PASS  lib/regras/estoque.test.ts", tipo: "ok" },
      { t: " PASS  lib/regras/prazo.test.ts", tipo: "ok" },
      { t: "", tipo: "saida" },
      { t: " 2 suítes · 34 testes · 1.9s", tipo: "saida" },
    ],
  },
  {
    arquivo: "entrega",
    linhas: [
      { t: '$ git commit -m "entrega 3: ordens"', tipo: "cmd" },
      { t: " 14 arquivos alterados", tipo: "saida" },
      { t: "", tipo: "saida" },
      { t: "$ vercel --prod", tipo: "cmd" },
      { t: " ● build 42s", tipo: "destaque" },
      { t: " ● sistema no ar", tipo: "ok" },
    ],
  },
];

/** Total de caracteres de um bloco, contando a quebra de cada linha. */
export function tamanho(bloco: BlocoTerminal) {
  return bloco.linhas.reduce((soma, l) => soma + l.t.length + 1, 0);
}
