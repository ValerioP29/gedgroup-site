export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  results: string[];
};

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
  },
];