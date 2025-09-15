export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-sm text-black/60 mt-1">
        Hubungi kami untuk saran, koreksi data, atau kerja sama riset.
      </p>

      <div className="rounded-2xl border border-black/10 bg-white p-5 mt-6 space-y-4">
        <section>
          <h2 className="text-base font-medium">Email</h2>
          <p className="text-sm text-black/70 mt-1">
            {/* Ganti email ini dengan milikmu */}
            <a href="mailto:contact@mlbbfanbase.id" className="text-sky-600 hover:underline">
              fanbasemlbbid@gmail.com
            </a>
          </p>
          <p className="text-xs text-black/50 mt-1">
            
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Tujuan Respons</h2>
          <ul className="list-disc pl-5 text-sm text-black/70 space-y-1 mt-1">
            <li>Menjawab pertanyaan umum terkait situs dan data.</li>
            <li>Menerima masukan perbaikan akurasi, keterbacaan, dan aksesibilitas.</li>
            <li>Koordinasi jika ada permintaan penghapusan konten/brand.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
