export type MediaImage = {
  src: string;
  alt: string;
  ratio: "16/9" | "4/3" | "3/2" | "1/1" | "21/9";
  position?: string;
};

export type PageMediaConfig = {
  hero: { image: MediaImage };
  sections: Record<string, { image: MediaImage } | { images: MediaImage[] }>;
};

const base = "https://images.unsplash.com";

export const pageMedia: Record<string, PageMediaConfig> = {
  home: {
    hero: {
      image: {
        src: `${base}/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80`,
        alt: "Team GED Group durante un intervento di pulizia professionale in ufficio",
        ratio: "16/9",
        position: "center",
      },
    },
    sections: {
      why: {
        image: {
          src: `${base}/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80`,
          alt: "Operatore GED Group con checklist qualità durante controllo intervento",
          ratio: "4/3",
          position: "center",
        },
      },
      projects: {
        images: [
          {
            src: `${base}/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80`,
            alt: "Caso condominiale: area ingresso verificata dopo piano interventi",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80`,
            alt: "Caso industriale: corsia logistica pulita e pronta al turno successivo",
            ratio: "4/3",
          },
        ],
      },
    },
  },
  chiSiamo: {
    hero: {
      image: {
        src: `${base}/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80`,
        alt: "Team GED Group in riunione operativa",
        ratio: "16/9",
      },
    },
    sections: {
      mission: {
        image: {
          src: `${base}/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80`,
          alt: "Coordinatore GED Group durante la pianificazione attività",
          ratio: "4/3",
        },
      },
      metodo: {
        images: [
          {
            src: `${base}/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1000&q=80`,
            alt: "Checklist qualità compilata in cantiere con evidenze attività",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80`,
            alt: "Attrezzature e DPI pronti per intervento operativo",
            ratio: "4/3",
          },
        ],
      },
    },
  },
  servizi: {
    hero: {
      image: {
        src: `${base}/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80`,
        alt: "Operatore GED Group durante sanificazione di ambiente professionale",
        ratio: "16/9",
      },
    },
    sections: {},
  },
  certificazioni: {
    hero: {
      image: {
        src: `${base}/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80`,
        alt: "Documentazione certificativa e audit qualità su scrivania operativa",
        ratio: "16/9",
      },
    },
    sections: {
      badges: {
        images: [
          {
            src: `${base}/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80`,
            alt: "Documento di audit qualità con campi compilati",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80`,
            alt: "Registro procedure ambientali in contesto ufficio",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80`,
            alt: "Badge e documenti di conformità in fase di verifica",
            ratio: "4/3",
          },
        ],
      },
    },
  },
  customerCare: {
    hero: {
      image: {
        src: `${base}/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1800&q=80`,
        alt: "Desk operativo customer care con gestione richieste clienti",
        ratio: "16/9",
      },
    },
    sections: {
      workflow: {
        image: {
          src: `${base}/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80`,
          alt: "Team assistenza durante coordinamento richieste operative",
          ratio: "4/3",
        },
      },
    },
  },
  serviceDetail: {
    hero: {
      image: {
        src: `${base}/photo-1598257006626-5b0fd5d8b8d8?auto=format&fit=crop&w=1800&q=80`,
        alt: "Intervento tecnico di pulizia in area aziendale",
        ratio: "16/9",
      },
    },
    sections: {
      detailA: {
        image: {
          src: `${base}/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80`,
          alt: "Dettaglio pulizia postazione di lavoro",
          ratio: "4/3",
        },
      },
      detailB: {
        image: {
          src: `${base}/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80`,
          alt: "Team operativo in riordino area comune",
          ratio: "4/3",
        },
      },
    },
  },
  casiStudio: {
    hero: {
      image: {
        src: `${base}/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=80`,
        alt: "Vista di edificio direzionale gestito da GED Group",
        ratio: "16/9",
      },
    },
    sections: {
      gallery: {
        images: [
          {
            src: `${base}/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80`,
            alt: "Caso uffici multi-sede: sala riunioni pronta all'apertura",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1507209696998-3c532be9b2b5?auto=format&fit=crop&w=1000&q=80`,
            alt: "Caso condominio: androne ad alto traffico con standard mantenuto",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80`,
            alt: "Caso logistica: area produttiva riattivata dopo intervento pianificato",
            ratio: "4/3",
          },
        ],
      },
    },
  },
};

// Nota operativa: sostituire questi URL con asset Cloudflare mantenendo la stessa struttura dati.
