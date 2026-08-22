import { useEffect } from "react";

const ESCALONAMENTO = 90; // ms entre elementos de um mesmo grupo

/**
 * Efeitos de rolagem da página, na mesma configuração do site original:
 * revelação dos blocos, contadores, brilho que segue o cursor nos cartões e
 * avanço da linha do tempo do processo.
 */
export function useEfeitosDaPagina() {
  useEffect(() => {
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limpezas: (() => void)[] = [];

    // Revelação ------------------------------------------------------------
    const revelaveis =
      document.querySelectorAll<HTMLElement>("[data-revela]");

    if (reduzido) {
      revelaveis.forEach((el) => el.classList.add("visivel"));
    } else if (revelaveis.length) {
      const olho = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add("visivel");
            olho.unobserve(entrada.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      revelaveis.forEach((el) => {
        el.style.setProperty(
          "--atraso",
          `${ESCALONAMENTO * (Number(el.dataset.revela) || 0)}ms`
        );
        olho.observe(el);
      });
      limpezas.push(() => olho.disconnect());
    }

    // Brilho que segue o cursor nos cartões --------------------------------
    if (!reduzido && matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>(".cartao").forEach((cartao) => {
        const aoMover = (e: PointerEvent) => {
          const caixa = cartao.getBoundingClientRect();
          cartao.style.setProperty("--mx", `${e.clientX - caixa.left}px`);
          cartao.style.setProperty("--my", `${e.clientY - caixa.top}px`);
        };
        cartao.addEventListener("pointermove", aoMover);
        limpezas.push(() =>
          cartao.removeEventListener("pointermove", aoMover)
        );
      });
    }

    // Contadores -----------------------------------------------------------
    const contadores = document.querySelectorAll<HTMLElement>("[data-conta]");
    if (contadores.length) {
      const contar = (el: HTMLElement) => {
        const destino = Number(el.dataset.conta);
        if (Number.isNaN(destino)) return;
        if (reduzido) {
          el.textContent = String(destino);
          return;
        }
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min((agora - inicio) / 1400, 1);
          el.textContent = String(
            Math.round(destino * (1 - Math.pow(1 - t, 3)))
          );
          if (t < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
      };

      const olho = new IntersectionObserver(
        (entradas) =>
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            contar(entrada.target as HTMLElement);
            olho.unobserve(entrada.target);
          }),
        { threshold: 0.6 }
      );
      contadores.forEach((el) => olho.observe(el));
      limpezas.push(() => olho.disconnect());
    }

    // Linha do tempo do processo -------------------------------------------
    const trilha = document.querySelector(".trilha");
    if (trilha) {
      const fio = trilha.querySelector<HTMLElement>(".trilha__fio");
      const passos = [...trilha.querySelectorAll<HTMLElement>(".passo")];
      const olho = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((e) =>
            e.target.classList.toggle("ativo", e.isIntersecting)
          );
          const ativos = passos.filter((p) => p.classList.contains("ativo"));
          if (fio && ativos.length) {
            const ultimo = passos.indexOf(ativos[ativos.length - 1]);
            fio.style.setProperty(
              "--avanco",
              String((ultimo + 1) / passos.length)
            );
          }
        },
        { rootMargin: "-38% 0px -38% 0px" }
      );
      passos.forEach((p) => olho.observe(p));
      limpezas.push(() => olho.disconnect());
    }

    return () => limpezas.forEach((f) => f());
  }, []);
}
