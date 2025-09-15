export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Disclaimer</h1>
      <p className="text-sm text-black/60 mt-1">
        Pernyataan penafian dan ruang lingkup tanggung jawab.
      </p>

      <div className="rounded-2xl border border-black/10 bg-white p-5 mt-6 space-y-6">
        <section>
          <h2 className="text-base font-medium">Sifat Informasi</h2>
          <p className="text-sm text-black/70 mt-1">
            Situs ini dibangun untuk <b>tujuan riset dan pendidikan</b>. Sebagian data
            yang ditampilkan merupakan <b>simulasi (mock)</b> dan bukan representasi resmi
            dari MPL ID ataupun tim terkait. Kami berupaya menjaga akurasi, namun
            <b> tidak menjamin</b> kelengkapan, kesesuaian, atau ketepatan waktu informasi.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Netral & Transparan</h2>
          <p className="text-sm text-black/70 mt-1">
            Kami bersifat <b>netral dan independen</b>. Tidak berafiliasi, disponsori, atau
            diendors oleh organisasi/tim mana pun. Metodologi dan asumsi akan dijelaskan
            secara terbuka di dokumentasi saat data nyata terhubung.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Hak Kekayaan Intelektual</h2>
          <p className="text-sm text-black/70 mt-1">
            Logo, nama, dan merek dagang yang mungkin ditampilkan adalah milik
            masing-masing pemilik hak. Penggunaan di situs ini bersifat nominatif untuk
            identifikasi dan tujuan edukasi. <b>Kami tidak memonetisasi</b> situs ini dan
            tidak menampilkan iklan. Jika Anda pemegang hak dan ingin meminta perubahan
            atau penghapusan materi, silakan hubungi kami melalui halaman Contact.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium">Batas Tanggung Jawab</h2>
          <p className="text-sm text-black/70 mt-1">
            Kami tidak bertanggung jawab atas kerugian atau keputusan yang timbul dari
            penggunaan informasi di situs ini. Gunakan konten dengan pertimbangan Anda
            sendiri, dan rujuk sumber resmi untuk keputusan penting.
          </p>
        </section>
      </div>
    </main>
  );
}
