import * as THREE from "three";
import { qualidade, registrarQuadro } from "./qualidade";

export type Quadro = { t: number; dt: number; agora: number };

export type OpcoesPalco = {
  /** Elemento que recebe o canvas e define o tamanho da cena. */
  el: HTMLElement;
  cena: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  dprMax?: number;
  /** Limita a taxa de quadros (o site usa 30 nas cenas mais pesadas). */
  fpsMax?: number;
  /** Cena estática: desenha uma vez e não roda o laço. */
  parado?: boolean;
  aoQuadro?: (q: Quadro) => void;
  aoRedimensionar?: (largura: number, altura: number) => void;
};

export type Palco = {
  canvas: HTMLCanvasElement;
  renderizador: THREE.WebGLRenderer;
  desenhar: () => void;
  destruir: () => void;
};

/**
 * Monta um canvas WebGL dentro de `el` e roda o laço de animação só enquanto a
 * cena está visível e a aba está em primeiro plano.
 */
export function criarPalco(op: OpcoesPalco): Palco {
  const renderizador = new THREE.WebGLRenderer({
    alpha: true,
    antialias: qualidade().antialias,
    powerPreference: "low-power",
  });
  renderizador.setClearColor(0x000000, 0);

  const canvas = renderizador.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  op.el.appendChild(canvas);

  let visivel = true;
  let rodando = false;
  let ultimo = 0;
  let sobra = 0;
  let t = 0;

  const desenhar = () => renderizador.render(op.cena, op.camera);

  const medir = () => {
    const largura = op.el.clientWidth;
    const altura = op.el.clientHeight;
    if (!largura || !altura) return false;

    const dpr = Math.min(
      devicePixelRatio || 1,
      op.dprMax ?? 3,
      qualidade().pixelRatio
    );
    renderizador.setPixelRatio(dpr);
    renderizador.setSize(largura, altura, false);
    op.camera.aspect = largura / altura;
    op.camera.updateProjectionMatrix();
    op.aoRedimensionar?.(largura, altura);
    return true;
  };

  const parar = () => {
    if (!rodando) return;
    rodando = false;
    renderizador.setAnimationLoop(null);
  };

  const tocar = () => {
    if (rodando || document.hidden || !visivel || op.parado) return;
    rodando = true;
    ultimo = performance.now();
    renderizador.setAnimationLoop((agora) => {
      const bruto = agora - ultimo;
      ultimo = agora;
      registrarQuadro(bruto);

      const dt = Math.min(bruto / 1000, 0.25);

      if (op.fpsMax) {
        sobra += dt;
        if (sobra < 1 / op.fpsMax) return;
        t += sobra;
        op.aoQuadro?.({ t, dt: sobra, agora });
        sobra = 0;
      } else {
        t += dt;
        op.aoQuadro?.({ t, dt, agora });
      }

      desenhar();
    });
  };

  const olho = new IntersectionObserver(
    ([entrada]) => {
      visivel = entrada.isIntersecting;
      if (visivel) {
        if (op.parado) desenhar();
        tocar();
      } else {
        parar();
      }
    },
    { threshold: 0 }
  );
  olho.observe(op.el);

  const regua = new ResizeObserver(() => {
    if (medir() && op.parado) desenhar();
  });
  regua.observe(op.el);

  const aoTrocarAba = () => (document.hidden ? parar() : tocar());
  document.addEventListener("visibilitychange", aoTrocarAba);

  medir();
  desenhar();
  tocar();

  return {
    canvas,
    renderizador,
    desenhar: () => {
      medir();
      desenhar();
    },
    destruir: () => {
      parar();
      olho.disconnect();
      regua.disconnect();
      document.removeEventListener("visibilitychange", aoTrocarAba);
      renderizador.dispose();
      canvas.remove();
    },
  };
}
