export interface PlayoffMatch {
  id: string;
  code: string;
  stage:
    | "Upper Bracket"
    | "Lower Bracket"
    | "Final Upper Bracket"
    | "Final Lower Bracket"
    | "Grand Final";
  home: string;
  away: string;
  score?: {
    home: number;
    away: number;
  };
  datetime: string;
  format: string;
  bracket: "Upper" | "Lower" | "Final";
}

export const PLAYOFF_MATCHES: PlayoffMatch[] = [
  {
    id: "1",
    code: "M1-BO5",
    stage: "Upper Bracket",
    home: "AE",
    away: "NAVI",
    datetime: "11,JUN,2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "2",
    code: "M2-BO5",
    stage: "Upper Bracket",
    home: "EVOS",
    away: "DEWA",
    datetime: "11,JUN,2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "3",
    code: "M3-BO5",
    stage: "Upper Bracket",
    home: "BTR",
    away: "Winner M1",
    datetime: "12,JUN,2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "4",
    code: "M4-BO5",
    stage: "Upper Bracket",
    home: "ONIC",
    away: "Winner M2",
    datetime: "12,JUN,2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "5",
    code: "M5-BO5",
    stage: "Lower Bracket",
    home: "Loser M3",
    away: "Loser M4",
    datetime: "13,JUN,2025",
    format: "BO5",
    bracket: "Lower",
  },
  {
    id: "6",
    code: "M6-BO5",
    stage: "Final Upper Bracket",
    home: "Winner M3",
    away: "Winner M4",
    datetime: "13,JUN,2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "7",
    code: "M7-BO7",
    stage: "Final Lower Bracket",
    home: "Loser M6",
    away: "Winner M5",
    datetime: "14,JUN,2025",
    format: "BO7",
    bracket: "Lower",
  },
  {
    id: "8",
    code: "M8-BO7",
    stage: "Grand Final",
    home: "Winner M6",
    away: "Winner M7",
    datetime: "15,JUN,2025",
    format: "BO7",
    bracket: "Final",
  },
];
