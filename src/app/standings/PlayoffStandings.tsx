"use client";

import Image from "next/image";
import { useMemo } from "react";
import { MATCHES, type MatchItem } from "../_matches";
import { TEAM_FULLNAME, type Team } from "../_data";

/**
 * Komponen: Tabel peringkat khusus babak Playoffs
 * Desain & logika sama seperti tabel regular season, tapi filter datanya dari babak playoffs saja.
 */
export default function PlayoffStandings() {
  const rows = useMemo(() => {
    const teams: Team[] = ["ONIC","RRQ","EVOS","TLID","GEEK","AE","NAVI","BTR","DEWA"];
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

    // hanya ambil match playoffs
    const playoffMatches = MATCHES.filter(
      (m) => m.stage === "Playoff" && m.status === "finished" && m.score
    );

    playoffMatches.forEach((m: MatchItem) => {
      const home = acc.get(m.home)!;
      const away = acc.get(m.away)!;

      home.matches += 1;
      away.matches += 1;

      home.gamesWon += m.score!.home;
      home.gamesLost += m.score!.away;
      away.gamesWon += m.score!.away;
      away.gamesLost += m.score!.home;

      if (m.score!.home > m.score!.away) {
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
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
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
              <td className={`py-2 text-center ${r.gameDiff >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {r.gameDiff >= 0 ? "+" : ""}
                {r.gameDiff}
              </td>
              <td className="py-2 text-center hidden md:table-cell">{r.matches}</td>
              <td className="py-2 text-center hidden md:table-cell">{r.gamesWon}</td>
              <td className="py-2 text-center hidden md:table-cell">{r.gamesLost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-[11px] text-slate-500 mt-3">
        *Data disusun dari pertandingan babak Playoffs yang telah selesai.
      </div>
    </section>
  );
}
