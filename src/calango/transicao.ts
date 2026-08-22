import { useEffect } from "react";

/** Quanto o esmaecimento de saída dura. Precisa bater com transicao.css. */
const SAIDA_MS = 200;

/**
 * Navegadores com transição entre documentos (`@view-transition`) fazem o
 * cruzamento sozinhos — nesses, o clique segue o caminho normal.
 */
const temTransicaoEntrePaginas = () => "onpagereveal" in window;

/**
 * Suaviza o clique em links:
 * - link para a página atual (ou âncora) rola em vez de recarregar;
 * - link para outra rota esmaece a página antes de sair, onde o navegador
 *   não faz a transição entre documentos por conta própria.
 */
export function useTransicaoDeLinks() {
  useEffect(() => {
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rolagem: ScrollBehavior = reduzido ? "auto" : "smooth";

    const aoClicar = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const alvo = (e.target as Element | null)?.closest?.("a");
      if (!alvo) return;

      const href = alvo.getAttribute("href");
      if (!href) return;
      if (alvo.hasAttribute("download")) return;
      if (alvo.target && alvo.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(href, location.href);
      } catch {
        return;
      }

      // Externo, mailto:, tel: — deixa o navegador cuidar.
      if (url.origin !== location.origin) return;

      // Já estamos nesta página: rolar é mais suave que recarregar.
      if (url.pathname === location.pathname && url.search === location.search) {
        e.preventDefault();
        const destino = url.hash
          ? document.querySelector<HTMLElement>(url.hash)
          : null;

        if (destino) {
          destino.scrollIntoView({ behavior: rolagem, block: "start" });
          history.pushState(null, "", url.hash);
        } else {
          scrollTo({ top: 0, behavior: rolagem });
          if (location.hash) history.pushState(null, "", location.pathname);
        }
        return;
      }

      // Outra rota: o navegador já cruza as páginas, ou esmaecemos na mão.
      if (reduzido || temTransicaoEntrePaginas()) return;

      e.preventDefault();
      document.documentElement.classList.add("saindo");
      setTimeout(() => {
        location.href = url.href;
      }, SAIDA_MS);
    };

    // Voltar pelo histórico pode reusar a página já esmaecida (bfcache).
    const aoMostrar = () =>
      document.documentElement.classList.remove("saindo");

    document.addEventListener("click", aoClicar);
    addEventListener("pageshow", aoMostrar);

    return () => {
      document.removeEventListener("click", aoClicar);
      removeEventListener("pageshow", aoMostrar);
    };
  }, []);
}
