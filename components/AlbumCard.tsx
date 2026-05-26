"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Album, ALBUM_LABELS } from "@/lib/r2";

interface AlbumCardProps {
  album: Album;
  photoUrls: string[];
  photoCount: number;
}

export default function AlbumCard({ album, photoUrls, photoCount }: AlbumCardProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const hasPhotos = photoUrls.length > 0;

  useEffect(() => {
    if (photoUrls.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % photoUrls.length);
        setFade(true);
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, [photoUrls.length]);

  return (
    <Link
      href={`/gallery/${album}`}
      className="group relative flex-1 max-w-sm sm:max-w-none block"
      style={{ minWidth: 0 }}
    >
      <div className="relative overflow-hidden bg-blush" style={{ height: "70vh", minHeight: 400 }}>
        {/* Slideshow images */}
        {hasPhotos ? (
          <Image
            src={photoUrls[current]}
            alt={ALBUM_LABELS[album]}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.6s ease-in-out",
            }}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose-light to-blush" />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Dot indicators */}
        {photoUrls.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photoUrls.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        )}

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h3
            className="text-white text-4xl sm:text-5xl mb-2 drop-shadow-lg"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            {ALBUM_LABELS[album]}
          </h3>
          <p className="text-white/60 text-xs tracking-[0.25em] uppercase font-dmsans">
            {photoCount} photos
          </p>

          {/* View button */}
          <div className="mt-5 inline-block border border-white/60 text-white/80 group-hover:bg-white group-hover:text-[#3a3333] transition-all duration-400 text-xs tracking-[0.2em] uppercase px-8 py-3 font-dmsans">
            View Album
          </div>
        </div>
      </div>
    </Link>
  );
}
