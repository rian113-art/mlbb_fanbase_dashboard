import { NextResponse } from "next/server";
import { MANUAL_LIVE, TEAM_LIST, type Team } from "@/app/_manual";
import { TEAM_CHANNELS } from "@/app/_channels";

function resolveTeam(teamParam: string | null, channelParam: string | null): Team | null {
  if (teamParam && (TEAM_LIST as string[]).includes(teamParam)) return teamParam as Team;

  if (channelParam) {
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

  const l = MANUAL_LIVE[team];
  if (!l || !l.live) {
    return NextResponse.json(
      { live: false, team, channelId: channelId ?? null, source: "live-api" },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      live: true,
      team,
      channelId: channelId ?? null,
      source: "live-api",
      videoId: l.videoId ?? "manual",
      title: l.title ?? "Manual Live",
      concurrent: Number(l.concurrent ?? 0),
      startedAt: l.startedAt ?? null,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
