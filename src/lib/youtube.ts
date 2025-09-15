export const __YT_INTERNAL__ = {} as any; // optional anchor for tests

const API = "https://www.googleapis.com/youtube/v3";
const KEY = process.env.YT_API_KEY!;
if (!KEY) throw new Error("Missing YT_API_KEY");

type CacheEntry = { ts: number; data: any };
const CACHE = new Map<string, CacheEntry>();
const INFLIGHT = new Map<string, Promise<any>>();

const TTL = {
  searchLive: 25_000,
  latestVideo: 25_000,
  videosDetails: 25_000,
  channelStats: 12 * 60 * 60_000,
};

let QUOTA_LOCK_UNTIL = 0;
function quotaLocked() { return Date.now() < QUOTA_LOCK_UNTIL; }
function setQuotaLock(minutes = 10) { QUOTA_LOCK_UNTIL = Date.now() + minutes * 60_000; }

async function cachedFetch(url: string, ttl: number) {
  const now = Date.now();
  const cached = CACHE.get(url);
  if (cached && now - cached.ts < ttl) return cached.data;

  const inflight = INFLIGHT.get(url);
  if (inflight) return inflight;

  const p = (async () => {
    const res = await fetch(url);
    const text = await res.text();
    if (!res.ok) {
      let payload: any = {};
      try { payload = JSON.parse(text); } catch { payload = { text }; }
      const reason = payload?.error?.errors?.[0]?.reason;
      if (reason === "quotaExceeded") {
        setQuotaLock(10);
        const err = new Error("quotaExceeded");
        (err as any).payload = payload;
        throw err;
      }
      const err = new Error(`YOUTUBE_${res.status}`);
      (err as any).payload = payload;
      throw err;
    }
    const json = JSON.parse(text);
    CACHE.set(url, { ts: now, data: json });
    return json;
  })();

  INFLIGHT.set(url, p);
  try { return await p; } finally { INFLIGHT.delete(url); }
}

export type LiveStatus =
  | { live: false; quota?: boolean }
  | { live: true; videoId: string; title: string | null; concurrent: number; startedAt: string | null };

export async function getLiveStatus(channelId: string): Promise<LiveStatus> {
  if (quotaLocked()) {
    const cached = await getLiveStatusFromCacheOnly(channelId);
    return cached ?? { live: false, quota: true };
  }

  try {
    const s = await cachedFetch(`${API}/search?part=snippet&channelId=${channelId}&type=video&eventType=live&maxResults=1&key=${KEY}`, TTL.searchLive);
    const liveItem = s.items?.[0];
    if (liveItem?.id?.videoId) {
      const videoId = liveItem.id.videoId as string;
      const v = await cachedFetch(`${API}/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${KEY}`, TTL.videosDetails);
      const item = v.items?.[0];
      const d = item?.liveStreamingDetails || {};
      const result: LiveStatus = { live: true, videoId, title: item?.snippet?.title ?? null, concurrent: Number(d.concurrentViewers ?? 0), startedAt: d.actualStartTime ?? null };
      setLastKnownLive(channelId, result);
      return result;
    }
  } catch (e: any) {
    if (e?.message === "quotaExceeded") {
      const cached = await getLiveStatusFromCacheOnly(channelId);
      return cached ?? { live: false, quota: true };
    }
  }

  try {
    const latest = await cachedFetch(`${API}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=1&key=${KEY}`, TTL.latestVideo);
    const vId = latest.items?.[0]?.id?.videoId as string | undefined;
    if (vId) {
      const v = await cachedFetch(`${API}/videos?part=liveStreamingDetails,snippet&id=${vId}&key=${KEY}`, TTL.videosDetails);
      const item = v.items?.[0];
      const d = item?.liveStreamingDetails;
      const isActuallyLive = d && !d.actualEndTime && (d.actualStartTime || d.concurrentViewers);
      if (isActuallyLive) {
        const result: LiveStatus = { live: true, videoId: vId, title: item?.snippet?.title ?? null, concurrent: Number(d.concurrentViewers ?? 0), startedAt: d.actualStartTime ?? null };
        setLastKnownLive(channelId, result);
        return result;
      }
    }
  } catch (e: any) {
    if (e?.message === "quotaExceeded") {
      const cached = await getLiveStatusFromCacheOnly(channelId);
      return cached ?? { live: false, quota: true };
    }
  }

  setLastKnownLive(channelId, { live: false });
  return { live: false };
}

export async function getChannelStats(channelId: string) {
  try {
    const data = await cachedFetch(`${API}/channels?part=statistics,snippet&id=${channelId}&key=${KEY}`, TTL.channelStats);
    const ch = data.items?.[0];
    const s = ch?.statistics || {};
    const stats = {
      title: ch?.snippet?.title ?? null,
      subscribers: Number(s.hiddenSubscriberCount ? 0 : s.subscriberCount ?? 0),
      hiddenSubscribers: Boolean(s.hiddenSubscriberCount),
      views: Number(s.viewCount ?? 0),
      videos: Number(s.videoCount ?? 0),
    };
    setLastKnownStats(channelId, stats);
    return stats;
  } catch (e: any) {
    if (e?.message === "quotaExceeded") {
      const cached = getLastKnownStats(channelId);
      if (cached) return cached;
      throw e;
    }
    throw e;
  }
}

const LAST_LIVE = new Map<string, LiveStatus>();
const LAST_STATS = new Map<string, any>();

function setLastKnownLive(channelId: string, data: LiveStatus) { LAST_LIVE.set(channelId, data); }
async function getLiveStatusFromCacheOnly(channelId: string): Promise<LiveStatus | null> { return LAST_LIVE.get(channelId) ?? null; }

export function setLastKnownStats(channelId: string, data: any) { LAST_STATS.set(channelId, data); }
export function getLastKnownStats(channelId: string) { return LAST_STATS.get(channelId) ?? null; }
