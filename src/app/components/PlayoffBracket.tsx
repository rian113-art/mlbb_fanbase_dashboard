"use client";

import Image from "next/image";
import { PLAYOFF_MATCHES, type PlayoffMatch } from "../schedule/_playoffMatches";

export default function PlayoffBracket() {
  const upperMatches = PLAYOFF_MATCHES.filter((m) => m.bracket === "Upper");
  const lowerMatches = PLAYOFF_MATCHES.filter((m) => m.bracket === "Lower");
  const finals = PLAYOFF_MATCHES.filter((m) => m.stage === "Grand Final");

  const renderMatch = (match: PlayoffMatch) => {
    const homeScore = match.score?.home ?? "-";
    const awayScore = match.score?.away ?? "-";

    return (
      <div key={match.id} className="relative flex flex-col gap-1 p-2 border rounded-lg bg-slate-50 shadow-sm w-36">
        <div className="flex justify-between">
          <span className="font-semibold truncate">{match.home}</span>
          <span>{homeScore}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold truncate">{match.away}</span>
          <span>{awayScore}</span>
        </div>
        {match.datetime && <div className="text-[10px] text-slate-400">{match.datetime}</div>}
        {match.format && <div className="text-[10px] text-slate-400">{match.format}</div>}
      </div>
    );
  };

  const renderBracketColumn = (matches: PlayoffMatch[], label: string) => (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-sm font-semibold mb-2">{label}</h3>
      {matches.map(renderMatch)}
    </div>
  );

  return (
    <section className="p-5 bg-white shadow-sm rounded-2xl overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Playoffs Bracket</h2>

      <div className="flex items-start gap-12">
        {/* Upper Bracket */}
        {renderBracketColumn(
          upperMatches.filter((m) => m.round === "Quarterfinals"),
          "UB Quarterfinals"
        )}
        {renderBracketColumn(
          upperMatches.filter((m) => m.round === "Semifinals"),
          "UB Semifinals"
        )}

        {/* Lower Bracket */}
        {renderBracketColumn(
          lowerMatches.filter((m) => m.round.includes("Round")),
          "LB Round 1"
        )}
        {renderBracketColumn(
          lowerMatches.filter((m) => m.round.includes("Semifinals")),
          "LB Semifinals"
        )}

        {/* Grand Final */}
        {renderBracketColumn(finals, "Grand Final")}
      </div>
    </section>
  );
}
