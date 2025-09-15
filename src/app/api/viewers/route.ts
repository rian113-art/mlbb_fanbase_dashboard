// src/app/api/viewers/route.ts
import { NextResponse } from "next/server";

/** ===== Types ===== */
type Team = "ONIC" | "RRQ" | "EVOS" | "TLID" | "GEEK" | "AE" | "NAVI" | "BTR" | "DEWA";
type Point = { t: number; viewers: number };
type Store = Record<Team, Point[]>;

/** ===== Teams & baseline ===== */
const TEAMS: Team[] = ["ONIC", "RRQ", "EVOS", "TLID", "GEEK", "AE", "NAVI", "BTR", "DEWA"];

const TEAM_BASELINE: Record<Team, number> = {
  ONIC: 210_000,
  RRQ: 180_000,
  EVOS: 150_000,
  TLID: 130_000,
  GEEK: 120_000,
  AE:   110_000,
  NAVI: 100_000,
  BTR:   95_000,
  DEWA:  85_000,
};

function seedSeries(base: number, n = 24, stepMs = 5_000): Point[] {
  const now = Date.now();
  const arr: Point[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const ts = now - i * stepMs;
    const jitter = Math.round(base + (Math.random() * 2 - 1) * base * 0.08);
    arr.push({ t: ts, viewers: Math.max(0, jitter) });
  }
  return arr;
}

/** ===== Global store (server only, per-instance) ===== */
declare global {
  // eslint-disable-next-line no-var
  var __VIEWER_STORE: Store | undefined;
}
const g = globalThis as typeof globalThis & { __VIEWER_STORE?: Store };

if (!g.__VIEWER_STORE) {
  const initial = {} as Partial<Store>;
  for (const t of TEAMS) initial[t] = seedSeries(TEAM_BASELINE[t]);
  g.__VIEWER_STORE = initial as Store;
}
const STORE = g.__VIEWER_STORE!;

/** ===== Utils ===== */
function isTeam(x: string | null): x is Team {
  return !!x && (TEAMS as string[]).includes(x);
}
function json(data: any, init?: number | ResponseInit) {
  const res = NextResponse.json(
    data,
    typeof init === "number" ? { status: init } : init
  );
  // Hindari cache di route ini
  res.headers.set("Cache-Control", "no-store");
  return res;
}

/** ===== OPTIONS (CORS/dev tools) ===== */
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

/** ===== GET: /api/viewers?team=RRQ
 *  - jika 'team' valid → { source:"mock", team, data: Point[] }
 *  - jika tanpa 'team'  → { source:"mock", all: Record<Team,Point[]> } (ringan untuk debug)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const team = searchParams.get("team");

  if (team === null) {
    // semua tim (debug / small dashboard)
    return json({ source: "mock", all: STORE }, 200);
  }

  if (!isTeam(team)) {
    return json({ error: "unknown or missing team", teams: TEAMS }, 400);
  }

  return json({ source: "mock", team, data: STORE[team] }, 200);
}

/** ===== POST: /api/viewers?team=RRQ
 *  Body JSON:
 *    - { viewers: number, t?: number } → append titik baru (keep last 240)
 *  Query:
 *    - ?reset=1 → reset series RRQ pakai seed baseline (abaikan body)
 */
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const team = searchParams.get("team");
  const doReset = searchParams.get("reset");

  if (!isTeam(team)) {
    return json({ error: "unknown or missing team", teams: TEAMS }, 400);
  }

  // Reset series ke baseline seed
  if (doReset === "1" || doReset === "true") {
    STORE[team] = seedSeries(TEAM_BASELINE[team]);
    return json({ ok: true, reset: true, size: STORE[team].length }, 200);
  }

  // Append titik baru
  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  const viewers = Number(body?.viewers);
  if (!Number.isFinite(viewers) || viewers < 0) {
    return json({ error: "`viewers` must be a non-negative number" }, 400);
  }

  const t = Number.isFinite(Number(body?.t)) ? Number(body.t) : Date.now();

  const arr = STORE[team];
  arr.push({ t, viewers: Math.round(viewers) });
  if (arr.length > 240) arr.splice(0, arr.length - 240);

  return json({ ok: true, size: arr.length }, 200);
}
