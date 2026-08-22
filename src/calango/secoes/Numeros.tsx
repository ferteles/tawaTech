const NUMEROS = [
  { conta: 12, rotulo: "Anos de estrada" },
  { texto: "[N]", rotulo: "Projetos entregues" },
  { texto: "[N]", rotulo: "Sistemas em operação" },
  { conta: 1, rotulo: "Interlocutor do começo ao fim" },
];

export function Numeros() {
  return (
    <section className="faixa-numeros">
      <div className="container">
        <div className="numeros">
          {NUMEROS.map((n, i) => (
            <div className="numero" data-revela={i} key={n.rotulo}>
              {n.conta !== undefined ? (
                <b data-conta={n.conta}>0</b>
              ) : (
                <b>{n.texto}</b>
              )}
              <span className="rot">{n.rotulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
