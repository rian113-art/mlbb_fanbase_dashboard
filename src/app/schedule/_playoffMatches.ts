// src/app/schedule/_playoffMatches.ts

export interface PlayoffMatch {
  id: string;
  stage: "Upper Bracket" | "Lower Bracket" | "Grand Final";
  round: string;
  home: string;
  away: string;
  score?: {
    home: number;
    away: number;
  };
  status: "finished" | "upcoming";
  datetime?: string; // misal "Jum, 03 Okt, 16:15"
  format?: string;   // misal "BO6"
  bracket: "Upper" | "Lower";
}

export const PLAYOFF_MATCHES: PlayoffMatch[] = [
  // =========================
  // Upper Bracket Quarterfinals
  // =========================
  {
    id: "1",
    stage: "Upper Bracket",
    round: "Quarterfinals",
    home: "ONIC",
    away: "BTR",
    status: "upcoming",
    datetime: "Jum, 03 Okt, 16:15",
    format: "BO6",
    bracket: "Upper",
  },
  {
    id: "2",
    stage: "Upper Bracket",
    round: "Quarterfinals",
    home: "AE",
    away: "DEWA",
    status: "upcoming",
    datetime: "Jum, 03 Okt, 19:00",
    format: "BO6",
    bracket: "Upper",
  },

  // =========================
  // Upper Bracket Semifinals - masih placeholder
  // =========================
  {
    id: "3",
    stage: "Upper Bracket",
    round: "Semifinals",
    home: "Winner QF1",
    away: "Winner QF2",
    status: "upcoming",
    bracket: "Upper",
  },

  // =========================
  // Lower Bracket Round 1 - placeholder
  // =========================
  {
    id: "4",
    stage: "Lower Bracket",
    round: "Lower Round 1",
    home: "Loser QF1",
    away: "Loser QF2",
    status: "upcoming",
    bracket: "Lower",
  },

  // =========================
  // Lower Bracket Semifinals - placeholder
  // =========================
  {
    id: "5",
    stage: "Lower Bracket",
    round: "Lower Semifinals",
    home: "Winner LR1",
    away: "Loser UB SF",
    status: "upcoming",
    bracket: "Lower",
  },

  // =========================
  // Grand Final - placeholder
  // =========================
  {
    id: "6",
    stage: "Grand Final",
    round: "Final",
    home: "Winner UB SF",
    away: "Winner LB SF",
    status: "upcoming",
    bracket: "Upper", // bisa Upper untuk Grand Final
  },
];
