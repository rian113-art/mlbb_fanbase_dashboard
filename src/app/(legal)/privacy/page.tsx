export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-black/60 mt-1">
        Kebijakan privasi singkat untuk transparansi.
      </p>

      <div className="rounded-2xl border border-black/10 bg-white p-5 mt-6 space-y-6">
        <section>
          <h2 className="text-base font-medium">Pengumpulan Data</h2>
          <p className="text-sm text-black/70 mt-1">
            Saat ini situs <b>tidak mengumpulkan data pribadi</b> pengunjung dan tidak
            menggunakan cookie analitik/iklan. Jika di masa depan kami menambahkan
            formulir, analitik, atau integrasi pihak ketiga, dokumen ini akan diperbarui.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Log Akses</h2>
          <p className="text-sm text-black/70 mt-1">
            Infrastruktur hosting atau penyedia layanan dapat menyimpan log akses untuk
            kebutuhan operasional (misalnya alamat IP sementara). Log ini tidak digunakan
            untuk mengidentifikasi individu kecuali diwajibkan secara hukum.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Kontak</h2>
          <p className="text-sm text-black/70 mt-1">
            Pertanyaan terkait privasi dapat dikirim ke{" "}
            <a href="mailto:contact@mlbbfanbase.id" className="text-sky-600 hover:underline">
              fanbasemlbbid@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
