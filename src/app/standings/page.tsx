// src/app/standings/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MATCHES, type MatchItem } from "../_matches";
import { TEAM_FULLNAME, type Team } from "../_data";
import PerformanceChart from "./PerformanceChart";

/* ========= Helpers: Week ranges (WIB) ========= */
const WEEK_RANGES: { week: number; start: string; end: string }[] = [
  { week: 1, start: "2025-08-22T00:00:00+07:00", end: "2025-08-24T23:59:59+07:00" },
  { week: 2, start: "2025-08-29T00:00:00+07:00", end: "2025-08-31T23:59:59+07:00" },
  { week: 3, start: "2025-09-05T00:00:00+07:00", end: "2025-09-07T23:59:59+07:00" },
  { week: 4, start: "2025-09-12T00:00:00+07:00", end: "2025-09-14T23:59:59+07:00" },
  { week: 5, start: "2025-09-19T00:00:00+07:00", end: "2025-09-21T23:59:59+07:00" },
  { week: 6, start: "2025-09-26T00:00:00+07:00", end: "2025-09-28T23:59:59+07:00" },
  { week: 7, start: "2025-10-03T00:00:00+07:00", end: "2025-10-05T23:59:59+07:00" },
  { week: 8, start: "2025-10-10T00:00:00+07:00", end: "2025-10-12T23:59:59+07:00" },
  { week: 9, start: "2025-10-17T00:00:00+07:00", end: "2025-10-19T23:59:59+07:00" },
];

function isInWeek(dateISO: string, week: number | "ALL") {
  if (week === "ALL") return true;
  const w = WEEK_RANGES.find((x) => x.week === week);
  if (!w) return true;
  const t = new Date(dateISO).getTime();
  return t >= new Date(w.start).getTime() && t <= new Date(w.end).getTime();
}

/* ========= Types ========= */
type Row = {
  team: Team;
  name: string;
  matches: number;
  wins: number;
  losses: number;
  gamesWon: number;
  gamesLost: number;
  gameDiff: number;
};

/* ========= Small UI ========= */
function TeamCell({ code }: { code: Team }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Image
        src={`/logos/${code}.png`}
        alt={`${TEAM_FULLNAME[code]} logo`}
        width={20}
        height={20}
        className="rounded-[4px] object-contain"
      />
      <span className="font-semibold">{code}</span>
      <span className="hidden md:inline text-slate-500 truncate text-xs">
        — {TEAM_FULLNAME[code]}
      </span>
    </div>
  );
}

/* ========= Page ========= */
export default function StandingsPage() {
  const [weekFilter, setWeekFilter] = useState<number | "ALL">("ALL");

  const rows = useMemo<Row[]>(() => {
    const teams: Team[] = ["ONIC","RRQ","EVOS","TLID","GEEK","AE","NAVI","BTR","DEWA"];
    const acc = new Map<Team, Row>();
    teams.forEach((t) =>
      acc.set(t, {
        team: t,
        name: TEAM_FULLNAME[t],
        matches: 0,
        wins: 0,
        losses: 0,
        gamesWon: 0,
        gamesLost: 0,
        gameDiff: 0,
      })
    );

    MATCHES.forEach((m: MatchItem) => {
      if (m.status !== "finished") return;
      if (!isInWeek(m.dateISO, weekFilter)) return;
      if (!m.score) return;

      const home = acc.get(m.home)!;
      const away = acc.get(m.away)!;

      home.matches += 1;
      away.matches += 1;

      home.gamesWon += m.score.home;
      home.gamesLost += m.score.away;
      away.gamesWon += m.score.away;
      away.gamesLost += m.score.home;

      if (m.score.home > m.score.away) {
        home.wins += 1;
        away.losses += 1;
      } else {
        away.wins += 1;
        home.losses += 1;
      }
    });

    acc.forEach((r) => (r.gameDiff = r.gamesWon - r.gamesLost));

    return Array.from(acc.values()).sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.gameDiff !== a.gameDiff) return b.gameDiff - a.gameDiff;
      if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;
      return a.name.localeCompare(b.name);
    });
  }, [weekFilter]);

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Peringkat Match</h1>
          <p className="text-sm text-slate-500">
            Disusun dari pertandingan <b>Finished</b>. Urutan: Match Wins | Game Diff | Games Won.
          </p>
        </div>

        {/* Filter week */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Week:</span>
          <div className="flex items-center gap-1 overflow-auto">
            <button
              onClick={() => setWeekFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                weekFilter === "ALL"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-900 border-slate-200 hover:border-slate-300"
              }`}
              title="Semua minggu"
            >
              All
            </button>
            {WEEK_RANGES.map((w) => (
              <button
                key={w.week}
                onClick={() => setWeekFilter(w.week)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                  weekFilter === w.week
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-200 hover:border-slate-300"
                }`}
                title={`Week ${w.week}`}
              >
                W{w.week}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Satu kartu berisi tabel (kompak di mobile, lengkap di desktop) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 w-10">#</th>
              <th className="py-2">Tim</th>
              {/* kolom minimal yang selalu tampil */}
              <th className="py-2 text-center">W</th>
              <th className="py-2 text-center">L</th>
              <th className="py-2 text-center">+/-</th>
              {/* kolom tambahan, tampil mulai md+ */}
              <th className="py-2 text-center hidden md:table-cell">M</th>
              <th className="py-2 text-center hidden md:table-cell">GW</th>
              <th className="py-2 text-center hidden md:table-cell">GL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.team} className="border-b border-slate-100">
                <td className="py-2 text-slate-500">{i + 1}</td>
                <td className="py-2">
                  <TeamCell code={r.team} />
                </td>
                <td className="py-2 text-center font-semibold">{r.wins}</td>
                <td className="py-2 text-center">{r.losses}</td>
                <td className={`py-2 text-center ${r.gameDiff >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {r.gameDiff >= 0 ? "+" : ""}
                  {r.gameDiff}
                </td>
                {/* kolom tambahan (desktop) */}
                <td className="py-2 text-center hidden md:table-cell">{r.matches}</td>
                <td className="py-2 text-center hidden md:table-cell">{r.gamesWon}</td>
                <td className="py-2 text-center hidden md:table-cell">{r.gamesLost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-[11px] text-slate-500 mt-3">
          *Di layar kecil hanya kolom penting yang ditampilkan (W/L/+/-). Putar HP ke lanskap untuk kolom lengkap.
        </div>
      </div>

      {/* ==== Kartu baru: Grafik Performa ==== */}
      <PerformanceChart
  colors={{
    ONIC: "#ffd100",
    RRQ: "#111827",
    EVOS: "#1d4ed8",
    TLID: "#3b82f6",
    GEEK: "#ef4444",
    AE:   "#8b5cf6",
    NAVI: "#f59e0b",
    BTR:  "#fb7185",
    DEWA: "#22c55e",
  }}
/>
    </main>
  );
}
