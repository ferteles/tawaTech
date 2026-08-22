import * as THREE from "three";
import { BLOCOS, CORES, tamanho } from "../terminal";
import { criarPalco } from "./palco";
import { qualidade } from "./qualidade";

const MS_POR_CARACTERE = 22;
const PAUSA_ENTRE_BLOCOS = 2200;

/**
 * Janela de terminal flutuando em 3D, com o texto digitado numa textura de
 * canvas. Devolve a função de desmontagem.
 */
export async function montarJanela(el: HTMLElement): Promise<() => void> {
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A textura mede o texto: sem as fontes prontas ela sairia com a métrica errada.
  await document.fonts.ready;

  const dpr = Math.min(devicePixelRatio, qualidade().texturaDpr);

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    34,
    el.clientWidth / Math.max(el.clientHeight, 1),
    0.1,
    100
  );
  camera.position.z = 10;

  const textura2d = document.createElement("canvas");
  const ctx = textura2d.getContext("2d")!;
  const textura = new THREE.CanvasTexture(textura2d);
  textura.colorSpace = THREE.SRGBColorSpace;

  const fonte =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--fonte-mono")
      .trim() || "ui-monospace, monospace";

  let bloco = 0;
  let revelados = 0;
  let pisca = 0;

  /** Recorta o bloco atual até o número de caracteres já digitados. */
  const linhasVisiveis = (indice: number, chars: number) => {
    const saida: { t: string; tipo: keyof typeof CORES }[] = [];
    let resto = chars;
    for (const linha of BLOCOS[indice].linhas) {
      if (resto <= 0) break;
      saida.push({ t: linha.t.slice(0, resto), tipo: linha.tipo });
      resto -= linha.t.length + 1;
    }
    return saida;
  };

  const pintar = () => {
    const l = textura2d.width;
    const a = textura2d.height;
    if (!l || !a) return;

    const canto = 26 * dpr;
    ctx.clearRect(0, 0, l, a);

    ctx.beginPath();
    ctx.roundRect(1, 1, l - 2, a - 2, canto);
    const fundo = ctx.createLinearGradient(0, 0, 0, a);
    fundo.addColorStop(0, "#1E241A");
    fundo.addColorStop(1, "#161B13");
    ctx.fillStyle = fundo;
    ctx.fill();
    ctx.lineWidth = 1.5 * dpr;
    ctx.strokeStyle = "rgba(237,239,233,.20)";
    ctx.stroke();

    const barra = 58 * dpr;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(1, 1, l - 2, a - 2, canto);
    ctx.clip();
    ctx.fillStyle = "rgba(0,0,0,.22)";
    ctx.fillRect(0, 0, l, barra);
    ctx.fillStyle = "rgba(237,239,233,.10)";
    ctx.fillRect(0, barra, l, dpr);
    ctx.restore();

    ctx.fillStyle = "rgba(237,239,233,.20)";
    [26, 48, 70].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x * dpr, barra / 2, 5.5 * dpr, 0, Math.PI * 2);
      ctx.fill();
    });

    const atual = BLOCOS[bloco];
    ctx.font = `${13 * dpr}px ${fonte}`;
    ctx.fillStyle = "#6B735F";
    ctx.textBaseline = "middle";
    ctx.fillText(`${atual.arquivo} — calango lab`, 96 * dpr, barra / 2);

    const corpo = 16 * dpr;
    const entrelinha = 32 * dpr;
    const margem = 30 * dpr;
    let linhaBase = barra + 42 * dpr;

    ctx.font = `${corpo}px ${fonte}`;
    ctx.textBaseline = "alphabetic";

    const visiveis = linhasVisiveis(bloco, revelados);
    visiveis.forEach((linha, i) => {
      const ultima = i === visiveis.length - 1;
      let x = margem;

      if (linha.tipo === "cmd" && linha.t.startsWith("$")) {
        ctx.fillStyle = "#8FD14F";
        ctx.fillText("$", x, linhaBase);
        x += ctx.measureText("$ ").width;
        const resto = linha.t.slice(1).trimStart();
        ctx.fillStyle = CORES.cmd;
        ctx.fillText(resto, x, linhaBase);
        x += ctx.measureText(resto).width;
      } else {
        ctx.fillStyle = CORES[linha.tipo];
        ctx.fillText(linha.t, x, linhaBase);
        x += ctx.measureText(linha.t).width;
      }

      if (ultima && pisca < 0.5) {
        ctx.fillStyle = "#8FD14F";
        ctx.fillRect(x + 3 * dpr, linhaBase - 0.82 * corpo, 0.55 * corpo, 1.05 * corpo);
      }

      linhaBase += entrelinha;
    });

    textura.needsUpdate = true;
  };

  const materialJanela = new THREE.MeshBasicMaterial({
    map: textura,
    transparent: true,
  });
  const janela = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialJanela);
  cena.add(janela);

  const materialBrilho = new THREE.MeshBasicMaterial({
    color: 0x8fd14f,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const brilho = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialBrilho);
  brilho.position.z = -0.35;
  cena.add(brilho);

  let relogio = performance.now();
  let acumulado = 0;
  let pausa = 0;
  let inclinacaoX = 0;
  let inclinacaoY = 0;

  const aoMoverPonteiro = (e: PointerEvent) => {
    const caixa = el.getBoundingClientRect();
    inclinacaoY = ((e.clientX - (caixa.left + caixa.width / 2)) / innerWidth) * 0.5;
    inclinacaoX = ((e.clientY - (caixa.top + caixa.height / 2)) / innerHeight) * 0.3;
  };
  addEventListener("pointermove", aoMoverPonteiro, { passive: true });

  /** Avança a digitação. Devolve true quando há algo novo para pintar. */
  const digitar = (agora: number) => {
    const dt = Math.min(agora - relogio, 250);
    relogio = agora;

    if (pausa > 0) {
      pausa -= dt;
      if (pausa <= 0) {
        bloco = (bloco + 1) % BLOCOS.length;
        revelados = 0;
        acumulado = 0;
        return true;
      }
      return false;
    }

    const total = tamanho(BLOCOS[bloco]);
    if (revelados >= total) {
      pausa = PAUSA_ENTRE_BLOCOS;
      return false;
    }

    acumulado += dt;
    const passos = Math.floor(acumulado / MS_POR_CARACTERE);
    if (passos > 0) {
      acumulado -= MS_POR_CARACTERE * passos;
      revelados = Math.min(revelados + passos, total);
      return true;
    }
    return false;
  };

  if (reduzido) {
    bloco = BLOCOS.length - 1;
    revelados = tamanho(BLOCOS[bloco]);
    pisca = 1;
    janela.rotation.set(0, -0.1, 0);
    brilho.rotation.copy(janela.rotation);
  }

  const palco = criarPalco({
    el,
    cena,
    camera,
    dprMax: 2,
    fpsMax: 30,
    parado: reduzido,
    aoRedimensionar: (largura, alturaEl) => {
      if (!largura || !alturaEl) return;
      const alturaVisivel =
        2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const larguraVisivel = alturaVisivel * camera.aspect;

      janela.scale.set(0.94 * larguraVisivel, 0.94 * alturaVisivel, 1);
      brilho.scale.set(
        0.94 * larguraVisivel * 1.06,
        0.94 * alturaVisivel * 1.06,
        1
      );

      textura2d.width = Math.round(0.94 * largura * dpr);
      textura2d.height = Math.round(0.94 * alturaEl * dpr);
      pintar();
    },
    aoQuadro: ({ t, agora }) => {
      const antes = pisca < 0.5;
      pisca = (1.6 * t) % 1;
      const trocouCursor = antes !== pisca < 0.5;

      if (digitar(agora) || trocouCursor) pintar();

      janela.position.y = 0.09 * Math.sin(0.62 * t);
      janela.rotation.y += (-0.1 + inclinacaoY - janela.rotation.y) * 0.05;
      janela.rotation.x += (0.03 + inclinacaoX - janela.rotation.x) * 0.05;

      brilho.position.copy(janela.position);
      brilho.position.z = -0.35;
      brilho.rotation.copy(janela.rotation);
      materialBrilho.opacity = 0.08 + 0.03 * Math.sin(0.9 * t);
    },
  });

  if (reduzido) palco.desenhar();

  return () => {
    removeEventListener("pointermove", aoMoverPonteiro);
    palco.destruir();
    textura.dispose();
    janela.geometry.dispose();
    brilho.geometry.dispose();
    materialJanela.dispose();
    materialBrilho.dispose();
  };
}
