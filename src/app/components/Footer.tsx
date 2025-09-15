export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ background: "var(--footer-bg)", borderColor: "var(--footer-border)" }}
    >
      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        {/* grid: 1 kolom di mobile, 2 kolom di md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Links kecil */}
          <div className="w-full">
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--footer-text)" }}
            >
              Links
            </div>
            <div
              className="flex flex-wrap gap-3 text-sm"
              style={{ color: "var(--footer-text-muted)" }}
            >
              <a href="/contact" className="hover:underline break-words">• Contact</a>
              <a href="/disclaimer" className="hover:underline break-words">• Disclaimer</a>
              <a href="/privacy" className="hover:underline break-words">• Privacy Policy</a>
            </div>
          </div>

          {/* About singkat */}
          <div className="w-full">
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--footer-text)" }}
            >
              About
            </div>
            <p
              className="text-sm leading-relaxed break-words"
              style={{ color: "var(--footer-text-muted)" }}
            >
              Situs ini dibangun untuk tujuan <b>riset & edukasi</b>. Kami netral, independen, dan
              tidak berafiliasi dengan tim terkait. Angka yang ditampilkan sebagian
              besar masih berupa <i>simulasi/mock</i>. Tidak ada iklan atau monetisasi. Logo & nama
              tim adalah milik pemegang hak masing-masing, digunakan untuk identifikasi & pembelajaran.
            </p>
          </div>
        </div>

        {/* garis tipis */}
        <div
          className="h-px my-6"
          style={{ background: "var(--footer-line)" }}
        />

        {/* copyright */}
        <div
          className="text-xs text-center md:text-left break-words"
          style={{ color: "var(--footer-text-faint)" }}
        >
          © {new Date().getFullYear()} • Fanbase MLBB ID — Riset & Edukasi
        </div>
      </div>
    </footer>
  );
}
