"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import type { Team } from "../../_data";
import { TEAM_BASELINE, TEAM_COLOR } from "../../_data";

type Point = { t: number; y: number };
const fmt = new Intl.NumberFormat("id-ID");

// ------- helper mock -------
function makeSeries(base: number): Point[] {
  const now = Date.now();
  const arr: Point[] = [];
  for (let i = 23; i >= 0; i--) {
    const ts = now - i * 5000;
    const jitter = Math.round(base + (Math.random() * 2 - 1) * base * 0.08);
    arr.push({ t: ts, y: Math.max(0, jitter) });
  }
  return arr;
}

function TinyTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const v = Number(payload[0].value || 0);
  return (
    <div className="rounded-xl bg-black/80 text-white text-xs px-2 py-1 shadow-md">
      {fmt.format(v)}
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  positive,
}: {
  label: string;
  value: string;
  hint?: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-lg font-semibold leading-none" suppressHydrationWarning>
        {value}
      </div>
      {hint && (
        <div
          className={`text-[11px] ${
            positive ? "text-emerald-600" : "text-rose-600"
          }`}
          suppressHydrationWarning
        >
          {hint}
        </div>
      )}
    </div>
  );
}

export default function TeamChart({ team }: { team: Team }) {
  // ⬇️ Penting: kosong saat SSR lalu isi setelah mount
  const [mounted, setMounted] = useState(false);
  const [series, setSeries] = useState<Point[]>([]);
  useEffect(() => setMounted(true), []);

  // isi data saat tim berubah (setelah mounted)
  useEffect(() => {
    if (!mounted) return;
    setSeries(makeSeries(TEAM_BASELINE[team]));
  }, [team, mounted]);

  // simulasi update tiap 5s (setelah mounted)
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev.at(-1)?.y ?? TEAM_BASELINE[team];
        const y = Math.max(
          0,
          Math.round(last + (Math.random() * 2 - 1) * last * 0.04)
        );
        return [...prev.slice(-23), { t: Date.now(), y }];
      });
    }, 5000);
    return () => clearInterval(id);
  }, [team, mounted]);

  const safe = mounted ? series : [];

  // derived
  const last = safe.at(-1)?.y ?? 0;
  const peak = safe.length ? Math.max(...safe.map((p) => p.y)) : 0;
  const avg =
    safe.length > 0
      ? Math.round(safe.reduce((s, p) => s + p.y, 0) / safe.length)
      : 0;
  const prev = safe.length > 1 ? safe.at(-2)!.y : last;
  const diff = last - prev;
  const diffPct = prev ? (diff / prev) * 100 : 0;

  const data = useMemo(
    () =>
      safe.map((p) => ({
        x: new Date(p.t).toLocaleTimeString(),
        y: p.y,
      })),
    [safe]
  );

  const palette = TEAM_COLOR[team];

  return (
    <div className="space-y-4">
      {/* METRICS — center & rapi */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto sm:max-w-none sm:grid-cols-4">
        <Metric label="AVG VIEWERS" value={mounted ? fmt.format(avg) : "—"} />
        <Metric label="PEAK VIEWERS" value={mounted ? fmt.format(peak) : "—"} />
        <Metric label="TERAKHIR" value={mounted ? fmt.format(last) : "—"} />
        <Metric
          label="PERUBAHAN"
          value={
            mounted ? `${diff >= 0 ? "+" : "-"}${fmt.format(Math.abs(diff))}` : "—"
          }
          hint={mounted ? `${diffPct >= 0 ? "+" : ""}${diffPct.toFixed(2)}%` : undefined}
          positive={mounted ? diff >= 0 : undefined}
        />
      </div>

      {/* CHART — geser sedikit ke kiri hanya di mobile */}
      <div className="h-64 sm:h-72 md:h-80 ml-[-10px] sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="fillTeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette} stopOpacity={0.28} />
                <stop offset="100%" stopColor={palette} stopOpacity={0.06} />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" tick={{ fontSize: 11 }} />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<TinyTooltip />} cursor={{ stroke: "rgba(0,0,0,0.08)" }} />
            <Area
              type="monotone"
              dataKey="y"
              stroke={palette}
              strokeWidth={2}
              fill="url(#fillTeam)"
              isAnimationActive={false}
              style={{ filter: "url(#softShadow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-slate-500">
        *Data mock akan diganti data nyata saat API aktif.
      </div>
    </div>
  );
}
