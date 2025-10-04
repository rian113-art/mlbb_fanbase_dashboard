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
  Legend,
} from "recharts";
import { MATCHES, type MatchItem } from "../_matches";
import { type Team } from "../_data";

const TEAMS: Team[] = [
  "ONIC",
  "RRQ",
  "EVOS",
  "TLID",
  "GEEK",
  "AE",
  "NAVI",
  "BTR",
  "DEWA",
];

const DEFAULT_COLORS: Record<Team, string> = {
  ONIC: "#facc15",
  RRQ: "#6b7280",
  EVOS: "#1d4ed8",
  TLID: "#2563eb",
  GEEK: "#ef4444",
  AE: "#7c3aed",
  NAVI: "#f59e0b",
  BTR: "#fb7185",
  DEWA: "#22c55e",
};

// Ambil nomor minggu dari ID match
function weekFromId(id: string): number | null {
  const m = id.match(/w(\d+)-/i);
  return m ? Number(m[1]) : null;
}

// Tooltip kecil di chart
function TinyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-black/80 text-white text-xs px-2 py-1 shadow-md">
      <div className="font-semibold">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          {p.dataKey}: {p.value}
        </div>
      ))}
    </div>
  );
}

/** Dot renderer: titik kecil di grafik, logo di titik terakhir */
const makeDot = (team: Team, color: string, lastIndex: number) => (props: any) => {
  const { cx, cy, index } = props as { cx?: number; cy?: number; index?: number };
  const key = `dot-${team}-${index ?? "x"}`;
  if (cx == null || cy == null || index == null) return <g key={key} />;
  if (index === lastIndex) {
    return (
      <image
        key={key}
        href={`/logos/${team}.png`}
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        preserveAspectRatio="xMidYMid slice"
        style={{ pointerEvents: "none" }}
      />
    );
  }
  return <circle key={key} cx={cx} cy={cy} r={2} fill={color} />;
};

export default function PerformanceChart({
  colors,
}: {
  /** Warna garis per tim (opsional, bisa diubah dari props) */
  colors?: Partial<Record<Team, string>>;
}) {
  const palette: Record<Team, string> = { ...DEFAULT_COLORS, ...(colors ?? {}) };

  const { rows, yMax } = useMemo(() => {
    // Ambil match yang sudah selesai
    const finished = MATCHES.filter(
      (m): m is MatchItem & { score: NonNullable<MatchItem["score"]> } =>
        m.status === "finished" && !!m.score && weekFromId(m.id) !== null
    );

    const lastWeek = finished.length
      ? Math.max(...finished.map((m) => weekFromId(m.id)!))
      : 1;

    // Hitung kemenangan per minggu
    const winsPerWeek: Record<number, Record<Team, number>> = {};
    for (let w = 1; w <= lastWeek; w++) {
      winsPerWeek[w] = Object.fromEntries(TEAMS.map((t) => [t, 0])) as Record<Team, number>;
    }

    finished.forEach((m) => {
      const w = weekFromId(m.id)!;
      const winner: Team = m.score.home > m.score.away ? m.home : m.away;
      winsPerWeek[w][winner] += 1;
    });

    // Susun data kumulatif
    const rowsLocal: Array<Record<string, number | string>> = [];
    for (let w = 1; w <= lastWeek; w++) {
      const row: any = { week: `W${w}` };
      TEAMS.forEach((t) => {
        const prev = w > 1 ? (rowsLocal[w - 2]?.[t] as number) ?? 0 : 0;
        row[t] = prev + winsPerWeek[w][t];
      });
      rowsLocal.push(row);
    }

    const lastRow = rowsLocal[rowsLocal.length - 1] ?? {};
    const currentTop = Math.max(...TEAMS.map((t) => Number(lastRow[t] ?? 0)), 0);
    const yMax = Math.max(currentTop + 1, 1);

    return { rows: rowsLocal, yMax };
  }, []);

  const lastIndex = Math.max(rows.length - 1, 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Grafik Performa Tim</h2>
        <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {TEAMS.map((t) => (
            <span key={t} className="inline-flex items-center gap-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: palette[t] }}
              />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 10, right: 20, left: -35, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" type="category" allowDuplicatedCategory={false} />
            <YAxis domain={[0, yMax]} allowDecimals={false} />
            <Tooltip content={<TinyTooltip />} />
            <Legend verticalAlign="top" height={0} wrapperStyle={{ display: "none" }} />
            {TEAMS.map((t) => (
              <Line
                key={t}
                type="monotone"
                dataKey={t}
                stroke={palette[t]}
                strokeWidth={2}
                dot={makeDot(t, palette[t], lastIndex)}
                activeDot={false as any}
                isAnimationActive={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-[11px] text-slate-500">
        Garis memperlihatkan akumulasi kemenangan per minggu (Regular Season).
      </div>
    </section>
  );
}
