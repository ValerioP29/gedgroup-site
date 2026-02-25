export type HomeStat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export const homeStats: HomeStat[] = [
  { label: "Interventi completati", value: 1200, suffix: "+" },
  { label: "Clienti attivi", value: 85, suffix: "+" },
  { label: "Anni di esperienza", value: 10, suffix: "+" },
  { label: "Tempo medio risposta", value: 24, suffix: "h" },
];
