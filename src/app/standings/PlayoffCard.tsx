"use client";

import Image from "next/image";
import { TEAM_FULLNAME, type Team } from "../_data";

/**
 * Komponen sederhana untuk menampilkan bracket Playoffs MPL ID
 * (sementara data statis, nanti bisa dihubungkan ke API MATCHES playoffs)
 */
export default function PlayoffCard() {
  // contoh data statis sementara
  const matches = [
    {
      round: "Upper Bracket Semifinal",
      date: "2025-10-25",
      teams: [
        { code: "ONIC", score: 3 },
        { code: "EVOS", score: 1 },
      ],
    },
    {
      round: "Upper Bracket Semifinal",
      date: "2025-10-25",
      teams: [
        { code: "RRQ", score: 2 },
        { code: "TLID", score: 3 },
      ],
    },
    {
      round: "Lower Bracket Round 1",
      date: "2025-10-26",
      teams: [
        { code: "AE", score: 0 },
        { code: "GEEK", score: 2 },
      ],
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Playoffs Bracket</h2>
        <span className="text-xs text-slate-500">Akan dimulai 25 Okt 2025</span>
      </div>

      <div className="space-y-4">
        {matches.map((m, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition">
            <div className="text-xs text-slate-500 mb-2">{m.round}</div>
            <div className="flex items-center justify-between">
              {m.teams.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Image
                    src={`/logos/${t.code}.png`}
                    alt={TEAM_FULLNAME[t.code as Team]}
                    width={24}
                    height={24}
                    className="rounded-md object-contain"
                  />
                  <span className="font-semibold text-sm">{t.code}</span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    — {TEAM_FULLNAME[t.code as Team]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 gap-4 text-sm font-medium">
              <span>{m.teams[0].score}</span>
              <span className="text-slate-400">vs</span>
              <span>{m.teams[1].score}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-[11px] text-slate-500">
        *Data bersifat placeholder. Akan diperbarui sesuai hasil pertandingan Playoffs MPL ID.
      </div>
    </section>
  );
}
