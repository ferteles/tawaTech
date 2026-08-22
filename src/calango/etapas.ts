export type Etapa = {
  titulo: string;
  texto: string;
  /** Posição do nó na curva 3D do fluxo. */
  pos: [number, number, number];
};

export const ETAPAS: Etapa[] = [
  {
    titulo: "Levantamento",
    texto:
      "Entender a regra com quem executa o processo hoje, não com quem imagina como ele deveria ser.",
    pos: [-5.2, 0.35, -0.6],
  },
  {
    titulo: "Modelagem",
    texto:
      "Desenhar dados e fluxo. É aqui que erro custa barato — depois do código, custa reescrita.",
    pos: [-2.6, -0.55, 1],
  },
  {
    titulo: "Interface",
    texto:
      "Telas e navegação, validadas com quem vai usar todo dia antes de virar código.",
    pos: [0, 0.65, 0],
  },
  {
    titulo: "Implementação",
    texto:
      "Código em entregas parciais, com teste no que quebra caro e revisão a cada etapa.",
    pos: [2.6, -0.45, -1],
  },
  {
    titulo: "Publicação",
    texto: "No ar, monitorado, com backup e documentação na mão da empresa.",
    pos: [5.2, 0.4, 0.6],
  },
];
