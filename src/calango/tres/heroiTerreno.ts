import * as THREE from "three";
import { criarPalco } from "./palco";
import { aoCairQualidade, qualidade } from "./qualidade";

/** Ondas que passeiam pelo terreno, cada uma com raio, velocidade e altura. */
const CAMPOS = [
  { r: 6.2, vel: 0.16, fase: 0, alt: 1.35, raio: 3.4 },
  { r: 9, vel: -0.11, fase: 2.1, alt: 0.95, raio: 4.6 },
  { r: 3.4, vel: 0.23, fase: 4.2, alt: 0.7, raio: 2.6 },
];

/**
 * Malha de arame que ondula no fundo do herói, com um relevo que segue o cursor.
 * Devolve a função de desmontagem.
 */
export function montarTerreno(el: HTMLElement): () => void {
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cena = new THREE.Scene();
  cena.fog = new THREE.Fog(0x0a0a0a, 9, 27);

  const camera = new THREE.PerspectiveCamera(52, 16 / 9, 0.1, 100);
  camera.position.set(0, 3.4, 8.6);
  camera.lookAt(0, -0.4, -2);

  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    fog: true,
  });
  const malha = new THREE.Mesh(new THREE.BufferGeometry(), material);
  malha.position.set(0, -1.6, -4);
  cena.add(malha);

  let geometria: THREE.PlaneGeometry;
  let posicoes: THREE.BufferAttribute;
  let xs: Float32Array;
  let zs: Float32Array;
  let cores: Float32Array;

  const construirMalha = () => {
    const [colunas, linhas] = qualidade().malha;
    const g = new THREE.PlaneGeometry(34, 24, colunas, linhas);
    g.rotateX(-Math.PI / 2);

    const pos = g.attributes.position as THREE.BufferAttribute;
    xs = new Float32Array(pos.count);
    zs = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      xs[i] = pos.getX(i);
      zs[i] = pos.getZ(i);
    }
    cores = new Float32Array(pos.count * 3);
    g.setAttribute("color", new THREE.BufferAttribute(cores, 3));

    geometria?.dispose();
    geometria = g;
    posicoes = pos;
    malha.geometry = g;
  };

  construirMalha();

  const planoDoCursor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.6);
  const raio = new THREE.Raycaster();
  const ponteiro = new THREE.Vector2(0, 0);
  const alvo = new THREE.Vector3();
  const toque = { x: 0, z: 0, forca: 0 };

  const corBaixa = new THREE.Color(0x2a0000);
  const corMedia = new THREE.Color(0xff0000);
  const corAlta = new THREE.Color(0xffd6d6);
  const cor = new THREE.Color();

  const nascimento = performance.now();

  const altura = (x: number, z: number, t: number) => {
    let h = 0;
    for (const c of CAMPOS) {
      const dx = x - Math.cos(t * c.vel + c.fase) * c.r;
      const dz = z - Math.sin(t * c.vel * 1.3 + c.fase) * (0.55 * c.r);
      h += c.alt * Math.exp(-(dx * dx + dz * dz) / (c.raio * c.raio));
    }
    if (toque.forca > 0.01) {
      const dx = x - toque.x;
      const dz = z - toque.z;
      h += 1.9 * toque.forca * Math.exp(-(dx * dx + dz * dz) / 5.2);
    }
    return h + Math.sin(0.28 * x + 0.5 * t) * Math.cos(0.24 * z - 0.36 * t) * 0.16;
  };

  const atualizar = (t: number) => {
    const idade = (performance.now() - nascimento) / 1000;
    // Onda circular que percorre o terreno uma vez, na entrada.
    const entrada = idade < 1.8 ? 1 - idade / 1.8 : 0;
    const frente = 13 * idade;

    for (let i = 0; i < posicoes.count; i++) {
      const x = xs[i];
      const z = zs[i];
      let h = altura(x, z, t);

      if (entrada > 0) {
        const d = Math.sqrt(x * x + z * z) - frente;
        h += 2.6 * entrada * Math.exp(-(d * d) / 5);
      }
      posicoes.setY(i, h);

      const nivelCor = Math.min(Math.max(h / 1.9, 0), 1);
      cor.copy(corBaixa).lerp(corMedia, Math.min(1.5 * nivelCor, 1));
      if (nivelCor > 0.72) cor.lerp(corAlta, (nivelCor - 0.72) / 0.28);
      cores[3 * i] = cor.r;
      cores[3 * i + 1] = cor.g;
      cores[3 * i + 2] = cor.b;
    }

    posicoes.needsUpdate = true;
    geometria.attributes.color.needsUpdate = true;
  };

  // Sem isto o primeiro quadro sai preto: as cores dos vértices só nascem
  // no primeiro `atualizar`, e o laço de animação ainda não começou.
  atualizar(0);

  const palco = criarPalco({
    el,
    cena,
    camera,
    dprMax: 1.75,
    fpsMax: 30,
    parado: reduzido,
    aoQuadro: ({ t }) => {
      toque.forca += (0 - toque.forca) * 0.012;
      atualizar(t);
      malha.rotation.y = 0.05 * Math.sin(0.06 * t);
    },
  });

  el.classList.add("pronto");

  const soltarDegrau = aoCairQualidade(() => {
    construirMalha();
    atualizar(2.4);
    if (reduzido) palco.desenhar();
  });

  const aoMoverPonteiro = (e: PointerEvent) => {
    const caixa = palco.canvas.getBoundingClientRect();
    if (e.clientY < caixa.top - 80 || e.clientY > caixa.bottom + 80) {
      toque.forca = 0;
      return;
    }
    ponteiro.x = ((e.clientX - caixa.left) / caixa.width) * 2 - 1;
    ponteiro.y = -((e.clientY - caixa.top) / caixa.height) * 2 + 1;
    raio.setFromCamera(ponteiro, camera);
    if (raio.ray.intersectPlane(planoDoCursor, alvo)) {
      toque.x = alvo.x - malha.position.x;
      toque.z = alvo.z - malha.position.z;
      toque.forca = 1;
    }
  };

  const aoPerderFoco = () => {
    toque.forca = 0;
  };

  addEventListener("pointermove", aoMoverPonteiro, { passive: true });
  addEventListener("blur", aoPerderFoco);

  if (reduzido) {
    atualizar(2.4);
    palco.desenhar();
  }

  return () => {
    removeEventListener("pointermove", aoMoverPonteiro);
    removeEventListener("blur", aoPerderFoco);
    soltarDegrau();
    palco.destruir();
    geometria.dispose();
    material.dispose();
    el.classList.remove("pronto");
  };
}
