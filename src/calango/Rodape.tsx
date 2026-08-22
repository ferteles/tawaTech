import { EMAIL, PAGINAS, SERVICOS_RODAPE, WHATSAPP } from "./links";

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div className="rodape__marca">
            <a className="marca" href="/">
              <img
                src="/logo.svg"
                alt=""
                width={398}
                height={191}
                loading="lazy"
                decoding="async"
              />
            </a>
            <p>Sites, lojas e os sistemas que os sustentam.</p>
            <a className="rodape__disponivel" href={WHATSAPP}>
              Aberto para novos projetos
            </a>
          </div>

          <nav className="rodape__coluna" aria-label="Rodapé — páginas">
            <span className="rot">Páginas</span>
            {PAGINAS.map((p) => (
              <a key={p.href} href={p.href}>
                {p.rotulo}
              </a>
            ))}
            <a href="/contato">Contato</a>
          </nav>

          <nav className="rodape__coluna" aria-label="Rodapé — serviços">
            <span className="rot">Serviços</span>
            {SERVICOS_RODAPE.map((s) => (
              <a key={s.href} href={s.href}>
                {s.rotulo}
              </a>
            ))}
          </nav>

          <div className="rodape__coluna">
            <span className="rot">Contato</span>
            <a href={WHATSAPP}>WhatsApp</a>
            <a href={EMAIL}>E-mail</a>
            <a href="#">Instagram</a>
            <span className="rodape__local">
              Vale do Capão
              <br />
              Bahia · Brasil
            </span>
          </div>
        </div>

        <div className="rodape__pe">
          <p>Calango Lab · PHS Tecnologia · CNPJ 50.235.414/0001-78</p>
          <p>
            Atendimento remoto em todo o Brasil ·{" "}
            <a href="/privacidade">Política de privacidade</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
