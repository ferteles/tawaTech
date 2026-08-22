/**
 * Níveis de qualidade das cenas 3D, como no site original: o nível é escolhido
 * pelo aparelho e pode cair sozinho se os quadros começarem a atrasar.
 */
export type Qualidade = {
  pixelRatio: number;
  antialias: boolean;
  malha: [number, number];
  particulas: number;
  tubo: number;
  texturaDpr: number;
};

const NIVEIS: Record<number, Qualidade> = {
  0: {
    pixelRatio: 1.75,
    antialias: true,
    malha: [56, 38],
    particulas: 70,
    tubo: 220,
    texturaDpr: 2,
  },
  1: {
    pixelRatio: 1.35,
    antialias: true,
    malha: [44, 30],
    particulas: 44,
    tubo: 140,
    texturaDpr: 1.5,
  },
  2: {
    pixelRatio: 1,
    antialias: false,
    malha: [40, 26],
    particulas: 26,
    tubo: 90,
    texturaDpr: 1,
  },
};

let nivelAtual: number | null = null;
const ouvintes = new Set<(nivel: number) => void>();

function detectar(): number {
  if (typeof navigator === "undefined") return 1;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const memoria = nav.deviceMemory ?? 8;
  const nucleos = nav.hardwareConcurrency ?? 8;
  const toque = matchMedia("(pointer: coarse)").matches;
  if (memoria <= 4 || nucleos <= 4) return 2;
  if (toque && innerWidth < 900) return 1;
  return 0;
}

export function nivel(): number {
  if (nivelAtual === null) nivelAtual = detectar();
  return nivelAtual;
}

export function qualidade(): Qualidade {
  return NIVEIS[nivel()];
}

/** Avisa quando a qualidade cai um degrau. Devolve a função de cancelamento. */
export function aoCairQualidade(f: (nivel: number) => void) {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
}

const ORCAMENTO = 1000 / 45;
let quadros = 0;
let amostras: number[] = [];

/** Registra a duração de um quadro; se a mediana passar do orçamento, cai um degrau. */
export function registrarQuadro(dt: number) {
  if (++quadros <= 20 || nivel() >= 2 || dt > 400) return;
  amostras.push(dt);
  if (amostras.length < 30) return;

  amostras.sort((a, b) => a - b);
  const mediana = amostras[15];
  amostras = [];

  if (mediana > ORCAMENTO) {
    const atual = nivel();
    if (atual >= 2) return;
    nivelAtual = atual + 1;
    ouvintes.forEach((f) => f(nivelAtual as number));
  }
}

/**
 * O aparelho aguenta as cenas 3D? Mesma checagem do site: sem movimento
 * reduzido, sem economia de dados, sem conexão lenta, sem aparelho fraco.
 */
export function suportaCenas3D(): boolean {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (/^([23]g|slow-2g)$/.test(nav.connection?.effectiveType ?? "")) return false;
  if ((nav.deviceMemory ?? 8) <= 2) return false;
  if (matchMedia("(pointer: coarse)").matches && innerWidth < 900) return false;
  return true;
}

/** Espera a página carregar e o navegador ficar ocioso antes de montar a cena. */
export function esperarOcioso(): Promise<void> {
  return new Promise((resolve) => {
    const ocioso = () => {
      const w = window as Window & {
        requestIdleCallback?: (f: () => void, o?: { timeout: number }) => void;
      };
      if (w.requestIdleCallback) w.requestIdleCallback(() => resolve(), { timeout: 2000 });
      else setTimeout(resolve, 300);
    };
    if (document.readyState === "complete") ocioso();
    else addEventListener("load", ocioso, { once: true });
  });
}

/** Espera o elemento chegar perto da viewport (400px) antes de montar a cena. */
export function esperarPerto(el: Element): Promise<void> {
  return new Promise((resolve) => {
    const olho = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        olho.disconnect();
        resolve();
      },
      { rootMargin: "400px" }
    );
    olho.observe(el);
  });
}
