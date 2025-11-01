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
    score: { home: 3, away: 1 }, // ✅ poin kemengan
    datetime: "Rabu, 29 Okt 2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "2",
    code: "M2-BO5",
    stage: "Upper Bracket",
    home: "EVOS",
    away: "DEWA",
    score: { home: 3, away: 2 }, // ✅ poin kemangan
    datetime: "Rabu, 29 Okt 2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "3",
    code: "M3-BO5",
    stage: "Upper Bracket",
    home: "BTR",
    away: "AE",
    score: { home: 1, away: 3 }, // ✅ poin kemangan
    datetime: "Kamis, 30 Okt 2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "4",
    code: "M4-BO5",
    stage: "Upper Bracket",
    home: "ONIC",
    away: "EVOS",
    score: { home: 3, away: 2 }, // ✅ poin kemangan
    datetime: "Kamis, 30 Okt 2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "5",
    code: "M5-BO5",
    stage: "Lower Bracket",
    home: "BTR",
    away: "EVOS",
    score: { home: 0, away: 3 }, // ✅ poin kemangan
    datetime: "Jumat, 31 Okt 2025",
    format: "BO5",
    bracket: "Lower",
  },
  {
    id: "6",
    code: "M6-BO5",
    stage: "Final Upper Bracket",
    home: "AE",
    away: "ONIC",
    score: { home: 2, away: 3 }, // ✅ poin kemangan
    datetime: "Jumat, 31 Okt 2025",
    format: "BO5",
    bracket: "Upper",
  },
  {
    id: "7",
    code: "M7-BO7",
    stage: "Final Lower Bracket",
    home: "AE",
    away: "EVOS",
    score: { home: 4, away: 2 }, // ✅ poin kemangan
    datetime: "Sabtu, 1 Nov 2025",
    format: "BO7",
    bracket: "Lower",
  },
  {
    id: "8",
    code: "M8-BO7",
    stage: "Grand Final",
    home: "ONIC",
    away: "AE",
    score: { home: 0, away: 0 }, // ✅ poin kemangan
    datetime: "Minggu, 2 Nov 2025",
    format: "BO7",
    bracket: "Final",
  },
];
