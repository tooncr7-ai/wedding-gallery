import Link from "next/link";
import { ALBUMS, ALBUM_LABELS, listImages } from "@/lib/r2";
import AlbumCard from "@/components/AlbumCard";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const allImages = await listImages().catch(() => []);

  const albumData = ALBUMS.map((album) => {
    const photos = allImages.filter((p) => p.album === album);
    return {
      album,
      photoCount: photos.length,
      // ส่งทุกรูปสำหรับ slideshow สุ่ม
      photoUrls: photos.map((p) => p.url),
    };
  });

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="pt-16 pb-10 text-center px-6">
        <Link
          href="/"
          className="inline-block text-[#b0a0a0] text-xs tracking-[0.25em] uppercase font-dmsans hover:text-dusty-rose transition-colors mb-8"
        >
          ← Back
        </Link>

        <h2
          className="text-5xl sm:text-6xl text-[#3a3333] leading-none mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          Memorymhee
        </h2>

        <div className="flex items-center justify-center gap-4 mt-6 mb-2">
          <div className="h-px w-12 bg-dusty-rose-light" />
          <div className="w-1 h-1 rounded-full bg-dusty-rose opacity-50" />
          <div className="h-px w-12 bg-dusty-rose-light" />
        </div>

        <p className="text-[#a08080] text-xs tracking-[0.2em] uppercase font-dmsans mt-4">
          {allImages.length} Photos
        </p>
      </header>

      {/* Album cards — 2 การ์ดใหญ่กึ่งกลาง */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {albumData.map(({ album, photoCount, photoUrls }) => (
            <AlbumCard
              key={album}
              album={album}
              photoUrls={photoUrls}
              photoCount={photoCount}
            />
          ))}
        </div>
      </section>

      <footer className="text-center pb-12">
        <p className="text-[#c5b0b0] text-[10px] tracking-widest uppercase font-dmsans">
          Ananya &amp; Atip · 25.05.2025
        </p>
      </footer>
    </main>
  );
}
