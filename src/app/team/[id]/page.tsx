// @ts-nocheck
import Image from "next/image";
import { notFound } from "next/navigation";
import TeamChart from "./TeamChart";
import {
  TEAM_FULLNAME,
  TEAM_COLOR,
  TEAM_ROSTER,
  ROLE_ORDER,
  ROLE_COLOR,
  TEAM_TITLES,
  type Team,
} from "../../_data";

// Pre-generate semua tim (SSG)
export function generateStaticParams() {
  const teams: Team[] = ["ONIC","RRQ","EVOS","TLID","GEEK","AE","NAVI","BTR","DEWA"];
  return teams.map((id) => ({ id }));
}

// Pakai argumen bertipe `any` agar kompatibel dengan checker Next 15
export default function TeamPage(props: any) {
  const teamId = String(props?.params?.id || "").toUpperCase();
  const team = teamId as Team;

  const name = TEAM_FULLNAME[team];
  if (!name) {
    notFound();
  }

  const color = TEAM_COLOR[team];
  const roster = TEAM_ROSTER[team];

  return (
    <main className="max-w-5xl mx-auto px-5 py-8 md:py-10 space-y-8 text-slate-800">
      {/* Header identitas */}
      <header className="flex items-center gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={`/logos/${team}.png`}
            alt={`${name} logo`}
            width={48}
            height={48}
            className="rounded-lg object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{name}</h1>
          <div className="text-xs text-slate-500">
            Profil tim, roster & data fanbase (simulasi)
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          <div
            className="w-8 h-8 rounded-lg border border-slate-200"
            style={{ backgroundColor: color }}
          />
        </div>
      </header>

      {/* ROSTER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Line-up & Coach</h2>

        {/* coach di atas, center di mobile */}
        <div className="flex justify-center md:justify-start mt-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 inline-flex items-center gap-2 shadow-sm">
            <span className="text-sm font-medium">{roster?.coach ?? "TBA"}</span>
            <span className="text-[11px] text-slate-500">Coach</span>
          </div>
        </div>

        {/* grid pemain */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {[...(roster?.players ?? [])]
            .sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role))
            .map((p) => {
              const style =
                ROLE_COLOR[p.role] ?? {
                  bg: "bg-slate-50",
                  text: "text-slate-700",
                  border: "border-slate-200",
                };
              return (
                <div
                  key={`${p.name}-${p.role}`}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
                >
                  <div className="text-sm font-medium">{p.name}</div>
                  <div
                    className={[
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] mt-1 border",
                      style.bg,
                      style.text,
                      style.border,
                    ].join(" ")}
                  >
                    {p.role}
                  </div>
                </div>
              );
            })}
          {(!roster?.players || roster.players.length === 0) && (
            <div className="col-span-full text-sm text-slate-500">
              Roster belum diisi.
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-500 mt-3">
          Line-up official resmi dari team
        </div>
      </section>

      {/* Grafik & metrik */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Grafik Penonton (mock)</h2>

        {/* “Center feel” di mobile */}
        <div className="w-full px-2">
          <TeamChart team={team} />
        </div>
      </section>

      {/* Sejarah Gelar / Prestasi */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Sejarah Gelar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {(TEAM_TITLES[team] ?? [])
            .sort((a, b) => b.year - a.year)
            .map((t, idx) => {
              const isMS =
                /m\s*-?\s*series/i.test(t.note ?? "") || /m\s*-?\s*series/i.test(t.event);

              if (isMS) {
                // Kartu “rare” (M-Series) — tebal & ukuran tetap sama
                return (
                  <div
                    key={`${t.event}-${t.year}-${idx}`}
                    className="ms-rare rounded-2xl p-[2px] -m-[1px]"
                  >
                    <div className="ms-rare-inner rounded-[14px] bg-white px-4 py-3 flex items-start gap-3 shadow-sm relative">
                      <div className="shrink-0 w-10 h-10 rounded-lg border border-slate-200 grid place-items-center text-xs font-semibold bg-slate-50">
                        {t.year}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold flex items-center gap-2">
                          {t.event}
                          <span className="ms-badge-container">
                            <span className="ms-badge">M-Series</span>
                          </span>
                        </div>
                        <div className="text-[12px] text-slate-600">
                          {t.result}
                          {t.note ? <> • {t.note}</> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Kartu biasa
              return (
                <div
                  key={`${t.event}-${t.year}-${idx}`}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-start gap-3 shadow-sm"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg border border-slate-200 grid place-items-center text-xs font-semibold bg-slate-50">
                    {t.year}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{t.event}</div>
                    <div className="text-[12px] text-slate-600">
                      {t.result}
                      {t.note ? <> • {t.note}</> : null}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Catatan netral */}
      <section className="text-xs text-slate-500">
        Situs ini netral & independen. Angka bersifat simulasi dan bukan representasi resmi MPL ID atau tim terkait.
      </section>
    </main>
  );
}
