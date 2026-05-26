import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALBUMS,
  ALBUM_LABELS,
  Album,
  listImages,
} from "@/lib/r2";
import MasonryGrid from "@/components/MasonryGrid";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return ALBUMS.map((album) => ({ album }));
}

interface PageProps {
  params: { album: string };
}

export async function generateMetadata({ params }: PageProps) {
  if (!ALBUMS.includes(params.album as Album)) return {};
  const label = ALBUM_LABELS[params.album as Album];
  return {
    title: `${label} — Wedding Gallery`,
    openGraph: {
      title: `${label} — Wedding Gallery`,
      description: `Browse the ${label.toLowerCase()} photos`,
    },
  };
}

export default async function AlbumPage({ params }: PageProps) {
  if (!ALBUMS.includes(params.album as Album)) {
    notFound();
  }

  const album = params.album as Album;
  const photos = await listImages(album).catch(() => []);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="pt-16 pb-10 text-center px-6">
        <Link
          href="/gallery"
          className="inline-block text-[#b0a0a0] text-xs tracking-[0.25em] uppercase font-dmsans hover:text-dusty-rose transition-colors mb-8"
        >
          ← All Albums
        </Link>

        <h2
          className="text-5xl sm:text-6xl text-[#3a3333] leading-none mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          {ALBUM_LABELS[album]}
        </h2>

        <div className="flex items-center justify-center gap-4 mt-6 mb-2">
          <div className="h-px w-12 bg-dusty-rose-light" />
          <div className="w-1 h-1 rounded-full bg-dusty-rose opacity-50" />
          <div className="h-px w-12 bg-dusty-rose-light" />
        </div>

        <p className="text-[#a08080] text-xs tracking-[0.2em] uppercase font-dmsans mt-4">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </p>
      </header>

      {/* Album navigation */}
      <nav className="flex justify-center gap-6 px-6 mb-12">
        {ALBUMS.map((a) => (
          <Link
            key={a}
            href={`/gallery/${a}`}
            className={`text-xs tracking-[0.2em] uppercase font-dmsans transition-colors pb-1 ${
              a === album
                ? "text-dusty-rose border-b border-dusty-rose"
                : "text-[#b0a0a0] hover:text-dusty-rose"
            }`}
          >
            {ALBUM_LABELS[a]}
          </Link>
        ))}
      </nav>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <MasonryGrid photos={photos} />
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
