"use client";

import { useMemo } from "react";
import Image from "next/image";
import { PLAYOFF_MATCHES, type PlayoffMatch } from "../schedule/_playoffMatches";
import { TEAM_FULLNAME, type Team } from "../_data";

export default function PlayoffStandings() {
  const rows = useMemo(() => {
    // Ambil match playoffs
    const playoffMatches = PLAYOFF_MATCHES;

    // Ambil semua tim yang bermain di playoff
    const teams = Array.from(
      new Set(playoffMatches.flatMap((m) => [m.home, m.away]))
    ).filter(isTeam);

    const acc = new Map<Team, any>();
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

    // Hitung stats hanya untuk match finished
    playoffMatches.forEach((m) => {
      if (!isTeam(m.home) || !isTeam(m.away)) return;
      if (m.status !== "finished" || !m.score) return;

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

    // Sorting
    return Array.from(acc.values()).sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.gameDiff !== a.gameDiff) return b.gameDiff - a.gameDiff;
      if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;
      return a.name.localeCompare(b.name);
    });
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Peringkat Playoffs</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="py-2 w-10">#</th>
            <th className="py-2">Tim</th>
            <th className="py-2 text-center">W</th>
            <th className="py-2 text-center">L</th>
            <th className="py-2 text-center">+/-</th>
            <th className="py-2 text-center hidden md:table-cell">M</th>
            <th className="py-2 text-center hidden md:table-cell">GW</th>
            <th className="py-2 text-center hidden md:table-cell">GL</th>
            <th className="py-2 text-center hidden md:table-cell">Jadwal</th>
            <th className="py-2 text-center hidden md:table-cell">Format</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            // Ambil semua match untuk tim ini
            const teamMatches = PLAYOFF_MATCHES.filter(
              (m) => m.home === r.team || m.away === r.team
            );

            // Ambil info jadwal & format dari match terakhir
            const lastMatch = teamMatches[teamMatches.length - 1];

            return (
              <tr key={r.team} className="border-b border-slate-100">
                <td className="py-2 text-slate-500">{i + 1}</td>
                <td className="py-2 flex items-center gap-2">
                  <Image
                    src={`/logos/${r.team}.png`}
                    alt={r.name}
                    width={20}
                    height={20}
                    className="rounded-[4px] object-contain"
                  />
                  <span className="font-semibold">{r.team}</span>
                  <span className="hidden md:inline text-slate-500 truncate text-xs">
                    — {r.name}
                  </span>
                </td>
                <td className="py-2 text-center font-semibold">{r.wins}</td>
                <td className="py-2 text-center">{r.losses}</td>
                <td
                  className={`py-2 text-center ${
                    r.gameDiff >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {r.gameDiff >= 0 ? "+" : ""}
                  {r.gameDiff}
                </td>
                <td className="py-2 text-center hidden md:table-cell">{r.matches}</td>
                <td className="py-2 text-center hidden md:table-cell">{r.gamesWon}</td>
                <td className="py-2 text-center hidden md:table-cell">{r.gamesLost}</td>
                <td className="py-2 text-center hidden md:table-cell">{lastMatch?.datetime ?? "-"}</td>
                <td className="py-2 text-center hidden md:table-cell">{lastMatch?.format ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="text-[11px] text-slate-500 mt-3">
        *Data disusun dari pertandingan babak Playoffs yang telah selesai.
      </div>
    </section>
  );
}

// Helper type guard
function isTeam(t: string): t is Team {
  return ["ONIC","RRQ","EVOS","AE","DEWA","BTR"].includes(t);
}
