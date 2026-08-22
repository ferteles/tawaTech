import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ETAPAS } from "../etapas";
import { criarPalco } from "./palco";
import { qualidade } from "./qualidade";

const COR_NO = 0x33421f;
const COR_NO_ATIVO = 0x8fd14f;
const EMISSIVA = 0x0e1408;
const EMISSIVA_ATIVA = 0x1d3110;
const EMISSIVA_SOBRE = 0x16240c;

const TOTAL_PARTICULAS = 70;
const OCIOSO_MS = 5000;

export type Opcoes = {
  palco: HTMLElement;
  rotulos: (HTMLElement | null)[];
  aoMudarEtapa: (indice: number) => void;
};

export type CenaFluxo = {
  irPara: (indice: number, imediato?: boolean) => void;
  destruir: () => void;
};

/** Órbita 3D das etapas: nós numa curva, partículas correndo pelo tubo. */
export function montarFluxo({
  palco: el,
  rotulos,
  aoMudarEtapa,
}: Opcoes): CenaFluxo {
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cena = new THREE.Scene();
  cena.fog = new THREE.Fog(0x10140e, 13, 28);

  const camera = new THREE.PerspectiveCamera(
    42,
    el.clientWidth / Math.max(el.clientHeight, 1),
    0.1,
    100
  );
  camera.position.set(0.4, 2.7, 11.4);

  let avancarQuadro: (t: number) => void = () => {};

  const palco = criarPalco({
    el,
    cena,
    camera,
    dprMax: 2,
    aoQuadro: ({ t }) => avancarQuadro(t),
  });

  const controles = new OrbitControls(camera, palco.canvas);
  Object.assign(controles, {
    enableDamping: true,
    dampingFactor: 0.07,
    enablePan: false,
    minDistance: 4,
    maxDistance: 17,
    minPolarAngle: 0.18 * Math.PI,
    maxPolarAngle: 0.72 * Math.PI,
  });

  const grupo = new THREE.Group();
  cena.add(grupo);

  cena.add(new THREE.AmbientLight(0x9bb98a, 0.5));
  const luzPrincipal = new THREE.DirectionalLight(0xdfeccb, 1.15);
  luzPrincipal.position.set(4, 7, 6);
  cena.add(luzPrincipal);
  const luzDeApoio = new THREE.DirectionalLight(0x8fd14f, 0.5);
  luzDeApoio.position.set(-6, -3, -5);
  cena.add(luzDeApoio);
  const luzDoNo = new THREE.PointLight(0x8fd14f, 6, 13, 2);
  cena.add(luzDoNo);

  const pontos = ETAPAS.map((e) => new THREE.Vector3(...e.pos));
  const curva = new THREE.CatmullRomCurve3(pontos, false, "catmullrom", 0.35);
  const emU = (i: number) => i / (ETAPAS.length - 1);

  const tubo = new THREE.Mesh(
    new THREE.TubeGeometry(curva, qualidade().tubo, 0.035, 10, false),
    new THREE.MeshBasicMaterial({ color: 0x3d5a28 })
  );
  grupo.add(tubo);

  // Trecho aceso entre a etapa atual e a seguinte.
  const trecho = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({
      color: 0x8fd14f,
      transparent: true,
      opacity: 0.85,
    })
  );
  grupo.add(trecho);

  const deslocamentos = new Float32Array(TOTAL_PARTICULAS);
  const posParticulas = new Float32Array(TOTAL_PARTICULAS * 3);
  for (let i = 0; i < TOTAL_PARTICULAS; i++) deslocamentos[i] = i / TOTAL_PARTICULAS;

  const geoParticulas = new THREE.BufferGeometry();
  geoParticulas.setAttribute(
    "position",
    new THREE.BufferAttribute(posParticulas, 3)
  );
  geoParticulas.setDrawRange(0, qualidade().particulas);
  const particulas = new THREE.Points(
    geoParticulas,
    new THREE.PointsMaterial({
      color: 0xa8e06a,
      size: 0.085,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  grupo.add(particulas);

  const correrParticulas = (t: number) => {
    const quantas = qualidade().particulas;
    for (let i = 0; i < quantas; i++) {
      const u = (deslocamentos[i] + 0.045 * t) % 1;
      const p = curva.getPointAt(u);
      posParticulas[3 * i] = p.x;
      posParticulas[3 * i + 1] = p.y;
      posParticulas[3 * i + 2] = p.z;
    }
    geoParticulas.attributes.position.needsUpdate = true;
  };
  correrParticulas(0);

  // Pulso que viaja da etapa atual para a seguinte.
  const pulso = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xdff3c4,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
  );
  grupo.add(pulso);

  const geoNo = new THREE.IcosahedronGeometry(0.5, 0);
  const nos = pontos.map((p, i) => {
    const no = new THREE.Mesh(
      geoNo,
      new THREE.MeshStandardMaterial({
        color: COR_NO,
        emissive: EMISSIVA,
        roughness: 0.55,
        metalness: 0.15,
        flatShading: true,
      })
    );
    no.position.copy(p);
    no.userData.indice = i;

    const aro = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({
        color: 0x8fd14f,
        transparent: true,
        opacity: 0,
      })
    );
    aro.rotation.x = Math.PI / 2;
    no.add(aro);
    no.userData.aro = aro;

    grupo.add(no);
    return no;
  });

  const grade = new THREE.GridHelper(36, 36, 0x2a3520, 0x1c2416);
  grade.position.y = -2.7;
  const materialGrade = grade.material as THREE.Material;
  materialGrade.transparent = true;
  materialGrade.opacity = 0.45;
  grupo.add(grade);

  const centro = new THREE.Vector3(0, 0.08, 0);
  let ativo = 0;
  let sobre = -1;
  let ultimoToque = performance.now();
  let giroOcioso = 0;
  let inclinacaoX = 0;
  let inclinacaoY = 0;
  const ponteiro = new THREE.Vector2(-2, -2);
  const raio = new THREE.Raycaster();
  const mundo = new THREE.Vector3();

  type Transicao = {
    t0: number;
    dur: number;
    deAlvo: THREE.Vector3;
    paraAlvo: THREE.Vector3;
    deCam: THREE.Vector3;
    paraCam: THREE.Vector3;
  };
  let transicao: Transicao | null = null;

  const marcarToque = () => {
    ultimoToque = performance.now();
  };

  const enquadrar = (indice: number) => {
    const alvo = centro.clone().lerp(pontos[indice], 0.28);
    return { alvo, cam: alvo.clone().add(new THREE.Vector3(0.4, 2.7, 11.4)) };
  };

  const irPara = (indice: number, imediato = false) => {
    ativo = (indice + ETAPAS.length) % ETAPAS.length;
    aoMudarEtapa(ativo);
    marcarToque();

    nos.forEach((no, i) => {
      const ehAtivo = i === ativo;
      const material = no.material as THREE.MeshStandardMaterial;
      material.color.setHex(ehAtivo ? COR_NO_ATIVO : COR_NO);
      material.emissive.setHex(ehAtivo ? EMISSIVA_ATIVA : EMISSIVA);
      const aro = no.userData.aro as THREE.Mesh;
      (aro.material as THREE.MeshBasicMaterial).opacity = ehAtivo ? 0.75 : 0;
    });

    trecho.visible = ativo < ETAPAS.length - 1;
    if (trecho.visible) {
      const de = emU(ativo);
      const para = emU(ativo + 1);
      const curvaTrecho = new THREE.CatmullRomCurve3(
        Array.from({ length: 24 }, (_, i) =>
          curva.getPointAt(de + (i / 23) * (para - de))
        )
      );
      trecho.geometry.dispose();
      trecho.geometry = new THREE.TubeGeometry(curvaTrecho, 60, 0.05, 10, false);
    }

    const { alvo, cam } = enquadrar(ativo);
    if (imediato || reduzido) {
      controles.target.copy(alvo);
      camera.position.copy(cam);
      transicao = null;
    } else {
      transicao = {
        t0: performance.now(),
        dur: 900,
        deAlvo: controles.target.clone(),
        paraAlvo: alvo,
        deCam: camera.position.clone(),
        paraCam: cam,
      };
    }
  };

  controles.addEventListener("start", () => {
    transicao = null;
    marcarToque();
  });

  const aoMoverPonteiro = (e: PointerEvent) => {
    const caixa = el.getBoundingClientRect();
    ponteiro.x = ((e.clientX - caixa.left) / caixa.width) * 2 - 1;
    ponteiro.y = -((e.clientY - caixa.top) / caixa.height) * 2 + 1;
    inclinacaoY = 0.16 * ponteiro.x;
    inclinacaoX = -(0.09 * ponteiro.y);
    marcarToque();
  };

  const aoSairPonteiro = () => {
    ponteiro.set(-2, -2);
    inclinacaoX = 0;
    inclinacaoY = 0;
  };

  const aoPressionar = (e: PointerEvent) => {
    aoMoverPonteiro(e);
    if (sobre >= 0) irPara(sobre);
  };

  el.addEventListener("pointermove", aoMoverPonteiro);
  el.addEventListener("pointerleave", aoSairPonteiro);
  el.addEventListener("pointerdown", aoPressionar);

  avancarQuadro = (t) => {
    const ocioso = performance.now() - ultimoToque > OCIOSO_MS;

    if (transicao) {
      const avanco = Math.min(
        (performance.now() - transicao.t0) / transicao.dur,
        1
      );
      const suave = 1 - Math.pow(1 - avanco, 3);
      controles.target.lerpVectors(transicao.deAlvo, transicao.paraAlvo, suave);
      camera.position.lerpVectors(transicao.deCam, transicao.paraCam, suave);
      if (avanco >= 1) transicao = null;
    }

    if (ponteiro.x > -1.5) {
      raio.setFromCamera(ponteiro, camera);
      const alvos = raio.intersectObjects(nos, false);
      sobre = alvos.length
        ? (alvos[0].object.userData.indice as number)
        : -1;
    } else {
      sobre = -1;
    }
    el.style.cursor = sobre >= 0 ? "pointer" : "grab";

    if (!reduzido) {
      if (ocioso) giroOcioso += 9e-4;
      grupo.rotation.y += (inclinacaoY + giroOcioso - grupo.rotation.y) * 0.05;
      grupo.rotation.x += (inclinacaoX - grupo.rotation.x) * 0.05;

      correrParticulas(t);

      nos.forEach((no, i) => {
        no.rotation.y = t * (i % 2 ? -0.22 : 0.22) + i;
        no.rotation.x = 0.12 * Math.sin(0.4 * t + i);

        const escalaAlvo =
          i === ativo
            ? 1.18 + 0.035 * Math.sin(2.2 * t)
            : i === sobre
              ? 1.1
              : 1;
        no.scale.setScalar(no.scale.x + (escalaAlvo - no.scale.x) * 0.15);
        (no.userData.aro as THREE.Mesh).rotation.z = 0.5 * t;

        if (i !== ativo) {
          (no.material as THREE.MeshStandardMaterial).emissive.setHex(
            i === sobre ? EMISSIVA_SOBRE : EMISSIVA
          );
        }
      });

      if (trecho.visible) {
        const de = emU(ativo);
        const para = emU(ativo + 1);
        const u = (0.55 * t) % 1;
        pulso.visible = true;
        pulso.position.copy(curva.getPointAt(de + (para - de) * u));
        (pulso.material as THREE.MeshBasicMaterial).opacity = Math.sin(
          u * Math.PI
        );
        pulso.scale.setScalar(0.8 + 0.8 * Math.sin(u * Math.PI));
      } else {
        pulso.visible = false;
      }
    }

    luzDoNo.position
      .copy(pontos[ativo])
      .applyEuler(grupo.rotation)
      .add(new THREE.Vector3(0, 1.2, 1.4));

    controles.update();

    // Rótulos em HTML seguem a projeção dos nós na tela.
    const caixa = el.getBoundingClientRect();
    nos.forEach((no, i) => {
      const rotulo = rotulos[i];
      if (!rotulo) return;
      no.getWorldPosition(mundo);
      const tela = mundo.project(camera);
      const naFrente = tela.z < 1;
      rotulo.style.transform = `translate(-50%, -50%) translate(${
        (0.5 * tela.x + 0.5) * caixa.width
      }px, ${(-(0.5 * tela.y) + 0.5) * caixa.height - 46}px)`;
      rotulo.style.opacity = naFrente ? "1" : "0";
      rotulo.style.pointerEvents = naFrente ? "auto" : "none";
      rotulo.classList.toggle("sobre", i === sobre && i !== ativo);
    });
  };

  irPara(0, true);

  // O palco foi criado antes dos objetos entrarem na cena: um quadro manual
  // deixa a primeira imagem certa sem esperar o laço de animação.
  avancarQuadro(0);
  palco.desenhar();

  return {
    irPara,
    destruir: () => {
      el.removeEventListener("pointermove", aoMoverPonteiro);
      el.removeEventListener("pointerleave", aoSairPonteiro);
      el.removeEventListener("pointerdown", aoPressionar);
      controles.dispose();
      palco.destruir();
      cena.traverse((obj) => {
        const malha = obj as THREE.Mesh;
        malha.geometry?.dispose();
        const material = malha.material as THREE.Material | THREE.Material[];
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });
    },
  };
}
