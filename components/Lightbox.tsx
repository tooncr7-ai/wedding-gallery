"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { PhotoItem } from "@/lib/r2";

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors text-2xl z-10 w-10 h-10 flex items-center justify-center"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-dmsans">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev button */}
      {hasPrev && (
        <button
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-3xl z-10 w-12 h-12 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-3xl z-10 w-12 h-12 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        className="lightbox-image relative max-w-5xl max-h-[88vh] w-full mx-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photo.url}
          src={photo.url}
          alt={photo.filename}
          width={1200}
          height={900}
          className="object-contain max-h-[88vh] w-auto mx-auto select-none"
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>

      {/* Filename caption */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest font-dmsans">
        {photo.filename}
      </div>
    </div>
  );
}
