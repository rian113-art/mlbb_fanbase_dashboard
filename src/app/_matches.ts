// src/app/_matches.ts
import type { Team } from "./_data";

export type MatchItem = {
  id: string;
  dateISO: string; // gunakan zona waktu yang kamu mau; di sini pakai WIB (+07:00)
  stage: "Regular Season" | "Playoff" | "Grand Final";
  bo: "BO3" | "BO5" | "BO7";
  home: Team;
  away: Team;
  status: "upcoming" | "finished";
  score?: { home: number; away: number }; // isi hanya kalau finished
};

/**
 * Sumber: Halaman resmi MPL ID S16 (Regular Season)
 * Week 1–3 lengkap; Week 4 sebagian (yang sudah jelas tim & jamnya).
 * Catatan: jam di situs ditampilkan WIB. Di bawah ini aku pakai offset +07:00.
 * Jika kamu ingin pakai WITA (+08:00) tinggal ganti offset di string ISO-nya.
 */
export const MATCHES: MatchItem[] = [
  // ======================
  // WEEK 1 — 22–24 Agustus 2025
  // Jumat, 22 Agt
  { id: "w1-d1-m1", dateISO: "2025-08-22T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC", away: "DEWA", status: "finished", score: { home: 2, away: 0 } },
  { id: "w1-d1-m2", dateISO: "2025-08-22T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "EVOS", status: "finished", score: { home: 0, away: 2 } },
  // Sabtu, 23 Agt
  { id: "w1-d2-m1", dateISO: "2025-08-23T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID", away: "GEEK", status: "finished", score: { home: 1, away: 2 } },
  { id: "w1-d2-m2", dateISO: "2025-08-23T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC", away: "BTR",  status: "finished", score: { home: 2, away: 0 } },
  { id: "w1-d2-m3", dateISO: "2025-08-23T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "AE",   status: "finished", score: { home: 2, away: 1 } },
  // Minggu, 24 Agt
  { id: "w1-d3-m1", dateISO: "2025-08-24T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "NAVI", status: "finished", score: { home: 1, away: 2 } },
  { id: "w1-d3-m2", dateISO: "2025-08-24T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "RRQ",  status: "finished", score: { home: 2, away: 0 } },
  { id: "w1-d3-m3", dateISO: "2025-08-24T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",   away: "DEWA", status: "finished", score: { home: 2, away: 0 } },

  // ======================
  // WEEK 2 — 29–31 Agustus 2025
  // Jumat, 29 Agt
  { id: "w2-d1-m1", dateISO: "2025-08-29T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC", away: "GEEK", status: "finished", score: { home: 2, away: 0 } },
  { id: "w2-d1-m2", dateISO: "2025-08-29T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA", away: "NAVI", status: "finished", score: { home: 2, away: 0 } },
  // Sabtu, 30 Agt
  { id: "w2-d2-m1", dateISO: "2025-08-30T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "BTR",  status: "finished", score: { home: 0, away: 2 } },
  { id: "w2-d2-m2", dateISO: "2025-08-30T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",   away: "EVOS", status: "finished", score: { home: 2, away: 1 } },
  { id: "w2-d2-m3", dateISO: "2025-08-30T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID", away: "DEWA", status: "finished", score: { home: 1, away: 2 } },
  // Minggu, 31 Agt
  { id: "w2-d3-m1", dateISO: "2025-08-31T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "AE",   status: "finished", score: { home: 2, away: 0 } },
  { id: "w2-d3-m2", dateISO: "2025-08-31T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "TLID", status: "finished", score: { home: 2, away: 0 } },
  { id: "w2-d3-m3", dateISO: "2025-08-31T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "EVOS", status: "finished", score: { home: 2, away: 1 } },

  // ======================
  // WEEK 3 — 5–7 September 2025
  // Jumat, 5 Sep
  { id: "w3-d1-m1", dateISO: "2025-09-05T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "RRQ",  status: "finished", score: { home: 0, away: 2 } },
  { id: "w3-d1-m2", dateISO: "2025-09-05T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS", away: "TLID", status: "finished", score: { home: 2, away: 0 } },
  // Sabtu, 6 Sep
  { id: "w3-d2-m1", dateISO: "2025-09-06T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS", away: "GEEK", status: "finished", score: { home: 2, away: 0 } },
  { id: "w3-d2-m2", dateISO: "2025-09-06T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "AE",   status: "finished", score: { home: 2, away: 1 } },
  { id: "w3-d2-m3", dateISO: "2025-09-06T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "ONIC", status: "finished", score: { home: 0, away: 2 } },
  // Minggu, 7 Sep
  { id: "w3-d3-m1", dateISO: "2025-09-07T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA", away: "BTR",  status: "finished", score: { home: 1, away: 2 } },
  { id: "w3-d3-m2", dateISO: "2025-09-07T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",   away: "ONIC", status: "finished", score: { home: 1, away: 2 } },
  { id: "w3-d3-m3", dateISO: "2025-09-07T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID", away: "NAVI", status: "finished", score: { home: 0, away: 2 } },

  // ======================
  // WEEK 4 — 12–14 September 2025
  // Jumat, 12 Sep
  { id: "w4-d1-m1", dateISO: "2025-09-12T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "ONIC", status: "finished", score: { home: 1, away: 2 } },
  { id: "w4-d1-m2", dateISO: "2025-09-12T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS", away: "DEWA", status: "finished", score: { home: 2, away: 0 } },
  // Sabtu, 13 Sep
  { id: "w4-d2-m1", dateISO: "2025-09-13T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID", away: "BTR",  status: "finished", score: { home: 0, away: 2 } },
  { id: "w4-d2-m2", dateISO: "2025-09-13T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "EVOS", status: "finished", score: { home: 2, away: 0 } },
  { id: "w4-d2-m3", dateISO: "2025-09-13T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "AE",   status: "finished", score: { home: 0, away: 2 }},
  // Minggu, 14 Sep
  { id: "w4-d3-m1", dateISO: "2025-09-14T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC", away: "TLID", status: "finished", score: { home: 2, away: 0 } },
  { id: "w4-d3-m2", dateISO: "2025-09-14T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "RRQ",  status: "finished", score: { home: 2, away: 1 } },
  { id: "w4-d3-m3", dateISO: "2025-09-14T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA",  away: "GEEK",  status: "finished", score: { home: 2, away: 1 } },

  // ======================
  // WEEK 5 — 19–21 September 2025
  // Jumat, 19 Sep
  { id: "w5-d1-m1", dateISO: "2025-09-19T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "NAVI", status: "finished", score: { home: 0, away: 2 } },
  { id: "w5-d1-m2", dateISO: "2025-09-19T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS",  away: "ONIC",  status: "finished", score: { home: 1, away: 2 } },
  // Sabtu, 20 Sep
  { id: "w5-d2-m1", dateISO: "2025-09-20T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA", away: "RRQ", status: "finished", score: { home: 2, away: 0 } },
  { id: "w5-d2-m2", dateISO: "2025-09-20T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",  away: "TLID",  status: "finished", score: { home: 2, away: 1 } },
  { id: "w5-d2-m3", dateISO: "2025-09-20T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS",  away: "BTR",  status: "finished", score: { home: 0, away: 2 }  },
    // Mingu, 20 Sep
  { id: "w5-d3-m1", dateISO: "2025-09-21T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE", away: "NAVI", status: "finished", score: { home: 2, away: 1 }  },
  { id: "w5-d3-m2", dateISO: "2025-09-21T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK",  away: "ONIC",  status: "finished", score: { home: 0, away: 2 }  },
  { id: "w5-d3-m3", dateISO: "2025-09-21T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA",  away: "TLID",  status: "finished", score: { home: 2, away: 0 }  },

    // ======================
  // WEEK 6 — 26–28 September 2025
  // Jumat, 26 Sep
  { id: "w6-d1-m1", dateISO: "2025-09-26T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "DEWA", status: "finished", score: { home: 0, away: 2 }  },
  { id: "w6-d1-m2", dateISO: "2025-09-26T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",  away: "GEEK",  status: "finished", score: { home: 2, away: 0 }  },
  // Sabtu, 27 Sep
  { id: "w6-d2-m1", dateISO: "2025-09-27T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS", away: "AE", status: "finished", score: { home: 1, away: 2 }  },
  { id: "w6-d2-m2", dateISO: "2025-09-27T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID",  away: "ONIC",  status: "finished", score: { home: 0, away: 2 }  },
  { id: "w6-d2-m3", dateISO: "2025-09-27T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "BTR",  status: "finished", score: { home: 1, away: 2 }  },
    // Mingu, 28 Sep
  { id: "w6-d3-m1", dateISO: "2025-09-28T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI", away: "TLID", status: "finished", score: { home: 2, away: 1 }  },
  { id: "w6-d3-m2", dateISO: "2025-09-28T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC",  away: "RRQ",  status: "finished", score: { home: 2, away: 0 } },
  { id: "w6-d3-m3", dateISO: "2025-09-28T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK",  away: "EVOS",  status: "finished", score: { home: 0, away: 2 } },

      // ======================
  // WEEK 7 — 03–05 Oktober 2025
  // Jumat, 03 Okt
  { id: "w7-d1-m1", dateISO: "2025-10-03T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "DEWA", status: "finished", score: { home: 2, away: 0 }  },
  { id: "w7-d1-m2", dateISO: "2025-10-03T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "TLID",  status: "finished", score: { home: 0, away: 2 }  },
  // Sabtu, 04 Okt
  { id: "w7-d2-m1", dateISO: "2025-10-04T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA", away: "AE", status: "finished", score: { home: 2, away: 0 }  },
  { id: "w7-d2-m2", dateISO: "2025-10-04T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS",  away: "RRQ",  status: "finished", score: { home: 2, away: 1 }  },
  { id: "w7-d2-m3", dateISO: "2025-10-04T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC",  away: "NAVI",  status: "finished", score: { home: 2, away: 0 }  },
    // Mingu, 05 Okt
  { id: "w7-d3-m1", dateISO: "2025-10-05T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ", away: "GEEK", status: "finished", score: { home: 0, away: 2 }  },
  { id: "w7-d3-m2", dateISO: "2025-10-05T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI",  away: "BTR",  status: "finished", score: { home: 0, away: 2 }  },
  { id: "w7-d3-m3", dateISO: "2025-10-05T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID",  away: "EVOS",  status: "upcoming" },

        // ======================
  // WEEK 8 — 10–12 Oktober 2025
  // Jumat, 10 Okt
  { id: "w8-d1-m1", dateISO: "2025-10-10T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID", away: "AE", status: "upcoming" },
  { id: "w8-d1-m2", dateISO: "2025-10-10T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "DEWA",  status: "upcoming" },
  // Sabtu, 11 Okt
  { id: "w8-d2-m1", dateISO: "2025-10-11T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "GEEK", away: "TLID", status: "upcoming" },
  { id: "w8-d2-m2", dateISO: "2025-10-11T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",  away: "RRQ",  status: "upcoming" },
  { id: "w8-d2-m3", dateISO: "2025-10-11T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR",  away: "ONIC",  status: "upcoming" },
    // Mingu, 12 Okt
  { id: "w8-d3-m1", dateISO: "2025-10-12T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ", away: "DEWA", status: "upcoming" },
  { id: "w8-d3-m2", dateISO: "2025-10-12T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC",  away: "EVOS",  status: "upcoming" },
  { id: "w8-d3-m3", dateISO: "2025-10-12T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "NAVI",  away: "GEEK",  status: "upcoming" },

          // ======================
  // WEEK 9 — 17–19 Oktober 2025
  // Jumat, 17 Okt
  { id: "w9-d1-m1", dateISO: "2025-10-17T15:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "BTR", away: "GEEK", status: "upcoming" },
  { id: "w9-d1-m2", dateISO: "2025-10-17T18:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA",  away: "ONIC",  status: "upcoming" },
  // Sabtu, 18 Okt
  { id: "w9-d2-m1", dateISO: "2025-10-18T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "EVOS", away: "NAVI", status: "upcoming" },
  { id: "w9-d2-m2", dateISO: "2025-10-18T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "TLID",  away: "RRQ",  status: "upcoming" },
  { id: "w9-d2-m3", dateISO: "2025-10-18T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "ONIC",  away: "AE",  status: "upcoming" },
    // Mingu, 19 Okt
  { id: "w9-d3-m1", dateISO: "2025-10-19T14:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "DEWA", away: "EVOS", status: "upcoming" },
  { id: "w9-d3-m2", dateISO: "2025-10-19T17:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "AE",  away: "BTR",  status: "upcoming" },
  { id: "w9-d3-m3", dateISO: "2025-10-19T20:15:00+07:00", stage: "Regular Season", bo: "BO3", home: "RRQ",  away: "NAVI",  status: "upcoming" },
  
];
