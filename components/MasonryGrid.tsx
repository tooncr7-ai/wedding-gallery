"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PhotoItem } from "@/lib/r2";
import Lightbox from "./Lightbox";

interface MasonryGridProps {
  photos: PhotoItem[];
}

export default function MasonryGrid({ photos }: MasonryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);



  if (photos.length === 0) {
    return (
      <div className="text-center py-24 text-[#b0a0a0]">
        <p
          className="text-3xl mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          No photos yet
        </p>
        <p className="text-sm tracking-widest font-dmsans">
          Upload images to your R2 bucket to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={gridRef} className="masonry-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.key}
            className="masonry-item cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative overflow-hidden bg-blush">
              <Image
                src={photo.url}
                alt={photo.filename}
                width={600}
                height={800}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIxAAAQQBBAMBAAAAAAAAAAAAAQIDBBEhBRITMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmdW1rT9Lhc6nKyNx3DQSST7JOSfJwB7BVex7Wy2ZJXubHEMFzj4AHkknwBgAe8qOiJSotdSSlVAqFj//2Q=="
                loading={index < 6 ? "eager" : "lazy"}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
