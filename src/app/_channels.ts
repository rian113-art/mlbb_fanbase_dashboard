// src/app/_channels.ts
import type { Team } from "./_data";

/**
 * Masukkan CHANNEL ID YouTube resmi tiap tim.
 * Bentuknya selalu mulai dengan "UC...." (bukan @handle).
 *
 * CARA DAPAT CHANNEL ID:
 * - Kalau URL channel-nya seperti: https://www.youtube.com/channel/UCxxxxxxxx
 *   -> ambil bagian "UCxxxxxxxx" (itulah channelId).
 * - Kalau URL-nya pakai handle: https://www.youtube.com/@RRQ
 *   -> buka salah satu video dari channel tsb -> klik nama channel -> biasanya akan redirect
 *      ke /channel/UCxxxxxx. Ambil "UCxxxxxx" itu.
 */
export const TEAM_CHANNELS: Record<Team, string | undefined> = {
  ONIC: "UCtFLoujGe_FBSSDQTPHA24A", 
  RRQ:  "UCsE7IVpsU-jk6vAdBP9ZREg",
  EVOS: "UC7B2kbI32oz3RSB5CsbPgkQ",
  TLID: "UCxLPSC37OBMKLp8ORhuNImA",
  GEEK: "UC8j92wL-v6Hpx4ERO3ECFSA",
  AE:   "UCu3Oq_wEChEPaV7abgY688g",
  NAVI: "UC0tq0nWnVRTv8-I5jiPqYkA",
  BTR:  "UC6ZnM9vJ7OFVVvzOACDkfGg",
  DEWA: "UCqWW18u828_n7E1MJzu3Oqg",
};
