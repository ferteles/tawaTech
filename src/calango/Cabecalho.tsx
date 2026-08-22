import { useEffect, useState } from "react";
import { PAGINAS } from "./links";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [colado, setColado] = useState(false);

  useEffect(() => {
    const aoRolar = () => setColado(window.scrollY > 12);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={colado ? "cabecalho colado" : "cabecalho"}>
      <div className="container">
        <a className="marca" href="/">
          <img
            src="/img/calango.png"
            alt="Calango Lab — início"
            width={128}
            height={158}
            decoding="async"
          />
          <b>Calango Lab</b>
        </a>

        <button
          className="hamburguer"
          type="button"
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          <i />
          <i />
          <i />
        </button>

        <nav
          className={aberto ? "menu menu--aberto" : "menu"}
          aria-label="Principal"
        >
          {PAGINAS.map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              aria-current={i === 0 ? "page" : undefined}
              onClick={() => setAberto(false)}
            >
              {p.rotulo}
            </a>
          ))}
          <a
            className="botao botao--primario botao--compacto"
            href="/contato"
            onClick={() => setAberto(false)}
          >
            Conversar
          </a>
        </nav>
      </div>
    </header>
  );
}
