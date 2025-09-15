"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { hierarchy, pack, type HierarchyNode } from "d3-hierarchy";

// Data manual (subscribers) → hanya ini yang dipakai untuk ukuran bubble
import { TEAM_LIST, MANUAL_STATS, type Team } from "@/app/_manual";

type Datum = { team: Team; value: number; name: string };
type BubbleNodeBase = { x: number; y: number; r: number; team: Team; value: number; name: string };

// ===== Helpers (noise/anim) =====
function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rand01(seed: number) {
  let x = seed || 123456789;
  x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
  return ((x >>> 0) % 1000) / 1000;
}

function useSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ width: Math.round(cr.width), height: Math.round(cr.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, ...size };
}

export default function BubbleBoard() {
  // Ambil subscribers dari data manual
  const rawData = useMemo(() => {
    return TEAM_LIST.map((team) => {
      const subs = Math.max(1, Number(MANUAL_STATS[team]?.subscribers ?? 0));
      return { team, subs, name: team as string };
    });
  }, []);

  // Kompres skala agar proporsional
  const data = useMemo<Datum[]>(() => {
    const arr = rawData.map((d) => d.subs);
    const sMin = Math.min(...arr);
    const sMax = Math.max(...arr);
    const spread = sMax / Math.max(1, sMin);

    // gamma adaptif: makin besar spread, makin kecil gamma
    let gamma = 0.9;
    if (spread >= 50) gamma = 0.55;
    else if (spread >= 20) gamma = 0.65;
    else if (spread >= 10) gamma = 0.75;

    return rawData.map((d) => ({
      team: d.team,
      name: d.name,
      value: Math.pow(d.subs, gamma), // nilai untuk d3.pack (radius ∝ sqrt(area))
    }));
  }, [rawData]);

  const { ref, width } = useSize();
  const height = useMemo(() => {
    if (width <= 480) return 520;
    if (width <= 768) return 480;
    return 420;
  }, [width]);

  // Layout bubbles pakai d3.pack()
  const baseNodes = useMemo<BubbleNodeBase[]>(() => {
    if (!width) return [];
    const root: HierarchyNode<Datum | { children: Datum[] }> = hierarchy<
      Datum | { children: Datum[] }
    >({
      
      team: "ONIC",
      value: 0,
      name: "root",
      children: data,
    }).sum((d) => ("value" in d ? d.value : 0));

    const layout = pack<Datum | { children: Datum[] }>()
      .size([width, height])
      .padding(8);

    const leaves = layout(root).leaves();
    return leaves.map((leaf) => {
      const d = leaf.data as Datum;
      return { x: leaf.x, y: leaf.y, r: leaf.r, team: d.team, value: d.value, name: d.name };
    });
  }, [data, width, height]);

  // Animasi mengambang halus
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  useEffect(() => {
    const loop = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT((prev) => prev + dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, []);

  const nodes = useMemo(() => {
    return baseNodes.map((n) => {
      const seed = hashString(String(n.team));
      const phaseX = rand01(seed) * Math.PI * 2;
      const phaseY = rand01(seed * 17) * Math.PI * 2;
      const speedX = 0.3 + rand01(seed * 31) * 0.25;
      const speedY = 0.25 + rand01(seed * 53) * 0.25;
      const ampBase = Math.max(4, Math.min(16, n.r * 0.12));
      const ampX = ampBase * (0.8 + rand01(seed * 71) * 0.6);
      const ampY = ampBase * (0.8 + rand01(seed * 97) * 0.6);

      const dx = Math.sin(t * speedX + phaseX) * ampX;
      const dy = Math.cos(t * speedY + phaseY) * ampY;

      const safeX = Math.max(n.r + 8, Math.min((width || 0) - n.r - 8, n.x + dx));
      const safeY = Math.max(n.r + 8, Math.min((height || 0) - n.r - 8, n.y + dy));

      return { ...n, x2: safeX, y2: safeY };
    });
  }, [baseNodes, t, width, height]);

  return (
    <section className="mt-8 rounded-2xl border border-black/10 bg-white p-4">
      {/* Header judul */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Team Bubbleboard</h2>
        <span className="text-[11px] text-slate-500"></span>
      </div>

      <div ref={ref} className="relative w-full" style={{ height }}>
        <svg width={width} height={height} className="block">
          {nodes.map((n) => (
            <Bubble key={n.team} node={n} />
          ))}
        </svg>
      </div>

      <div className="mt-3 text-[11px] text-black/50">
        Klik bubble untuk membuka halaman tim.
      </div>
    </section>
  );
}

function Bubble({ node }: { node: BubbleNodeBase & { x2: number; y2: number } }) {
  const fill = COLOR_MAP[node.team] ?? "rgba(17,24,39,0.08)";
  const stroke = STROKE_MAP[node.team] ?? "#111827";

  const logoSize = Math.min(56, node.r * 0.95);
  const half = logoSize / 2;

  return (
    <Link href={`/team/${node.team}`}>
      <g transform={`translate(${node.x2}, ${node.y2})`} style={{ cursor: "pointer" }}>
        <defs>
          <radialGradient id={`g-${node.team}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={fill} stopOpacity={0.95} />
            <stop offset="100%" stopColor={fill} stopOpacity={0.55} />
          </radialGradient>
          <filter id={`shadow-${node.team}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>

        <circle
          r={node.r}
          fill={`url(#g-${node.team})`}
          stroke={stroke}
          strokeOpacity={0.15}
          style={{ filter: `url(#shadow-${node.team})` }}
        />

        {/* logo tim */}
        <image
          href={`/logos/${node.team}.png`}
          x={-half}
          y={-half}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </Link>
  );
}

const COLOR_MAP: Partial<Record<Team, string>> = {
  ONIC: "rgba(255,209,0,0.7)",
  RRQ: "rgba(36, 36, 36, 0.78)",
  EVOS: "rgba(90,169,230,0.7)",
  TLID: "rgba(37,99,235,0.7)",
  GEEK: "rgba(255,107,107,0.7)",
  AE: "rgba(124,58,237,0.7)",
  NAVI: "rgba(250,204,21,0.7)",
  BTR: "rgba(243, 126, 126, 0.7)",
  DEWA: "rgba(234,179,8,0.7)",
};

const STROKE_MAP: Partial<Record<Team, string>> = {
  ONIC: "#B38F00",
  RRQ: "#8A6D00",
  EVOS: "#467DAC",
  TLID: "#1E3A8A",
  GEEK: "#B94C4C",
  AE: "#5B21B6",
  NAVI: "#A16207",
  BTR: "#991B1B",
  DEWA: "#A16207",
};
