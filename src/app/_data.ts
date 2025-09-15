// === TYPES DASAR ===
export type Team =
  | "ONIC" | "RRQ" | "EVOS" | "TLID" | "GEEK" | "AE" | "NAVI" | "BTR" | "DEWA";

export type Role = "Jungle" | "Gold" | "Mid" | "EXP" | "Roam";

export type Player = {
  name: string;
  role: Role;
};

type Roster = {
  players: Player[];
  coach: string;
};

export type TeamTitle = {
  year: number;
  event: string;       // nama turnamen
  result: "Champion" | "Runner-up" | "3rd place";
  note?: string;      // opsional, misal: "M-Series", "International"
};

export const TEAM_TITLES: Record<Team, TeamTitle[]> = {
  ONIC: [
    { year: 2023, event: "MSC", result: "Champion", note: "International"},
    { year: 2019, event: "MSC", result: "Champion", note: "International"},
    { year: 2025, event: "MPL ID S15", result: "Champion", note: "National" },
    { year: 2024, event: "MPL ID S13", result: "Champion", note: "National" },
    { year: 2023, event: "MPL ID S12", result: "Champion", note: "National" },
    { year: 2023, event: "MPL ID S11", result: "Champion", note: "National" },
    { year: 2022, event: "MPL ID S10", result: "Champion", note: "National" },
    { year: 2021, event: "MPL ID S8", result: "Champion", note: "National" },
    { year: 2019, event: "MPL ID S3", result: "Champion", note: "National" },
  ],
  RRQ: [
    { year: 2022, event: "MPL ID S9", result: "Champion", note: "National" },
    { year: 2020, event: "MPL ID S6", result: "Champion", note: "National" },
    { year: 2020, event: "MPL ID S5", result: "Champion", note: "National" },
    { year: 2019, event: "MPL ID S2", result: "Champion", note: "National" },
  ],
  EVOS: [
    { year: 2019, event: "M1 World Championship", result: "Champion", note: "M-Series" },
    { year: 2022, event: "IESF World Championship", result: "Champion", note: "international" },
    { year: 2021, event: "MPL ID S7", result: "Champion", note: "National" },
    { year: 2019, event: "MPL ID S4", result: "Champion", note: "National" },
  ],
  TLID: [
    { year: 2024, event: "MPL ID S14", result: "Champion", note: "National" },
  ],
  GEEK: [
    
  ],
  AE: [
    { year: 2020, event: "MPL Invitational", result: "Champion", note: "international" },
  ],
  NAVI: [
    
  ],
  BTR: [
    
  ],
  DEWA: [
    
  ],
};

// === IDENTITAS & WARNA ===
export const TEAM_FULLNAME: Record<Team, string> = {
  ONIC: "ONIC Esports",
  RRQ: "RRQ Hoshi",
  EVOS: "EVOS Glory",
  TLID: "Team Liquid ID",
  GEEK: "Geek Fam ID",
  AE: "Alter Ego",
  NAVI: "Natus Vincere",
  BTR: "Bigetron by Vitality",
  DEWA: "Dewa United Esports",
};

export const TEAM_COLOR: Record<Team, string> = {
  ONIC: "#FFD100",
  RRQ: "#4B5563",   // abu-abu gelap
  EVOS: "#5AA9E6",
  TLID: "#2563EB",
  GEEK: "#FF6B6B",
  AE: "#7C3AED",
  NAVI: "#FACC15",
  BTR: "#F9A8D4",   // pink terang
  DEWA: "#EAB308",
};

// === BASELINE (mock) ===
export const TEAM_BASELINE: Record<Team, number> = {
  ONIC: 210_000,
  RRQ: 180_000,
  EVOS: 150_000,
  TLID: 130_000,
  GEEK: 120_000,
  AE: 110_000,
  NAVI: 100_000,
  BTR: 95_000,
  DEWA: 85_000,
};

