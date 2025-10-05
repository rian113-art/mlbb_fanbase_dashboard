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
  { id: "1", stage: "Playoff", round: "Quarterfinals", home: "ONIC", away: "BTR", score: { home: 0, away: 0 }, status: "finished", datetime: "Jum, 03 Okt, 16:15", format: "BO6" },
  { id: "2", stage: "Playoff", round: "Quarterfinals", home: "AE", away: "DEWA", score: { home: 0, away: 0 }, status: "finished", datetime: "Jum, 03 Okt, 19:00", format: "BO6" },
  { id: "3", stage: "Playoff", round: "Quarterfinals", home: "EVOS", away: "NAVI", score: { home: 0, away: 0 }, status: "finished", datetime: "Jum, 03 Okt, 19:00", format: "BO6" },
  
  

  // Semifinals
 

  // Final
  
];

