"use client";

import Image from "next/image";
import { PLAYOFF_MATCHES, type PlayoffMatch } from "../schedule/_playoffMatches";

export default function PlayoffBracket() {
  // Ambil semua round unik dari data
  const rounds = Array.from(new Set(PLAYOFF_MATCHES.map((m) => m.round)));

  return (
    <section className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Playoffs Bracket MPL ID Season 16 (data ini masih simulasiatai tidak benar)</h2>

      <div className="overflow-x-auto">
        <div className="flex gap-8 min-w-[900px]">
          {rounds.map((round) => {
            const matches = PLAYOFF_MATCHES.filter((m) => m.round === round);

            return (
              <div key={round} className="flex flex-col gap-6 min-w-[220px]">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">{round}</h3>
                {matches.map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-4">
        Geser ke kanan untuk melihat seluruh bracket (atau miringkan layar di HP).
      </p>
    </section>
  );
}

function MatchCard({ match }: { match: PlayoffMatch & { datetime?: string; format?: string } }) {
  const winner =
    match.score.home > match.score.away
      ? match.home
      : match.score.away > match.score.home
      ? match.away
      : "";

  return (
    <div className="relative border border-slate-200 rounded-xl bg-slate-50 p-3 shadow-sm w-[220px]">
      {/* Garis koneksi ke round berikutnya */}
      <div className="absolute top-1/2 right-[-40px] w-8 h-[2px] bg-slate-300"></div>

      {/* Tampilkan info jadwal */}
      {match.datetime && match.format && (
        <div className="text-[11px] text-slate-500 mb-1 text-center">
          {match.datetime} · {match.format}
        </div>
      )}

      <TeamRow team={match.home} isWinner={winner === match.home} score={match.score.home} />
      <TeamRow team={match.away} isWinner={winner === match.away} score={match.score.away} />
    </div>
  );
}

function TeamRow({
  team,
  isWinner,
  score,
}: {
  team: string;
  isWinner: boolean;
  score: number;
}) {
  const teamLogo = `/logos/${team}.png`;

  return (
    <div
      className={`flex items-center justify-between gap-2 p-1 px-2 rounded-md mb-1 ${
        isWinner ? "bg-yellow-100 border border-yellow-400" : "bg-white border border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={teamLogo}
          alt={team}
          width={24}
          height={24}
          className="rounded-sm object-contain"
        />
        <span className="font-semibold">{team}</span>
      </div>
      <span className="font-bold">{score}</span>
    </div>
  );
}
