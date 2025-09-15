// Data manual untuk semua tim.
// Edit angka di sini saja.

export type Team =
  | "ONIC" | "RRQ" | "EVOS" | "TLID" | "GEEK" | "AE" | "NAVI" | "BTR" | "DEWA";

// List tim (opsional, memudahkan iterasi)
export const TEAM_LIST: Team[] = ["ONIC","RRQ","EVOS","TLID","GEEK","AE","NAVI","BTR","DEWA"];

// Stats channel manual (untuk grafik Subscribers / BubbleBoard)
export const MANUAL_STATS: Record<Team, {
  title?: string;
  subscribers: number;
  views?: number;
  videos?: number;
  hiddenSubscribers?: boolean; // jika true, client akan skip update ke 0
}> = {
  ONIC: { title: "ONIC Esports", subscribers: 914_000, views: 170_323_475, videos: 800 },
  RRQ:  { title: "RRQ Hoshi",     subscribers: 4_190_000, views: 920_988_477, videos: 1200 },
  EVOS: { title: "EVOS Glory",    subscribers: 3_070_000, views: 391_629_090, videos: 1000 },
  TLID: { title: "Team Liquid ID",subscribers: 2_020_000, views: 241_716_348, videos: 450 },
  GEEK: { title: "Geek Fam ID",   subscribers: 75_400, views: 10_784_342, videos: 430 },
  AE:   { title: "Alter Ego",     subscribers: 695_000, views: 107_052_309, videos: 400 },
  NAVI: { title: "NAVI",          subscribers: 36_300, views: 8_284_320, videos: 380 },
  BTR:  { title: "Bigetron",      subscribers: 1_464_000,  views: 271_281_122, videos: 360 },
  DEWA: { title: "Dewa United",   subscribers: 410_000,  views: 3_959_591, videos: 330 },
};

// Status live manual (untuk grafik Livestream)
export const MANUAL_LIVE: Record<Team, {
  live: boolean;
  videoId?: string;
  title?: string;
  concurrent?: number;     // current viewers
  startedAt?: string;      // ISO string
}> = {
  ONIC: { live: false },
  RRQ:  { live: true,  videoId: "manual-rrq-001", title: "RRQ Scrim Live", concurrent: 5234, startedAt: new Date(Date.now()-60*60*1000).toISOString() },
  EVOS: { live: false },
  TLID: { live: false },
  GEEK: { live: false },
  AE:   { live: false },
  NAVI: { live: false },
  BTR:  { live: false },
  DEWA: { live: false },
};
