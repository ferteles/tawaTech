import { useCallback, useEffect, useRef, useState } from "react";
import { SetaDireita, SetaEsquerda } from "../Icones";

const ETAPAS = [
  {
    titulo: "Levantamento",
    texto:
      "Entender a regra com quem executa o processo hoje, não com quem imagina como ele deveria ser.",
  },
  {
    titulo: "Modelagem",
    texto:
      "Desenhar dados e fluxo. É aqui que erro custa barato — depois do código, custa reescrita.",
  },
  {
    titulo: "Interface",
    texto:
      "Telas e navegação, validadas com quem vai usar todo dia antes de virar código.",
  },
  {
    titulo: "Implementação",
    texto:
      "Código em entregas parciais, com teste no que quebra caro e revisão a cada etapa.",
  },
  {
    titulo: "Publicação",
    texto: "No ar, monitorado, com backup e documentação na mão da empresa.",
  },
];

const PASSO = (Math.PI * 2) / ETAPAS.length;
const VERDE = "#8FD14F";
const OCRE = "#E8A93A";

type Projecao = { x: number; y: number; escala: number; profundidade: number };

export function Fluxo() {
  const [ativo, setAtivo] = useState(0);
  const [sobre, setSobre] = useState<number | null>(null);
  const [temCanvas, setTemCanvas] = useState(false);

  const palcoRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotulosRef = useRef<(HTMLSpanElement | null)[]>([]);
  const giroRef = useRef(0);
  const alvoRef = useRef(0);
  const arrastoRef = useRef({ ativo: false, x: 0, giro: 0 });
  const sobreRef = useRef<number | null>(null);
  const ativoRef = useRef(0);

  useEffect(() => {
    ativoRef.current = ativo;
    alvoRef.current = -ativo * PASSO;
  }, [ativo]);

  useEffect(() => {
    sobreRef.current = sobre;
  }, [sobre]);

  useEffect(() => {
    setTemCanvas(!!document.createElement("canvas").getContext("2d"));
  }, []);

  const projetar = useCallback(
    (i: number, giro: number, l: number, a: number): Projecao => {
      const angulo = i * PASSO + giro;
      const profundidade = Math.cos(angulo);
      return {
        x: l / 2 + l * 0.34 * Math.sin(angulo),
        y: a / 2 - a * 0.2 * profundidade,
        escala: 0.62 + 0.38 * ((profundidade + 1) / 2),
        profundidade,
      };
    },
    []
  );

  useEffect(() => {
    if (!temCanvas) return;
    const canvas = canvasRef.current;
    const palco = palcoRef.current;
    if (!canvas || !palco) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let quadro = 0;
    let l = 0;
    let a = 0;

    // Os rótulos acompanham os nós do canvas: escrevemos direto no DOM para não
    // disparar um render do React a cada quadro.
    const posicionarRotulos = (pontos: Projecao[]) => {
      pontos.forEach((p, i) => {
        const el = rotulosRef.current[i];
        if (!el) return;
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y - 30 * p.escala}px`;
        el.style.transform = `translate(-50%, -50%) scale(${p.escala.toFixed(3)})`;
        el.style.opacity = String(0.45 + 0.55 * ((p.profundidade + 1) / 2));
        el.style.zIndex = String(Math.round(p.profundidade * 10) + 20);
      });
    };

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const caixa = palco.getBoundingClientRect();
      l = caixa.width;
      a = caixa.height;
      canvas.width = Math.round(l * dpr);
      canvas.height = Math.round(a * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Coloca os rótulos já no primeiro layout, antes do primeiro quadro.
      posicionarRotulos(
        ETAPAS.map((_, i) => projetar(i, giroRef.current, l, a))
      );
    };

    redimensionar();
    const observador = new ResizeObserver(redimensionar);
    observador.observe(palco);

    const desenhar = () => {
      if (!arrastoRef.current.ativo) {
        let delta = alvoRef.current - giroRef.current;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        giroRef.current += delta * 0.09;
      }

      const pontos = ETAPAS.map((_, i) =>
        projetar(i, giroRef.current, l, a)
      );

      ctx.clearRect(0, 0, l, a);

      ctx.beginPath();
      ctx.ellipse(l / 2, a / 2, l * 0.34, a * 0.2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(237,239,233,0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      pontos.forEach((p, i) =>
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)
      );
      ctx.closePath();
      ctx.strokeStyle = "rgba(143,209,79,0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const ordem = pontos
        .map((p, i) => ({ p, i }))
        .sort((x, y) => x.p.profundidade - y.p.profundidade);

      ordem.forEach(({ p, i }) => {
        const ehAtivo = i === ativoRef.current;
        const ehSobre = i === sobreRef.current;
        const raio = 7 * p.escala;

        if (ehAtivo) {
          const brilho = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            raio * 5
          );
          brilho.addColorStop(0, "rgba(143,209,79,0.35)");
          brilho.addColorStop(1, "rgba(143,209,79,0)");
          ctx.fillStyle = brilho;
          ctx.beginPath();
          ctx.arc(p.x, p.y, raio * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, raio, 0, Math.PI * 2);
        ctx.globalAlpha = 0.35 + 0.65 * ((p.profundidade + 1) / 2);
        ctx.fillStyle = ehAtivo ? VERDE : ehSobre ? OCRE : "#EDEFE9";
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, raio + 4 * p.escala, 0, Math.PI * 2);
        ctx.strokeStyle = ehAtivo
          ? "rgba(143,209,79,0.55)"
          : "rgba(237,239,233,0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      posicionarRotulos(pontos);
      quadro = requestAnimationFrame(desenhar);
    };

    quadro = requestAnimationFrame(desenhar);

    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
    };
  }, [temCanvas, projetar]);

  const irPara = useCallback((i: number) => {
    const total = ETAPAS.length;
    setAtivo(((i % total) + total) % total);
  }, []);

  const aoPressionar = (e: React.PointerEvent) => {
    arrastoRef.current = { ativo: true, x: e.clientX, giro: giroRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const aoMover = (e: React.PointerEvent) => {
    if (!arrastoRef.current.ativo) return;
    const largura = palcoRef.current?.clientWidth || 1;
    const delta = ((e.clientX - arrastoRef.current.x) / largura) * Math.PI * 2;
    giroRef.current = arrastoRef.current.giro + delta;
  };

  const aoSoltar = (e: React.PointerEvent) => {
    if (!arrastoRef.current.ativo) return;
    arrastoRef.current.ativo = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    irPara(Math.round(-giroRef.current / PASSO));
  };

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      irPara(ativo + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      irPara(ativo - 1);
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

        <div className={temCanvas ? "fluxo fluxo--3d" : "fluxo"} tabIndex={-1}>
          <div className="fluxo__grade">
            <div
              className="fluxo__palco"
              ref={palcoRef}
              tabIndex={0}
              role="group"
              aria-label="Etapas do processo"
              onKeyDown={aoTeclar}
            >
              <canvas
                ref={canvasRef}
                onPointerDown={aoPressionar}
                onPointerMove={aoMover}
                onPointerUp={aoSoltar}
                onPointerCancel={aoSoltar}
              />
              {ETAPAS.map((e, i) => {
                const classes = ["fluxo__rotulo"];
                if (i === ativo) classes.push("ativo");
                else if (i === sobre) classes.push("sobre");
                return (
                  <span
                    key={e.titulo}
                    ref={(el) => {
                      rotulosRef.current[i] = el;
                    }}
                    className={classes.join(" ")}
                    onMouseEnter={() => setSobre(i)}
                    onMouseLeave={() => setSobre(null)}
                    onClick={() => irPara(i)}
                  >
                    {e.titulo}
                  </span>
                );
              })}
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
                    onMouseEnter={() => setSobre(i)}
                    onMouseLeave={() => setSobre(null)}
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
