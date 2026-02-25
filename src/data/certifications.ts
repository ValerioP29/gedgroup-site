export type CertificationItem = {
  code: string;
  name: string;
  certifyingBody: string;
  scope: string;
  status: "Valida" | "In rinnovo" | "In aggiornamento";
  expiry: string;
  documentLabel: string;
  documentHref?: string;
  badgeImage: { src: string; alt: string; ratio: "1/1" | "4/3" };
};

const base = "https://images.unsplash.com";

export const certifications: CertificationItem[] = [
  {
    code: "ISO 9001",
    name: "Sistema di Gestione Qualità",
    certifyingBody: "Ente certificatore accreditato (placeholder)",
    scope: "Progettazione ed erogazione servizi di pulizia civile e industriale.",
    status: "Valida",
    expiry: "12/2026 (placeholder)",
    documentLabel: "Scarica attestato ISO 9001",
    documentHref: "",
    badgeImage: {
      src: `${base}/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80`,
      alt: "Documento qualità con checklist audit per servizio di pulizia",
      ratio: "1/1",
    },
  },
  {
    code: "ISO 14001",
    name: "Sistema di Gestione Ambientale",
    certifyingBody: "Ente certificatore accreditato (placeholder)",
    scope: "Procedure ambientali per gestione materiali, attrezzature e processi operativi.",
    status: "In rinnovo",
    expiry: "03/2025 (placeholder)",
    documentLabel: "Documento in aggiornamento",
    documentHref: "",
    badgeImage: {
      src: `${base}/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80`,
      alt: "Registro ambientale e procedure operative GED Group",
      ratio: "1/1",
    },
  },
  {
    code: "Sicurezza",
    name: "Formazione e conformità sicurezza team",
    certifyingBody: "RSPP / ente formazione qualificato (placeholder)",
    scope: "Piani formativi, DPI e procedure sicurezza per attività in sede cliente.",
    status: "Valida",
    expiry: "Aggiornamento periodico trimestrale (placeholder)",
    documentLabel: "Richiedi evidenze formazione",
    documentHref: "",
    badgeImage: {
      src: `${base}/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80`,
      alt: "Operatore con dispositivi di sicurezza durante attività tecnica",
      ratio: "1/1",
    },
  },
];
