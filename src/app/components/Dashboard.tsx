"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
  Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

// Ganti path ini bila tidak pakai alias '@/'
import { TEAM_CHANNELS } from "@/app/_channels";

type Team = keyof typeof TEAM_CHANNELS;

const TEAM_FULLNAME: Record<string, string> = {
  AE: "Alter Ego",
  BTR: "Bigetron by Vitality",
  DEWA: "Dewa United Esports",
  EVOS: "EVOS Glory",
  GEEK: "Geek Fam ID",
  NAVI: "NAVI",
  ONIC: "ONIC Esports",
  RRQ: "RRQ Hoshi",
  TLID: "Team Liquid ID",
};

const TEAM_COLOR: Record<string, { stroke: string; fillStart: string; fillEnd: string }> = {
  AE:   { stroke: "#7C3AED", fillStart: "rgba(124,58,237,0.16)", fillEnd: "rgba(124,58,237,0.04)" },
  BTR:  { stroke: "#EF4444", fillStart: "rgba(239,68,68,0.16)",  fillEnd: "rgba(239,68,68,0.04)" },
  DEWA: { stroke: "#EAB308", fillStart: "rgba(234,179,8,0.16)",  fillEnd: "rgba(234,179,8,0.04)" },
  EVOS: { stroke: "#5AA9E6", fillStart: "rgba(90,169,230,0.16)", fillEnd: "rgba(90,169,230,0.04)" },
  GEEK: { stroke: "#FF6B6B", fillStart: "rgba(255,107,107,0.16)",fillEnd: "rgba(255,107,107,0.04)" },
  NAVI: { stroke: "#FACC15", fillStart: "rgba(250,204,21,0.16)", fillEnd: "rgba(250,204,21,0.04)" },
  ONIC: { stroke: "#FFD100", fillStart: "rgba(255,209,0,0.16)",  fillEnd: "rgba(255,209,0,0.04)" },
  RRQ:  { stroke: "#F5B400", fillStart: "rgba(245,180,0,0.16)",  fillEnd: "rgba(245,180,0,0.04)" },
  TLID: { stroke: "#2563EB", fillStart: "rgba(37,99,235,0.16)",  fillEnd: "rgba(37,99,235,0.04)" },
};

const fmt = new Intl.NumberFormat("id-ID");
const CARD_CLASS = "w-full rounded-2xl border border-slate-200 bg-white text-slate-800 p-5 mt-8 shadow-sm";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

type ChannelStatsResp = {
  source: "live" | "cache" | "error" | "mock";
  channelId?: string;
  title?: string | null;
  stats?: {
    subscribers: number;
    views: number;
    videos: number;
    hiddenSubscribers?: boolean;
    likesRecent?: number;
  } | null;
  quota?: boolean;
  error?: string;
};

type SubsPoint = { t: number; subs: number; views: number; videos: number; likesRecent?: number };
type ViewsPoint = { t: number; views: number };

const loadLS = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};
const saveLS = (key: string, arr: unknown[]) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(arr)); } catch {}
};
const clearLS = (key: string) => {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(key); } catch {}
};

function useIsSmall() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsSmall(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isSmall;
}

function resolveChannelId(team: Team) {
  const raw: any = (TEAM_CHANNELS as any)?.[team];
  return typeof raw === "string" ? raw : raw?.id || raw?.channelId || raw?.channel || "";
}

function TeamLogo({ code, size = 18 }: { code: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="grid place-items-center rounded-[4px] bg-slate-100 text-slate-600 font-semibold"
        style={{ width: size, height: size, fontSize: Math.max(10, size * 0.55) }}
      >
        {code[0]}
      </div>
    );
  }
  return (
    <Image
      src={`/logos/${code}.png`}
      alt={`${TEAM_FULLNAME[code] || code} logo`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="rounded-[4px] object-contain"
    />
  );
}

