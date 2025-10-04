export interface PlayoffMatch {
  id: string;
  stage: string;
  round: string;
  home: string;
  away: string;
  score: {
    home: number;
    away: number;
  };
  status: "finished" | "upcoming";

  // Tambahan baru
  datetime?: string; // misal "Jum, 03 Okt, 16:15"
  format?: string;   // misal "BO6"
}


export const PLAYOFF_MATCHES: PlayoffMatch[] = [
  // Quarterfinals
  { id: "1", stage: "Playoff", round: "Quarterfinals", home: "ONIC", away: "RRQ", score: { home: 3, away: 1 }, status: "finished", datetime: "Jum, 03 Okt, 16:15", format: "BO6" },
  { id: "2", stage: "Playoff", round: "Quarterfinals", home: "EVOS", away: "TLID", score: { home: 2, away: 3 }, status: "finished", datetime: "Jum, 03 Okt, 19:00", format: "BO6" },
  { id: "3", stage: "Playoff", round: "Quarterfinals", home: "EVOS", away: "TLID", score: { home: 2, away: 3 }, status: "finished", datetime: "Jum, 03 Okt, 19:00", format: "BO6" },
  

  // Semifinals
  { id: "3", stage: "Playoff", round: "Semifinals", home: "ONIC", away: "TLID", score: { home: 3, away: 2 }, status: "finished", datetime: "Sab, 04 Okt, 16:00", format: "BO6" },

  // Final
  { id: "4", stage: "Playoff", round: "Final", home: "ONIC", away: "RRQ", score: { home: 4, away: 3 }, status: "finished", datetime: "Min, 05 Okt, 18:00", format: "BO6" },
];

