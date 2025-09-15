"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

/** ======================
 *  Data mock & tipe
 *  ====================== */
type Team =
  | "ONIC" | "RRQ" | "EVOS" | "TLID" | "GEEK" | "AE" | "NAVI" | "BTR" | "DEWA";

const TEAMS: Team[] = ["ONIC", "RRQ", "EVOS", "TLID", "GEEK", "AE", "NAVI", "BTR", "DEWA"];

const TEAM_FULLNAME: Record<Team, string> = {
  ONIC: "ONIC Esports",
  RRQ: "RRQ Hoshi",
  EVOS: "EVOS Glory",
  TLID: "Team Liquid ID",
  GEEK: "Geek Fam ID",
  AE: "Alter Ego",
  NAVI: "NAVI",
  BTR: "Bigetron by Vitality",
  DEWA: "Dewa United Esports",
};

const TEAM_BASELINE: Record<Team, number> = {
  ONIC: 210_000, RRQ: 180_000, EVOS: 150_000, TLID: 130_000, GEEK: 120_000,
  AE: 110_000, NAVI: 100_000, BTR: 95_000, DEWA: 85_000,
};

const TEAM_COLOR: Record<Team, string> = {
  ONIC: "#FFD100",
  RRQ: "#4B5563",    // abu-abu gelap
  EVOS: "#5AA9E6",
  TLID: "#2563EB",
  GEEK: "#FF6B6B",
  AE: "#7C3AED",
  NAVI: "#FACC15",
  BTR: "#F9A8D4",    // pink agak memutih
  DEWA: "#EAB308",
};

const fmt = new Intl.NumberFormat("id-ID");

/** ======================
 *  Logo tim (untuk grid & bar)
 *  ====================== */
function TeamLogo({ code, size = 18 }: { code: Team; size?: number }) {
  return (
    <Image
      src={`/logos/${code}.png`}
      alt={`${code} logo`}
      width={size}
      height={size}
      className="rounded-[4px] object-contain"
    />
  );
}

/** ======================
 *  Custom shape: Bar + Logo (tanpa badge)
 *  ====================== */
function BarWithLogo(props: any) {
  const { x, y, width, height, fill, payload } = props;
  const team: Team = payload.team;
  const logoHref = `/logos/${team}.png`;

  const size = Math.min(28, Math.max(16, Math.min(width * 0.6, height - 8)));
  const showLogo = height > 24 && size >= 16;

  const cx = x + width / 2;
  const cy = y + 8 + size / 2;

  const rx = 8;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={rx} ry={rx} />
      {showLogo && (
        <image
          href={logoHref}
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
          preserveAspectRatio="xMidYMid meet"
          opacity="0.98"
        />
      )}
    </g>
  );
}

/** ======================
 *  Halaman Leaderboard
 *  ====================== */
export default function LeaderboardPage() {
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const [mounted, setMounted] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    setMounted(true);
    const update = () => setIsNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const data = useMemo(() => {
    const arr = TEAMS.map((t) => ({
      team: t,
      name: TEAM_FULLNAME[t],
      viewers: TEAM_BASELINE[t],
      color: TEAM_COLOR[t],
    }));
    return arr.sort((a, b) => (sort === "desc" ? b.viewers - a.viewers : a.viewers - b.viewers));
  }, [sort]);

  const chartInnerWidth = mounted ? Math.max(560, data.length * 72) : 560;

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
          <p className="text-sm text-black/60">
            Urutan berdasarkan estimasi fanbase (avg concurrent viewers-simulasi)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-black/60">Urutkan:</span>
          <button
            onClick={() => setSort((s) => (s === "desc" ? "asc" : "desc"))}
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50 text-sm"
          >
            {sort === "desc" ? "Tertinggi → Terendah" : "Terendah → Tertinggi"}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="w-full overflow-x-auto">
          <div style={{ width: chartInnerWidth }} className="h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="team"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickLine={{ stroke: "#e5e7eb" }}
                  hide={!mounted ? false : isNarrow}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip formatter={(v: any) => fmt.format(Number(v))} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="viewers" shape={<BarWithLogo />} radius={[8, 8, 0, 0]}>
                  {data.map((d, i) => (
                    <Cell key={`cell-${i}`} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabel ringkas */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-black/60 border-b border-black/10">
                <th className="py-2">Nama Tim</th>
                <th className="py-2 whitespace-nowrap">Avg Viewers (mock)</th>
                <th className="py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.team} className="border-b border-black/5">
                  <td className="py-2 font-medium">{d.name}</td>
                  <td className="py-2">{fmt.format(d.viewers)}</td>
                  <td className="py-2">
                    <Link href={`/team/${d.team}`} className="text-sky-600 hover:underline">
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grid kartu (logo + singkatan) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {data.map((d) => (
            <Link
              key={d.team}
              href={`/team/${d.team}`}
              className="rounded-xl border border-black/10 bg-white p-3 hover:border-black/30 transition"
            >
              <div className="flex items-center gap-2">
                <TeamLogo code={d.team} size={18} />
                <div className="font-medium">{d.team}</div>
              </div>
              <div className="text-xs text-black/60 mt-1">{d.name}</div>
              <div className="text-sm mt-1">{fmt.format(d.viewers)} avg</div>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-[11px] text-black/50">
          Data simulasi. Saat API aktif, angka akan otomatis pakai sumber nyata.
        </div>
      </div>
    </main>
  );
}
