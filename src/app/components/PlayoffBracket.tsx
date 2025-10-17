"use client";

import Image from "next/image";
import { PLAYOFF_MATCHES } from "../schedule/_playoffMatches";

export default function PlayoffBracket() {
  if (!PLAYOFF_MATCHES || PLAYOFF_MATCHES.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        ⚠️ Data playoff belum tersedia.
      </div>
    );
  }

  const renderMatch = (match: any) => {
    if (!match) return null;

    return (
      <div className="relative flex flex-col items-center text-center z-10">
        <div className="text-[10px] text-gray-400 font-semibold mb-1">
          {match.code} {match.datetime}
        </div>

        <div className="flex flex-col w-44 border rounded-lg bg-white shadow-md text-sm">
          {/* Home */}
          <div className="flex items-center justify-between border-b px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 relative">
                <Image
                  src={`/logos/${match.home?.split(" ")[0] || "unknown"}.png`}
                  alt={match.home || "unknown"}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">{match.home}</span>
            </div>
            <span>{match.score?.home ?? 0}</span>
          </div>

          {/* Away */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 relative">
                <Image
                  src={`/logos/${match.away?.split(" ")[0] || "unknown"}.png`}
                  alt={match.away || "unknown"}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">{match.away}</span>
            </div>
            <span>{match.score?.away ?? 0}</span>
          </div>
        </div>

        <div className="text-[10px] text-gray-400 mt-1">{match.format}</div>
      </div>
    );
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-sm text-center relative overflow-hidden">
      <h2 className="text-xl font-bold mb-6">PLAYOFFS BRACKET</h2>

      {/* === Garis Penghubung === */}
      <div className="absolute inset-0 z-0">
        {/* M1 -> M3 (✅ Presisi dari kamu) */}
        <div className="absolute left-[36.5%] top-[21.5%] w-[5%] h-[2px] bg-gray-300" />

        {/* M2 -> M4 (✅ Presisi dari kamu) */}
        <div className="absolute left-[36.5%] top-[42%] w-[5%] h-[2px] bg-gray-300" />

        {/* M3 -> M6 */}
        <div className="absolute left-[57%] top-[31.6%] w-[6%] h-[2px] bg-gray-300" />
        <div className="absolute left-[57%] top-[27.2%] w-[2px] h-[9%] bg-gray-300" />

        {/* M4 -> M6 */}
        <div className="absolute left-[81%] top-[31.6%] w-[4%] h-[2px] bg-gray-300" />
         <div className="absolute left-[85%] top-[48.9%] w-[2%] h-[2px] bg-gray-300" />
         <div className="absolute left-[59%] top-[91.7%] w-[28%] h-[2px] bg-gray-300" />
        <div className="absolute left-[85%] top-[31.6%] w-[2px] h-[35.2%] bg-gray-300" />
        <div className="absolute left-[87%] top-[48.9%] w-[2px] h-[43%] bg-gray-300" />
        <div className="absolute left-[71.5%] top-[66.8%] w-[13.7%] h-[2px] bg-gray-300" />

        {/* M5 -> M7 */}
        <div className="absolute left-[46.5%] top-[66.9%] w-[7%] h-[2px] bg-gray-300" />

        {/* M6 -> M7 */}
        

        {/* M6 -> M8 */}
        
        {/* M7 -> M8 */}
        
        
      </div>

      <div className="flex flex-col items-center gap-10 z-10 relative">
        {/* === UPPER BRACKET === */}
        <h3 className="text-sm font-bold text-gray-500">UPPER BRACKET</h3>
        <div className="flex justify-center gap-16 relative">
          <div className="flex flex-col gap-20">
            {renderMatch(PLAYOFF_MATCHES[0])}
            {renderMatch(PLAYOFF_MATCHES[1])}
          </div>
          <div className="flex flex-col gap-20">
            {renderMatch(PLAYOFF_MATCHES[2])}
            {renderMatch(PLAYOFF_MATCHES[3])}
          </div>
          <div className="flex flex-col justify-center">
            {renderMatch(PLAYOFF_MATCHES[5])}
          </div>
        </div>

        {/* === LOWER BRACKET === */}
        <h3 className="text-sm font-bold text-gray-500 mt-4">LOWER BRACKET</h3>
        <div className="flex justify-center gap-24 relative">
          <div>{renderMatch(PLAYOFF_MATCHES[4])}</div>
          <div>{renderMatch(PLAYOFF_MATCHES[6])}</div>
        </div>

        {/* === GRAND FINAL === */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-red-600 mb-2">GRAND FINAL</h3>
          {renderMatch(PLAYOFF_MATCHES[7])}
        </div>

        <div className="text-[11px] text-gray-400 mt-8 block md:hidden italic">
          *Miringkan HP untuk melihat struktur penuh
        </div>
      </div>
    </section>
  );
}
