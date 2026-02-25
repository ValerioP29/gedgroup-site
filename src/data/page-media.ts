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
          alt: "Operatore con attrezzatura professionale in un corridoio aziendale",
          ratio: "4/3",
          position: "center",
        },
      },
      projects: {
        images: [
          {
            src: `${base}/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80`,
            alt: "Ingresso condominiale pulito e ordinato",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80`,
            alt: "Open space aziendale sanificato e pronto all'uso",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80`,
            alt: "Area logistica con pavimentazione tecnica pulita",
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
            alt: "Checklist qualità compilata in cantiere",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80`,
            alt: "Macchinari professionali pronti per intervento",
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
            alt: "Sala riunioni preparata dopo intervento",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1507209696998-3c532be9b2b5?auto=format&fit=crop&w=1000&q=80`,
            alt: "Androne condominiale in ordine",
            ratio: "4/3",
          },
          {
            src: `${base}/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80`,
            alt: "Area produttiva pulita e sicura",
            ratio: "4/3",
          },
        ],
      },
    },
  },
};

// Nota operativa: sostituire questi URL con asset Cloudflare mantenendo la stessa struttura dati.
