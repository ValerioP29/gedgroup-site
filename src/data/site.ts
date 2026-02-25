export const site = {
  companyName: "GED Group",
  legalName: "GED Group S.r.l.",
  tagline: "Pulizie professionali per aziende, condomini e ambienti ad alta esigenza",
  baseUrl: "https://preview.ged-group.it", // poi metti https://ged-group.it
  email: "info@ged-group.it",
  phoneDisplay: "+39 0773 000000",
  phoneHref: "+390773000000",
  whatsappNumber: "390000000000", // formato internazionale senza +
  address: "Via Esempio 123, Terracina (LT)",
  vatNumber: "P.IVA 00000000000",
  rea: "REA LT-000000",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/company/",
  },
  trust: {
    leadResponseTime: "entro 4 ore lavorative",
    serviceArea: "Latina, Roma Sud e provincia (placeholder)",
    surveyTime: "entro 3 giorni lavorativi",
    customerCareSla: "presa in carico entro 2 ore lavorative",
    urgencySla: "gestione prioritaria su canale dedicato",
  },
  gtmId: "", // es: "GTM-XXXXXXX" (lo aggiungiamo dopo)
};

export function getWhatsAppUrl(customText?: string) {
  const text =
    customText ??
    "Ciao GED Group, vorrei richiedere un preventivo per un servizio di pulizie.";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
