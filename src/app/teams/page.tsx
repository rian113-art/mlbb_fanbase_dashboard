"use client";

import Link from "next/link";
import Image from "next/image";
import { TEAM_FULLNAME, type Team } from "../_data";

const TEAMS: Team[] = ["ONIC","RRQ","EVOS","TLID","GEEK","AE","NAVI","BTR","DEWA"];

export default function TeamsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Judul dengan warna berbeda tiap kata */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        <span style={{ color: "#000000" }}>Teams</span>{" "}
        <span style={{ color: "#000000ff" }}>MPL</span>{" "}
        <span style={{ color: "#009bd8" }}>ID</span>{" "}
        <span style={{ color: "#009bd8" }}>S16</span>
      </h1>

      {/* Grid tim */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {TEAMS.map((t, i) => {
          const isLastOdd = i === TEAMS.length - 1 && TEAMS.length % 2 === 1; 
          return (
            <div
              key={t}
              className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition text-center 
                ${isLastOdd ? "col-span-2 sm:col-span-3 md:col-span-4 justify-self-center max-w-[200px]" : ""}`}
            >
              <Link href={`/team/${t}`} className="flex flex-col items-center gap-2">
                <Image
                  src={`/logos/${t}.png`}
                  alt={`${TEAM_FULLNAME[t]} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg object-contain"
                />
                <div className="font-semibold">{t}</div>
                <div className="text-xs text-slate-500">{TEAM_FULLNAME[t]}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
