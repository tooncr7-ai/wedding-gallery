"use client";

import Image from "next/image";
import Link from "next/link";
import { Album, ALBUM_LABELS } from "@/lib/r2";

interface AlbumCardProps {
  album: Album;
  coverUrl: string | null;
  photoCount: number;
}

const ALBUM_ICONS: Record<Album, string> = {
  ceremony: "◇",
  reception: "◈",
  portrait: "○",
  detail: "◻",
};

export default function AlbumCard({ album, coverUrl, photoCount }: AlbumCardProps) {
  return (
    <Link
      href={`/gallery/${album}`}
      className="group relative block overflow-hidden bg-blush"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={ALBUM_LABELS[album]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIxAAAQQBBAMBAAAAAAAAAAAAAQIDBBEhBRITMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmdW1rT9Lhc6nKyNx3DQSST7JOSfJwB7BVex7Wy2ZJXubHEMFzj4AHkknwBgAe8qOiJSotdSSlVAqFj//2Q=="
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose-light to-sage-light flex items-center justify-center">
            <span className="text-4xl text-dusty-rose opacity-40">
              {ALBUM_ICONS[album]}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
        <p className="text-xs tracking-[0.2em] uppercase font-dmsans mb-0.5 text-dusty-rose-light">
          {ALBUM_ICONS[album]}
        </p>
      </div>

      {/* Static label below card */}
      <div className="py-4 px-1 text-center">
        <h3
          className="text-xl text-[#3a3333] tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
        >
          {ALBUM_LABELS[album]}
        </h3>
        <p className="text-xs text-[#a08080] mt-1 tracking-widest font-dmsans">
          {photoCount} {photoCount === 1 ? "photo" : "photos"}
        </p>
      </div>
    </Link>
  );
}
