"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ✅ Pastikan path dan huruf besar-kecil sesuai nama file kamu
import { PLAYOFF_MATCHES, type PlayoffMatch } from "../schedule/_playoffMatches";
import { type Team } from "../_data";

const TEAMS: Team[] = ["ONIC", "RRQ", "EVOS", "TLID", "GEEK", "AE", "NAVI", "BTR", "DEWA"];

const COLORS: Record<Team, string> = {
  ONIC: "#FFD700",
  RRQ: "#888888",
  EVOS: "#00BFFF",
  TLID: "#1E90FF",
  GEEK: "#FF4D4D",
  AE: "#9B59B6",
  NAVI: "#F1C40F",
  BTR: "#FF6B81",
  DEWA: "#2ECC71",
};

export default function PlayoffPerformanceChart() {
  const { data, yMax } = useMemo(() => {
    const finished = PLAYOFF_MATCHES.filter(
      (m: PlayoffMatch) =>
        m.stage === "Playoff" && m.status === "finished" && !!m.score
    );

    const rounds = [...new Set(finished.map((m: PlayoffMatch) => m.round ?? "R1"))];

    const rows: any[] = [];
    rounds.forEach((r, i) => {
      const row: any = { round: `R${i + 1}` };
      TEAMS.forEach((t) => {
        const prev = i > 0 ? (rows[i - 1]?.[t] as number) ?? 0 : 0;
        const won = finished.filter(
          (m: PlayoffMatch) =>
            (m.home === t && m.score.home > m.score.away && m.round === r) ||
            (m.away === t && m.score.away > m.score.home && m.round === r)
        ).length;
        row[t] = prev + won;
      });
      rows.push(row);
    });

    const lastRow = rows[rows.length - 1] ?? {};
    const top = Math.max(...TEAMS.map((t) => Number(lastRow[t] ?? 0)), 1);

    return { data: rows, yMax: top + 1 };
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Grafik Performa Tim - Playoffs</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="round" />
            <YAxis domain={[0, yMax]} allowDecimals={false} />
            <Tooltip />
            {TEAMS.map((t) => (
              <Line
                key={t}
                type="monotone"
                dataKey={t}
                stroke={COLORS[t]}
                strokeWidth={2}
                isAnimationActive={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-[11px] text-slate-500">
        Garis menunjukkan progres kemenangan tiap tim sepanjang babak Playoffs.
      </div>
    </section>
  );
}
