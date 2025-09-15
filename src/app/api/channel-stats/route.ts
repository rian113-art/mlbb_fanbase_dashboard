import { NextResponse } from "next/server";
import { MANUAL_STATS, TEAM_LIST, type Team } from "@/app/_manual";
import { TEAM_CHANNELS } from "@/app/_channels";

// Coba mapping dari team atau channelId → team
function resolveTeam(teamParam: string | null, channelParam: string | null): Team | null {
  if (teamParam && (TEAM_LIST as string[]).includes(teamParam)) return teamParam as Team;

  // Jika user mengirim channelId, boleh kamu mapping sendiri via _channels.ts
  if (channelParam) {
    // contoh _channels.ts bisa berisi { RRQ: "UCxxxx", ... } atau object lain.
    const entries = Object.entries(TEAM_CHANNELS as any) as [string, any][];
    const found = entries.find(([k, v]) => {
      const id = typeof v === "string" ? v : v?.id || v?.channelId || v?.channel;
      return id === channelParam;
    });
    if (found && (TEAM_LIST as string[]).includes(found[0])) return found[0] as Team;
  }
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamParam = searchParams.get("team");
  const channelId = searchParams.get("channelId");

  const team = resolveTeam(teamParam, channelId);
  if (!team) {
    return NextResponse.json({ error: "unknown or missing team" }, { status: 400 });
  }

  const s = MANUAL_STATS[team];
  return NextResponse.json(
    {
      source: "mock",
      channelId: channelId ?? null,
      title: s?.title ?? team,
      stats: {
        subscribers: s?.subscribers ?? 0,
        views: s?.views ?? 0,
        videos: s?.videos ?? 0,
        hiddenSubscribers: Boolean(s?.hiddenSubscribers),
      },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
