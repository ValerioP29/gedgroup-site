export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  heroLabel: string;
  summary: string;
  image: { src: string; alt: string; ratio: "4/3" };
  heroImage: { src: string; alt: string; ratio: "16/9" };
  detailImages: Array<{ src: string; alt: string; ratio: "4/3" }>;
  description: string[];
  bullets: string[];
  sectors: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  serviceOutputs: string[];
  proofBullets: string[];
  responseTime: string;
  coverage: string;
  miniCase?: { title: string; context: string; outcome: string };
};

const base = "https://images.unsplash.com";

export const services: ServiceItem[] = [
  {
    slug: "pulizie-uffici",
    title: "Pulizie Uffici e Studi",
    short: "Pulizie quotidiane e programmate per uffici, studi professionali e sedi aziendali.",
    icon: "🏢",
    heroLabel: "Ambienti ordinati, produttività più alta",
    summary:
      "Servizi flessibili prima, durante o dopo l'orario di lavoro con piani personalizzati e reportistica.",
    image: {
      src: `${base}/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80`,
      alt: "Ufficio moderno pulito e in ordine",
      ratio: "4/3",
    },
    heroImage: {
      src: `${base}/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80`,
      alt: "Scrivanie e sale meeting preparate dopo il servizio GED Group",
      ratio: "16/9",
    },
    detailImages: [
      {
        src: `${base}/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1100&q=80`,
        alt: "Pulizia postazioni di lavoro in ufficio",
        ratio: "4/3",
      },
      {
        src: `${base}/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80`,
        alt: "Sala riunioni pronta all'uso",
        ratio: "4/3",
      },
    ],
    description: [
      "Organizziamo interventi periodici per uffici, studi medici, studi tecnici e sedi amministrative, con un piano chiaro e scalabile in base agli spazi e ai flussi di persone.",
      "Gestiamo postazioni, aree comuni, servizi igienici e punti ad alto contatto con attenzione a igiene, discrezione e continuità operativa.",
    ],
    bullets: [
      "Programmazione giornaliera, settimanale o su turni",
      "Pulizia scrivanie, aree break, sale riunioni, bagni",
      "Fornitura e reintegro materiali di consumo su richiesta",
      "Check qualità periodici e referente dedicato",
    ],
    sectors: ["Uffici direzionali", "Studi professionali", "Coworking", "Centri servizi"],
    process: [
      "Sopralluogo tecnico e raccolta esigenze",
      "Proposta con frequenze e capitolato",
      "Avvio servizio con team dedicato",
      "Controlli qualità e ottimizzazione periodica",
    ],
    faqs: [
      {
        q: "Potete lavorare fuori orario ufficio?",
        a: "Sì. Organizziamo turni mattina presto, pausa pranzo o sera per ridurre al minimo l'impatto sulle attività.",
      },
      {
        q: "È possibile avere un referente unico?",
        a: "Sì. Per ogni cliente prevediamo un referente operativo per comunicazioni rapide e verifiche.",
      },
    ],
    serviceOutputs: [
      "Calendario interventi condiviso con frequenze per area",
      "Checklist ambienti critici (postazioni, sale meeting, bagni)",
      "Report sintetico periodico su esecuzione e allineamenti",
    ],
    proofBullets: [
      "Controllo giornaliero punti ad alto contatto",
      "Verifica settimanale standard pulizia aree comuni",
      "Allineamento mensile con referente cliente",
    ],
    responseTime: "Presa in carico richiesta entro 4 ore lavorative (placeholder)",
    coverage: "Latina, Roma Sud e provincia (placeholder)",
    miniCase: {
      title: "Sede direzionale multi-piano",
      context: "Incremento flussi e necessità di mantenere sale meeting sempre pronte.",
      outcome: "Riduzione segnalazioni interne e standard visivo omogeneo su tutti i piani.",
    },
  },
  {
    slug: "pulizie-condomini",
    title: "Pulizie Condomini",
    short: "Gestione ordinaria e straordinaria di scale, androni, vetri, aree comuni e spazi esterni.",
    icon: "🏠",
    heroLabel: "Condomini curati, residenti più soddisfatti",
    summary:
      "Interventi programmati e tracciabili per amministratori e condomìni con standard costanti e comunicazione chiara.",
    image: {
      src: `${base}/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80`,
      alt: "Ingresso condominiale pulito",
      ratio: "4/3",
    },
    heroImage: {
      src: `${base}/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80`,
      alt: "Facciata e androne condominiale mantenuti",
      ratio: "16/9",
    },
    detailImages: [
      {
        src: `${base}/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1100&q=80`,
        alt: "Pulizia scale e corrimano",
        ratio: "4/3",
      },
      {
        src: `${base}/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1100&q=80`,
        alt: "Androne ordinato e illuminato",
        ratio: "4/3",
      },
    ],
    description: [
      "Seguiamo condomìni di piccole e grandi dimensioni con piani di pulizia stabili e flessibili, calibrati su traffico, stagionalità e caratteristiche dell'immobile.",
      "Gestiamo zone comuni interne ed esterne, con attenzione alla continuità del servizio e alla percezione di ordine da parte dei residenti.",
    ],
    bullets: [
      "Scale, androni, ascensori e corrimani",
      "Portoni, vetri e superfici ad alto contatto",
      "Cortili e aree comuni coperte",
      "Calendario interventi condiviso con amministratore",
    ],
    sectors: ["Condomìni", "Residence", "Palazzine direzionali", "Complessi misti"],
    process: [
      "Sopralluogo con amministratore",
      "Definizione frequenze e aree incluse",
      "Avvio e monitoraggio interventi",
      "Verifiche periodiche e gestione segnalazioni",
    ],
    faqs: [
      {
        q: "Gestite anche urgenze o interventi extra?",
        a: "Sì. Possiamo prevedere interventi straordinari su richiesta, ad esempio dopo lavori o eventi particolari.",
      },
      {
        q: "Fornite un calendario degli interventi?",
        a: "Sì. Possiamo concordare un piano visibile e condiviso con amministratore o portineria.",
      },
    ],
    serviceOutputs: [
      "Piano settimanale aree comuni e ingressi",
      "Registro interventi condivisibile con amministratore",
      "Gestione richieste extra con canale dedicato",
    ],
    proofBullets: [
      "Controllo rotazione scale/ascensori per fasce orarie",
      "Verifica periodica vetri e superfici ad alto traffico",
      "Aggiornamento mensile con amministrazione condominiale",
    ],
    responseTime: "Presa in carico segnalazioni entro 4 ore lavorative (placeholder)",
    coverage: "Latina, Terracina, Fondi e aree limitrofe (placeholder)",
    miniCase: {
      title: "Condominio ad alto traffico",
      context: "Lamentele ricorrenti su androne e ascensori nelle ore di punta.",
      outcome: "Migliore regolarità percepita e riduzione segnalazioni nel primo trimestre.",
    },
  },
  {
    slug: "pulizie-industriali",
    title: "Pulizie Industriali",
    short: "Pulizie tecniche e manutentive per aree produttive, magazzini, logistica e spazi operativi.",
    icon: "🏭",
    heroLabel: "Pulizia tecnica per ambienti operativi complessi",
    summary:
      "Interventi su aree produttive e logistiche con procedure concordate, sicurezza e pianificazione per non fermare il lavoro.",
    image: {
      src: `${base}/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80`,
      alt: "Magazzino ordinato dopo intervento di pulizia",
      ratio: "4/3",
    },
    heroImage: {
      src: `${base}/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=80`,
      alt: "Area industriale con pavimentazioni tecniche pulite",
      ratio: "16/9",
    },
    detailImages: [
      {
        src: `${base}/photo-1581092160607-ee22731d8f4d?auto=format&fit=crop&w=1100&q=80`,
        alt: "Operatore in area logistica",
        ratio: "4/3",
      },
      {
        src: `${base}/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=80`,
        alt: "Attrezzatura professionale per pulizie tecniche",
        ratio: "4/3",
      },
    ],
    description: [
      "Operiamo in contesti industriali e logistici dove tempi, sicurezza e procedure sono fondamentali. Pianifichiamo gli interventi per ridurre impatti su produzione e movimentazione.",
      "Costruiamo un capitolato chiaro con attività, frequenze e finestre operative, con attenzione alla conformità e alle esigenze di stabilimento.",
    ],
    bullets: [
      "Aree produttive e logistiche",
      "Pavimentazioni tecniche e zone operative",
      "Spogliatoi, servizi, uffici interni e aree comuni",
      "Pianificazione su turni e finestre operative",
    ],
    sectors: ["Industria", "Logistica", "Magazzini", "Aree produttive"],
    process: [
      "Sopralluogo tecnico e assessment rischi",
      "Capitolato operativo e piano attività",
      "Avvio con coordinamento operativo",
      "Report periodici e miglioramento continuo",
    ],
    faqs: [
      {
        q: "Lavorate su turni notturni o weekend?",
        a: "Sì. Organizziamo il servizio in base alle finestre operative del cliente.",
      },
      {
        q: "Gestite aree con procedure specifiche?",
        a: "Sì. Allineiamo procedure e accessi con il vostro referente HSE o di stabilimento.",
      },
    ],
    serviceOutputs: [
      "Capitolato operativo con finestre compatibili con la produzione",
      "Checklist sicurezza e conformità per area",
      "Report periodico con criticità e azioni correttive",
    ],
    proofBullets: [
      "Controllo pre-intervento su accessi e permessi",
      "Verifica post-intervento su zone critiche e percorsi logistici",
      "Riesame periodico con referente di stabilimento",
    ],
    responseTime: "Attivazione piano operativo entro 5 giorni lavorativi (placeholder)",
    coverage: "Aree industriali Lazio sud (placeholder)",
    miniCase: {
      title: "Hub logistico su turni estesi",
      context: "Necessità di pulizia senza interferire con movimentazione merci H24.",
      outcome: "Routine stabile in finestre dedicate e continuità operativa mantenuta.",
    },
  },
  {
    slug: "sanificazioni-e-straordinari",
    title: "Sanificazioni e Straordinari",
    short: "Interventi straordinari, sanificazioni mirate e ripristini post-lavori o post-evento.",
    icon: "🧴",
    heroLabel: "Interventi rapidi quando serve davvero",
    summary:
      "Servizi una tantum o pianificati per sanificazioni mirate, pulizie profonde e ripristini di ambienti.",
    image: {
      src: `${base}/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=900&q=80`,
      alt: "Intervento di sanificazione su superfici",
      ratio: "4/3",
    },
    heroImage: {
      src: `${base}/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80`,
      alt: "Macchinario professionale per pulizia straordinaria",
      ratio: "16/9",
    },
    detailImages: [
      {
        src: `${base}/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1100&q=80`,
        alt: "Pulizia profonda di superfici",
        ratio: "4/3",
      },
      {
        src: `${base}/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=80`,
        alt: "Locale ripristinato dopo intervento straordinario",
        ratio: "4/3",
      },
    ],
    description: [
      "Eseguiamo interventi straordinari per situazioni specifiche: ripristino locali, pulizie profonde, post-lavori e sanificazioni mirate in base all'uso degli ambienti.",
      "Definiamo in anticipo obiettivo, aree coinvolte e tempi, per dare un risultato chiaro e verificabile senza sorprese.",
    ],
    bullets: [
      "Pulizie straordinarie e di fondo",
      "Ripristino post-lavori e pre-apertura",
      "Sanificazioni mirate su ambienti e superfici",
      "Interventi programmati o urgenti",
    ],
    sectors: ["Retail", "Uffici", "Condomìni", "Strutture ricettive"],
    process: [
      "Valutazione rapida e sopralluogo",
      "Definizione obiettivo e tempistiche",
      "Intervento operativo",
      "Consegna e verifica finale",
    ],
    faqs: [
      {
        q: "Intervenite anche con urgenza?",
        a: "Sì, in base alla disponibilità operativa possiamo organizzare interventi rapidi.",
      },
      {
        q: "Fate anche solo un intervento singolo?",
        a: "Sì. Gli straordinari possono essere singoli o diventare periodici se necessario.",
      },
    ],
    serviceOutputs: [
      "Obiettivo intervento condiviso prima dell'avvio",
      "Checklist consegna finale area per area",
      "Report sintetico di chiusura attività",
    ],
    proofBullets: [
      "Pianificazione materiali e attrezzature in base al contesto",
      "Verifica intermedia su aree prioritarie",
      "Conferma finale con referente cliente",
    ],
    responseTime: "Valutazione preliminare entro 24 ore lavorative (placeholder)",
    coverage: "Interventi spot su Lazio sud e area Pontina (placeholder)",
    miniCase: {
      title: "Ripristino post-lavori in sede retail",
      context: "Apertura imminente con necessità di consegna in tempi brevi.",
      outcome: "Locale consegnato entro la finestra concordata con standard verificato.",
    },
  },
];

export const homeServices: ServiceItem[] = services.slice(0, 3);
export const catalogServices: ServiceItem[] = services;
