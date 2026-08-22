import type { ReactNode } from "react";
import { Carrinho, Codigo, Faisca, Janela, No, SetaDireita } from "../Icones";

function VerEscopo({ href }: { href: string }) {
  return (
    <div className="cartao__pe">
      <a className="botao botao--texto" href={href}>
        Ver escopo <SetaDireita />
      </a>
    </div>
  );
}

type Cartao = {
  icone?: ReactNode;
  rot?: { texto: string; classe?: string; cor?: string };
  titulo: string;
  texto: string;
  href: string;
};

const MENORES: Cartao[] = [
  {
    titulo: "Site e portal",
    texto:
      "Sem template, com painel que sua equipe usa sozinha — e área logada quando precisa.",
    href: "/servicos/site",
  },
  {
    titulo: "Manutenção e evolução",
    texto: "Contrato mensal com suporte, melhorias e monitoramento.",
    href: "/servicos/manutencao",
  },
];

const LARGURA_3: Cartao[] = [
  {
    icone: <Codigo />,
    titulo: "Sistema sob medida",
    texto:
      "Quando o processo não cabe em software de prateleira. Levantamento, construção e a infraestrutura que sustenta o sistema depois — tudo pela mesma equipe.",
    href: "/servicos/sob-medida",
  },
  {
    icone: <Janela />,
    rot: { texto: "Nicho pouco disputado", cor: "var(--cinza)" },
    titulo: "Resgate de sistema",
    texto:
      "Site ou sistema rodando sem documentação e sem quem faça manutenção. Auditamos, documentamos e dizemos se vale corrigir, migrar ou reconstruir.",
    href: "/servicos/resgate",
  },
  {
    icone: <No />,
    titulo: "Integrações",
    texto:
      "ERP, loja, CRM, gateway e emissor de nota conversando entre si — com log, retentativa e alerta. Ninguém exportando planilha e redigitando no meio do caminho.",
    href: "/servicos/integracoes",
  },
];

export function Servicos() {
  return (
    <section className="secao" data-marco="true">
      <div className="container">
        <div className="cabeca" data-revela={0}>
          <span className="rot">Serviços</span>
          <h2>Sete frentes, um jeito só de trabalhar</h2>
          <p className="lead">
            Escopo, prazo e valor fechados antes da primeira linha de código. O
            que fica de fora aparece por escrito, não como surpresa no meio do
            projeto.
          </p>
        </div>

        <div className="bento">
          <article
            className="cartao cartao--destaque b-4 servico-grande"
            data-revela={0}
          >
            <div className="cartao__icone">
              <Carrinho />
            </div>
            <span className="rot rot--marca">Carro-chefe</span>
            <h3>E-commerce</h3>
            <p>
              Loja virtual que não para na vitrine: pagamento, frete e estoque
              integrados ao que a empresa já usa. Quem monta a loja é quem
              resolve a integração — não são dois fornecedores discutindo de
              quem é a culpa.
            </p>
            <VerEscopo href="/servicos/ecommerce" />
          </article>

          <div className="b-2" style={{ display: "grid", gap: "var(--s4)" }}>
            {MENORES.map((c, i) => (
              <article className="cartao" data-revela={i + 1} key={c.href}>
                <h3 style={{ fontSize: "var(--t-xl)" }}>{c.titulo}</h3>
                <p>{c.texto}</p>
                <VerEscopo href={c.href} />
              </article>
            ))}
          </div>

          {LARGURA_3.map((c, i) => (
            <article className="cartao b-3" data-revela={i + 3} key={c.href}>
              {c.icone && <div className="cartao__icone">{c.icone}</div>}
              {c.rot && (
                <span className="rot" style={{ color: c.rot.cor }}>
                  {c.rot.texto}
                </span>
              )}
              <h3 style={{ fontSize: "var(--t-xl)" }}>{c.titulo}</h3>
              <p>{c.texto}</p>
              <VerEscopo href={c.href} />
            </article>
          ))}

          <article className="cartao cartao--destaque b-3" data-revela={6}>
            <div className="cartao__icone">
              <Faisca />
            </div>
            <span className="rot rot--marca">Novo</span>
            <h3 style={{ fontSize: "var(--t-xl)" }}>Automação e IA</h3>
            <p>
              O repetitivo sai da mesa: triagem, extração de documento,
              relatório e atendimento. Com IA onde ela resolve, sem ela onde
              código simples resolve melhor — e revisão humana onde a decisão
              pesa.
            </p>
            <VerEscopo href="/servicos/automacoes" />
          </article>
        </div>
      </div>
    </section>
  );
}
