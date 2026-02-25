export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  results: string[];
  image: { src: string; alt: string; ratio: "4/3" };
  ctaLabel: string;
  ctaMessage: string;
};

const base = "https://images.unsplash.com";

export const caseStudies: CaseStudy[] = [
  {
    slug: "uffici-multi-sede",
    title: "Uffici multi-sede con standard unificati",
    sector: "Uffici",
    challenge:
      "Gestire pulizie su più sedi con esigenze diverse e qualità non costante tra una sede e l'altra.",
    solution:
      "Capitolato unico, frequenze personalizzate per sede, referente operativo e controlli qualità periodici.",
    results: [
      "Piano interventi standardizzato",
      "Riduzione segnalazioni operative",
      "Migliore continuità del servizio",
    ],
    image: {
      src: `${base}/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80`,
      alt: "Caso uffici multi-sede: area meeting preparata con standard condiviso",
      ratio: "4/3",
    },
    ctaLabel: "Richiedi proposta per uffici",
    ctaMessage: "Ciao GED Group, vorrei una proposta per uffici su più sedi con standard unificati.",
  },
  {
    slug: "condominio-grande-traffico",
    title: "Condominio ad alto traffico in area urbana",
    sector: "Condomìni",
    challenge:
      "Aree comuni molto frequentate con bisogno di maggiore frequenza e comunicazione trasparente all'amministratore.",
    solution:
      "Piano settimanale visibile, interventi extra su richiesta e canale diretto con amministratore.",
    results: [
      "Aree comuni più curate e regolari",
      "Gestione segnalazioni più rapida",
      "Programmazione più chiara per i residenti",
    ],
    image: {
      src: `${base}/photo-1507209696998-3c532be9b2b5?auto=format&fit=crop&w=1000&q=80`,
      alt: "Caso condominio ad alto traffico: androne mantenuto pulito nelle fasce critiche",
      ratio: "4/3",
    },
    ctaLabel: "Richiedi proposta per condomìni",
    ctaMessage: "Ciao GED Group, vorrei una proposta per un condominio ad alto traffico.",
  },
  {
    slug: "stabilimento-logistico",
    title: "Stabilimento logistico con turni estesi",
    sector: "Industriale / Logistica",
    challenge:
      "Pulizie da eseguire senza interferire con movimentazione merci e attività su turni lunghi.",
    solution:
      "Interventi pianificati per finestre operative e coordinamento con referente di sito.",
    results: [
      "Minore impatto sull'operatività",
      "Aree comuni e servizi sempre presidiati",
      "Routine di pulizia sostenibile nel tempo",
    ],
    image: {
      src: `${base}/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80`,
      alt: "Caso logistico: corsie operative pulite senza fermo attività",
      ratio: "4/3",
    },
    ctaLabel: "Richiedi proposta per logistica",
    ctaMessage: "Ciao GED Group, vorrei una proposta per pulizie in contesto logistico su turni estesi.",
  },
];