export default function Dashboard() {
  const defaultTeam: Team = (Object.keys(TEAM_CHANNELS)[0] as Team) || ("RRQ" as Team);
  const [team, setTeam] = useState<Team>(defaultTeam);
  const [mounted, setMounted] = useState(false);
  const isSmall = useIsSmall();
  useEffect(() => setMounted(true), []);

  const channelId = resolveChannelId(team);
  const prevChannelRef = useRef<string>("");

  type Mode = "subs" | "views";
  const [mode, setMode] = useState<Mode>("subs");

  // ====== API (manual backend yang sudah kamu pasang) ======
  const { data: ch } = useSWR<ChannelStatsResp>(
    mounted && channelId ? `/api/channel-stats?team=${team}&channelId=${encodeURIComponent(channelId)}` : null,
    fetcher,
    { refreshInterval: 0, revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const palette = TEAM_COLOR[team as string] || { stroke: "#334155", fillStart: "rgba(51,65,85,0.16)", fillEnd: "rgba(51,65,85,0.04)" };

  // ====== Series state ======
  const subsKey = `subsHistory:${team}`;
  const viewsKey = `viewsHistory:${team}`;
  const [subsSeries, setSubsSeries] = useState<SubsPoint[]>([]);
  const [viewsSeries, setViewsSeries] = useState<ViewsPoint[]>([]);
  const [subsSeeded, setSubsSeeded] = useState(false);
  const [viewsSeeded, setViewsSeeded] = useState(false);

  // reset ketika channelId tim berubah
  useEffect(() => {
    if (!mounted) return;
    const prev = prevChannelRef.current;
    if (prev && prev !== channelId) {
      clearLS(subsKey);
      clearLS(viewsKey);
      setSubsSeries([]);
      setViewsSeries([]);
      setSubsSeeded(false);
      setViewsSeeded(false);
    }
    prevChannelRef.current = channelId;
  }, [channelId, mounted, subsKey, viewsKey]);

  useEffect(() => {
    if (!mounted) return;
    setSubsSeries(loadLS<SubsPoint>(subsKey));
    setViewsSeries(loadLS<ViewsPoint>(viewsKey));
    setSubsSeeded(false);
    setViewsSeeded(false);
  }, [team, mounted, subsKey, viewsKey]);

  // push snapshot SUBS (hindari override 0 jika hidden)
  useEffect(() => {
    if (!mounted) return;
    const stats = ch?.stats;
    if (!stats) return;

    if (stats.hiddenSubscribers && (!stats.subscribers || stats.subscribers === 0)) {
      // jangan timpa dengan 0 kalau disembunyikan
    } else {
      const now = Date.now();
      const snap: SubsPoint = {
        t: now,
        subs: stats.subscribers ?? 0,
        views: stats.views ?? 0,
        videos: stats.videos ?? 0,
        likesRecent: stats.likesRecent ?? undefined,
      };

      setSubsSeries((prev) => {
        if (!prev.length && !subsSeeded) {
          const seeded: SubsPoint[] = [];
          for (let i = 23; i >= 0; i--) {
            const jSubs = Math.round(snap.subs * (1 + (Math.random() * 0.0006 - 0.0003)));
            seeded.push({
              t: now - i * 60 * 60_000,
              subs: Math.max(0, jSubs),
              views: snap.views,
              videos: snap.videos,
              likesRecent: snap.likesRecent,
            });
          }
          saveLS(subsKey, seeded);
          setSubsSeeded(true);
          return seeded;
        }
        const last = prev[prev.length - 1];
        if (!last || last.subs !== snap.subs || last.views !== snap.views || last.videos !== snap.videos) {
          const next = [...prev.slice(-365), snap];
          saveLS(subsKey, next);
          return next;
        }
        return prev;
      });
    }
  }, [ch?.stats, mounted, subsKey, subsSeeded]);

  // push snapshot VIEWS (total views)
  useEffect(() => {
    if (!mounted) return;
    const stats = ch?.stats;
    if (!stats) return;

    const now = Date.now();
    const snap: ViewsPoint = { t: now, views: stats.views ?? 0 };

    setViewsSeries((prev) => {
      if (!prev.length && !viewsSeeded) {
        const seeded: ViewsPoint[] = [];
        for (let i = 23; i >= 0; i--) {
          // seed dengan sedikit jitter tapi tetap naik-turun kecil
          const jViews = Math.round(snap.views * (1 + (Math.random() * 0.0006 - 0.0003)));
          seeded.push({ t: now - i * 60 * 60_000, views: Math.max(0, jViews) });
        }
        saveLS(viewsKey, seeded);
        setViewsSeeded(true);
        return seeded;
      }
      const last = prev[prev.length - 1];
      if (!last || last.views !== snap.views) {
        const next = [...prev.slice(-365), snap];
        saveLS(viewsKey, next);
        return next;
      }
      return prev;
    });
  }, [ch?.stats, mounted, viewsKey, viewsSeeded]);

  // Chart data
  const subsChart = useMemo(() => subsSeries.map((p) => ({ x: new Date(p.t).toLocaleDateString(), y: p.subs })), [subsSeries]);
  const viewsChart = useMemo(() => viewsSeries.map((p) => ({ x: new Date(p.t).toLocaleDateString(), y: p.views })), [viewsSeries]);

  // Header angka & delta
  const subsLast = subsSeries[subsSeries.length - 1];
  const subsPrev = subsSeries[subsSeries.length - 2] ?? subsLast;
  const subsNow = subsLast?.subs ?? 0;
  const subsPrevVal = subsPrev?.subs ?? subsNow;
  const subsDiff = subsNow - subsPrevVal;
  const subsDiffPct = subsPrevVal ? (subsDiff / Math.abs(subsPrevVal)) * 100 : 0;

  const viewsLast = viewsSeries[viewsSeries.length - 1];
  const viewsPrev = viewsSeries[viewsSeries.length - 2] ?? viewsLast;
  const viewsNow = viewsLast?.views ?? 0;
  const viewsPrevVal = viewsPrev?.views ?? viewsNow;
  const viewsDiff = viewsNow - viewsPrevVal;
  const viewsDiffPct = viewsPrevVal ? (viewsDiff / Math.abs(viewsPrevVal)) * 100 : 0;

  const title = mode === "subs" ? "Subscribers" : "Jumlah Ditonton";
  const currentValue = mode === "subs" ? subsNow : viewsNow;
  const diff = mode === "subs" ? subsDiff : viewsDiff;
  const diffPct = mode === "subs" ? subsDiffPct : viewsDiffPct;

  const TEAMS = Object.keys(TEAM_CHANNELS) as Team[];

  return (
    <div className={CARD_CLASS}>
      {/* Selector tim */}
      <div className="flex flex-col gap-3 mb-4">
        <div
          className="flex gap-2 overflow-x-auto md:overflow-visible -mx-2 px-2 pb-1 md:flex-wrap md:justify-start"
          role="tablist"
          aria-label="Pilih tim"
        >
          {TEAMS.map((t) => (
            <button
              key={String(t)}
              onClick={() => setTeam(t)}
              className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition ${
                team === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
              }`}
              aria-pressed={team === t}
              title={TEAM_FULLNAME[t as string] || String(t)}
            >
              <TeamLogo code={String(t)} size={18} />
              {String(t)}
            </button>
          ))}
        </div>

        {/* Mode switch → bentuk kartu kecil */}
        <div className="flex gap-2">
          <ModeCard
            active={mode === "subs"}
            label="Subscribers"
            onClick={() => setMode("subs")}
          />
          <ModeCard
            active={mode === "views"}
            label="Jumlah Ditonton"
            onClick={() => setMode("views")}
          />
        </div>
      </div>

      {/* Header angka & delta */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${mode}-${team}-${currentValue}`}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-semibold leading-none mt-1 text-slate-800 whitespace-nowrap"
              suppressHydrationWarning
            >
              {fmt.format(currentValue)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={`text-xs px-2 py-1 rounded-lg whitespace-nowrap ${
            diff >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {diff >= 0 ? "▲" : "▼"} {fmt.format(Math.abs(diff))} ({diffPct >= 0 ? "+" : ""}
          {diffPct.toFixed(2)}%)
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          {mode === "views" ? (
            <AreaChart data={viewsChart} margin={{ top: 6, right: isSmall ? 6 : 12, left: 0, bottom: isSmall ? 0 : 12 }}>
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.stroke} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={palette.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" hide={isSmall} tick={{ fontSize: 11 }} interval="preserveEnd" />
              <YAxis hide={isSmall} tick={{ fontSize: 11 }} domain={["auto", "auto"]} tickFormatter={(v) => fmt.format(Number(v))} />
              <Tooltip content={<TinyTooltip />} cursor={{ stroke: "rgba(0,0,0,0.08)" }} />
              <Area type="monotone" dataKey="y" stroke={palette.stroke} strokeWidth={2} fill="url(#fillViews)" isAnimationActive connectNulls />
            </AreaChart>
          ) : (
            <LineChart data={subsChart} margin={{ top: 8, right: isSmall ? 6 : 16, left: 0, bottom: isSmall ? 0 : 16 }}>
              <defs>
                <linearGradient id="fillSubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.stroke} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={palette.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="x" hide={isSmall} tick={{ fontSize: 11 }} interval="preserveEnd" />
              <YAxis hide={isSmall} tick={{ fontSize: 11 }} tickFormatter={(v) => fmt.format(Number(v))} allowDecimals={false} />
              <Tooltip content={<TinyTooltip />} />
              <Line type="monotone" dataKey="y" stroke={palette.stroke} strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} isAnimationActive connectNulls />
              <Area type="monotone" dataKey="y" stroke="none" fill="url(#fillSubs)" isAnimationActive={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-[11px] text-slate-500">
        {mode === "views"
          ? "Mode Jumlah Ditonton (total views channel)."
          : "Mode Subscribers (snapshot angka pelanggan)."}
      </div>

      {ch?.error && (
        <div className="mt-3 text-[11px] text-rose-600">Channel stats error: {ch.error}</div>
      )}

      {ch?.stats?.hiddenSubscribers && (
        <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          Jumlah subscriber channel ini disembunyikan oleh pemiliknya. Data terakhir tidak diperbarui.
        </div>
      )}
    </div>
  );
}

function ModeCard({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 sm:flex-none min-w-[140px] px-3 py-2 rounded-xl border transition text-left shadow-sm
        ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"}`}
      aria-pressed={active}
    >
      <div className="text-[11px] uppercase tracking-wide opacity-70">Mode</div>
      <div className="font-semibold -mt-0.5">{label}</div>
    </button>
  );
}

function TinyTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const v = Number(payload[0].value || 0);
  return (
    <div className="rounded-md bg-slate-800 text-white text-xs px-2 py-1 shadow-sm">
      {fmt.format(v)}
    </div>
  );
}
