import Dashboard from "./components/Dashboard";
import Link from "next/link";
import BubbleBoard from "./components/BubbleBoard"; // ⬅️ pastikan file ini ada

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span style={{ color: "var(--title-fanbase, #000000)" }}>Fanbase</span>{" "}
            <span style={{ color: "var(--title-mlbb, #000000)" }}>MLBB</span>{" "}
            <span style={{ color: "var(--title-dashboard, #000000)" }}>Dashboard</span>
          </h1>

          {/* tombol ke leaderboard tetap ada */}
          <Link
            href="/leaderboard"
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50 text-sm border-black/10"
          >
            Leaderboard →
          </Link>
        </div>

        {/* Dashboard utama */}
        <Dashboard />

        {/* BubbleBoard di bawah Dashboard */}
        <section>
          <h2 className="text-xl font-semibold mb-3"></h2>
          <BubbleBoard />
        </section>
      </div>
    </main>
  );
}
