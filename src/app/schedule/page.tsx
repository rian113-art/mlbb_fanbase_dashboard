"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MATCHES, type MatchItem } from "../_matches";
import { TEAM_FULLNAME, type Team } from "../_data";

/* =========================
   Konstanta & formatter
========================= */
const ALL = "ALL";
const TEAM_CODES: Team[] = [
  "ONIC", "RRQ", "EVOS", "TLID", "GEEK", "AE", "NAVI", "BTR", "DEWA",
];

const dtf = new Intl.DateTimeFormat("id-ID", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

/* =========================
   Utility: Week grouping
   - Week dihitung dari awal musim (min tanggal di MATCHES), minggu dimulai Senin.
========================= */
function startOfWeek(d: Date) {
  const nd = new Date(d);
  const day = (nd.getDay() + 6) % 7; // Senin=0 ... Minggu=6
  nd.setHours(0, 0, 0, 0);
  nd.setDate(nd.getDate() - day);
  return nd;
}

const SEASON_START = (() => {
  const minTs = Math.min(...MATCHES.map((m) => +new Date(m.dateISO)));
  return startOfWeek(new Date(minTs));
})();

function weekIndex(dateISO: string) {
  const d = new Date(dateISO);
  const start = SEASON_START.getTime();
  const diffDays = Math.floor((+d - start) / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1; // Week 1, 2, ...
}

function labelWeek(n: number) {
  return `Week ${n}`;
}

/* =========================
   UI kecil
========================= */
function TeamSide({
  code,
  align = "left",
  highlight = false,
}: {
  code: Team;
  align?: "left" | "right";
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "right" ? "justify-end text-right" : ""
      }`}
    >
      {align === "left" && (
        <Image
          src={`/logos/${code}.png`}
          alt={`${TEAM_FULLNAME[code]} logo`}
          width={28}
          height={28}
          className="rounded-[6px] object-contain"
        />
      )}

      <div className="min-w-0">
        <div
          className={`text-sm font-semibold leading-none ${
            highlight ? "text-slate-900" : "text-slate-800"
          }`}
        >
          {code}
        </div>
        <div className="text-[11px] text-slate-500 truncate">
          {TEAM_FULLNAME[code]}
        </div>
      </div>

      {align === "right" && (
        <Image
          src={`/logos/${code}.png`}
          alt={`${TEAM_FULLNAME[code]} logo`}
          width={28}
          height={28}
          className="rounded-[6px] object-contain"
        />
      )}
    </div>
  );
}

function CenterBadge({
  finished,
  score,
}: {
  finished: boolean;
  score?: { home: number; away: number };
}) {
  if (finished && score) {
    return (
      <div className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
        {score.home} : {score.away}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white w-10 h-10 text-xs font-semibold text-slate-600 shadow-sm">
      VS
    </div>
  );
}

function MetaRow({ m }: { m: MatchItem }) {
  const when = dtf.format(new Date(m.dateISO));
  return (
    <div className="flex items-center justify-between text-[12px] text-slate-500">
      <div className="inline-flex items-center gap-2">
        <span className="font-medium">{m.stage}</span>
        <span>•</span>
        <span>{m.bo}</span>
      </div>
      <div>{when}</div>
    </div>
  );
}

function MatchCard({ m }: { m: MatchItem }) {
  const finished = m.status === "finished";
  const homeWin = finished && m.score ? m.score.home > m.score.away : false;
  const awayWin = finished && m.score ? m.score.away > m.score.home : false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition">
      {/* meta */}
      <MetaRow m={m} />

      {/* vs line */}
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamSide code={m.home} align="left" highlight={homeWin} />
        <CenterBadge finished={finished} score={m.score} />
        <TeamSide code={m.away} align="right" highlight={awayWin} />
      </div>
    </div>
  );
}

/* =========================
   Halaman Schedule
========================= */
export default function SchedulePage() {
  // Daftar week yang ada
  const ALL_WEEKS = useMemo(() => {
    const set = new Set<number>();
    for (const m of MATCHES) set.add(weekIndex(m.dateISO));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  const [teamFilter, setTeamFilter] = useState<typeof ALL | Team>(ALL);
  const [weekFilter, setWeekFilter] = useState<number | typeof ALL>("ALL");

  // Auto pilih week terdekat yang masih upcoming
  useEffect(() => {
    const now = Date.now();
    const upcoming = MATCHES
      .filter((m) => m.status === "upcoming")
      .sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO));

    const firstUpcoming = upcoming.find((m) => +new Date(m.dateISO) >= now);
    if (firstUpcoming) {
      setWeekFilter(weekIndex(firstUpcoming.dateISO));
    } else if (ALL_WEEKS.length > 0) {
      setWeekFilter(ALL_WEEKS[ALL_WEEKS.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const byTeam = (mm: MatchItem) =>
      teamFilter === ALL || mm.home === teamFilter || mm.away === teamFilter;

    const byWeek =
      weekFilter === "ALL"
        ? () => true
        : (mm: MatchItem) => weekIndex(mm.dateISO) === weekFilter;

    const upcoming = MATCHES
      .filter((m) => m.status === "upcoming")
      .filter(byTeam)
      .filter(byWeek)
      .sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO));

    const finished = MATCHES
      .filter((m) => m.status === "finished")
      .filter(byTeam)
      .filter(byWeek)
      .sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO));

    return { upcoming, finished };
  }, [teamFilter, weekFilter]);

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Schedule & Results</h1>
          <p className="text-sm text-slate-500">
            Filter otomatis melompat ke week terdekat yang masih punya pertandingan.
          </p>
        </div>

        {/* FILTER BAR — mobile: stacked full-width, desktop: inline */}
        <div className="w-full md:w-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 md:p-2 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:items-center md:gap-2 gap-3">
              {/* TIM */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
                <label htmlFor="teamFilter" className="text-xs text-slate-600 md:sr-only">
                  Tim
                </label>
                <select
                  id="teamFilter"
                  value={teamFilter}
                  onChange={(e) => setTeamFilter((e.target.value as Team) || ALL)}
                  className="w-full md:w-48 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                >
                  <option value={ALL}>Semua tim</option>
                  {TEAM_CODES.map((t) => (
                    <option key={t} value={t}>
                      {t} — {TEAM_FULLNAME[t]}
                    </option>
                  ))}
                </select>
              </div>

              {/* WEEK */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
                <label htmlFor="weekFilter" className="text-xs text-slate-600 md:sr-only">
                  Week
                </label>
                <select
                  id="weekFilter"
                  value={weekFilter}
                  onChange={(e) => {
                    const v = e.target.value;
                    setWeekFilter(v === "ALL" ? "ALL" : Number(v));
                  }}
                  className="w-full md:w-40 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                >
                  <option value="ALL">Semua week</option>
                  {ALL_WEEKS.map((w) => (
                    <option key={w} value={w}>
                      {labelWeek(w)}
                    </option>
                  ))}
                </select>
              </div>

              {/* RESET */}
              {(teamFilter !== ALL || weekFilter !== "ALL") && (
                <button
                  onClick={() => {
                    setTeamFilter(ALL);
                    setWeekFilter("ALL");
                  }}
                  className="w-full md:w-auto px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50"
                  title="Reset semua filter"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Upcoming{weekFilter !== "ALL" ? ` — ${labelWeek(weekFilter as number)}` : ""}
        </h2>
        {filtered.upcoming.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Tidak ada pertandingan yang akan datang untuk filter ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.upcoming.map((m) => (
              <MatchCard key={m.id} m={m} />
            ))}
          </div>
        )}
      </section>

      {/* Finished */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Finished{weekFilter !== "ALL" ? ` — ${labelWeek(weekFilter as number)}` : ""}
        </h2>
        {filtered.finished.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Belum ada hasil pertandingan untuk filter ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.finished.map((m) => (
              <MatchCard key={m.id} m={m} />
            ))}
          </div>
        )}
      </section>

      {/* Catatan */}
      <div className="text-[11px] text-slate-500">
        Jadwal & hasil di atas adalah mock/placeholder untuk keperluan UI. Nantinya bisa
        dihubungkan ke sumber data resmi.
      </div>
    </main>
  );
}