// === STYLE BADGE ROLE (opsional) ===
export const ROLE_COLOR: Record<Role, { bg: string; text: string; border: string }> = {
  Jungle: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Gold:   { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200" },
  Mid:    { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200" },
  EXP:    { bg: "bg-purple-50",  text: "text-purple-700",  border: "border-purple-200" },
  Roam:   { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200" },
};

// urutan tampil
export const ROLE_ORDER: Role[] = ["Jungle", "Gold", "Mid", "EXP", "Roam"];
// === ROSTER (ISI DAPAT KAMU UBAH KAPAN SAJA) ===
// Catatan: ini contoh/placeholder; silakan sesuaikan dengan line-up terbaru tim yang kamu miliki.
export const TEAM_ROSTER: Record<Team, Roster> = {
  ONIC: {
    players: [
      { name: "Kairi", role: "Jungle" },
      { name: "Lutpiii", role: "EXP" },
      { name: "Skylar", role: "Gold" },
      { name: "SANZ", role: "Mid" },
      { name: "Kiboy", role: "Roam" },
      { name: "Savero", role: "Gold" }, // jika kamu mau cantumkan
    ],
    coach: "Adi",
  },
  RRQ: {
    players: [
      { name: "Rinz", role: "Mid" },
      { name: "Zunesh", role: "Jungle" },
      { name: "Sutsujin", role: "Jungle" },
      { name: "Rezzz", role: "EXP" },
      { name: "Dyrennn", role: "EXP" },
      { name: "Idok", role: "Roam" },
      { name: "ToYy", role: "Gold" },
    ],
    coach: "Khezcute",
  },
  EVOS: {
    players: [
      { name: "Alberttt", role: "Jungle" },
      { name: "Erlan", role: "Gold" },
      { name: "Branz", role: "Gold" },
      { name: "Swaylow", role: "Mid" },
      { name: "RoundeL", role: "Mid" },
      { name: "Xorizo", role: "EXP" },
      { name: "Kyy", role: "Roam" },
    ],
    coach: "Vyn",
  },
  TLID: {
    players: [
      { name: "JOOOO", role: "Jungle" },
      { name: "Faviannn", role: "Jungle" },
      { name: "Kyou", role: "Gold" },
      { name: "Kabuki", role: "Gold" },
      { name: "AeronnShikii", role: "Gold" },
      { name: "Aran", role: "EXP" },
      { name: "Widy", role: "Roam" },
      { name: "yehezkiel", role: "Mid" },
    ],
    coach: "SaintDeLucaz",
  },
  GEEK: {
    players: [
      { name: "Baloyskie", role: "Roam" },
      { name: "KennzyySkie", role: "Gold" },
      { name: "Zeltron", role: "Gold" },
      { name: "ABOY", role: "Mid" },
      { name: "Maykids", role: "Jungle" },
      { name: "Luke", role: "EXP" },
    ],
    coach: "DoraDSP",
  },
  AE: {
    players: [
      { name: "Hijumee", role: "Mid" },
      { name: "Nino", role: "EXP" },
      { name: "Arfy", role: "Gold" },
      { name: "Rinee", role: "Jungle" },
      { name: "Yazukee", role: "Jungle" },
      { name: "Ivann", role: "Roam" },
      { name: "alekk", role: "Roam" },
      { name: "Cyruz", role: "Mid" },
    ],
    coach: "Xepher",
  },
  NAVI: {
    players: [
      { name: "Woshipaul", role: "Jungle" },
      { name: "Andoryuuu", role: "Jungle" },
      { name: "Xyve", role: "Gold" },
      { name: "xMagic", role: "Mid" },
      { name: "UK1R", role: "Mid" },
      { name: "Karss", role: "EXP" },
      { name: "APRHO", role: "Roam" },
    ],
    coach: "Aldo",
  },
  BTR: {
    players: [
      { name: "Finn", role: "Roam" },
      { name: "NNAEL", role: "Jungle" },
      { name: "Ronn", role: "Jungle" },
      { name: "Shogun", role: "EXP" },
      { name: "Moreno", role: "Mid" },
      { name: "EMANN", role: "Gold" },
    ],
    coach: "Bam",
  },
  DEWA: {
    players: [
      { name: "Markkk", role: "EXP" },
      { name: "QINN", role: "EXP" },
      { name: "Reyy", role: "Jungle" },
      { name: "Vanz", role: "Jungle" },
      { name: "Octa", role: "Mid" },
      { name: "Muezza", role: "Roam" },
      { name: "Maybeee", role: "Gold" },
    ],
    coach: "Right",
  },
  
};
