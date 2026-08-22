import { useEffect } from "react";

const ESCALONAMENTO = 90; // ms entre elementos de um mesmo grupo

/**
 * Revela os elementos [data-revela] quando entram na viewport.
 * O valor de data-revela é o índice do elemento no grupo e vira atraso.
 */
export function useRevela() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-revela]")
    );
    if (!alvos.length) return;

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduzido) {
      alvos.forEach((el) => el.classList.add("visivel"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const el = entrada.target as HTMLElement;
          const indice = Number(el.dataset.revela) || 0;
          el.style.setProperty("--atraso", `${indice * ESCALONAMENTO}ms`);
          el.classList.add("visivel");
          observador.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);
}

/** Anima os contadores [data-conta] de 0 até o valor final. */
export function useContadores() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-conta]")
    );
    if (!alvos.length) return;

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const quadros: number[] = [];

    const contar = (el: HTMLElement) => {
      const destino = Number(el.dataset.conta) || 0;
      if (reduzido) {
        el.textContent = String(destino);
        return;
      }
      const duracao = 1200;
      const inicio = performance.now();
      const passo = (agora: number) => {
        const t = Math.min((agora - inicio) / duracao, 1);
        const suave = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(destino * suave));
        if (t < 1) quadros.push(requestAnimationFrame(passo));
      };
      quadros.push(requestAnimationFrame(passo));
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          contar(entrada.target as HTMLElement);
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.5 }
    );

    alvos.forEach((el) => observador.observe(el));
    return () => {
      observador.disconnect();
      quadros.forEach(cancelAnimationFrame);
    };
  }, []);
}
