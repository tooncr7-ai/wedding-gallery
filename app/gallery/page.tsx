import Link from "next/link";
import { ALBUMS, ALBUM_LABELS, listImages } from "@/lib/r2";
import AlbumCard from "@/components/AlbumCard";

export const dynamic = "force-dynamic"; // signed URL ต้องสร้างใหม่ทุก request

export default async function GalleryPage() {
  // Fetch all images once, group by album
  const allImages = await listImages().catch(() => []);

  const albumData = ALBUMS.map((album) => {
    const photos = allImages.filter((p) => p.album === album);
    return {
      album,
      photoCount: photos.length,
      coverUrl: photos[0]?.url ?? null,
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
          Our Gallery
        </h2>

        <div className="flex items-center justify-center gap-4 mt-6 mb-2">
          <div className="h-px w-12 bg-dusty-rose-light" />
          <div className="w-1 h-1 rounded-full bg-dusty-rose opacity-50" />
          <div className="h-px w-12 bg-dusty-rose-light" />
        </div>

        <p className="text-[#a08080] text-xs tracking-[0.2em] uppercase font-dmsans mt-4">
          {ALBUMS.length} Albums · {allImages.length} Photos
        </p>
      </header>

      {/* Album grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {albumData.map(({ album, photoCount, coverUrl }) => (
            <AlbumCard
              key={album}
              album={album}
              coverUrl={coverUrl}
              photoCount={photoCount}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-12">
        <p className="text-[#c5b0b0] text-[10px] tracking-widest uppercase font-dmsans">
          Ananya &amp; Atip · 25.05.2025
        </p>
      </footer>
    </main>
  );
}
