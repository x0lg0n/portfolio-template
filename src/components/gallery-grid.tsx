"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  X,
} from "lucide-react";

import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

function isPhone(camera: string): boolean {
  return /iphone|pixel|samsung/i.test(camera);
}

function useKey(key: string, handler: () => void) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) handler();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler]);
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const cameras = useMemo(
    () => [...new Set(items.map((i) => i.camera).filter(Boolean) as string[])],
    [items]
  );
  const years = useMemo(
    () => [
      ...new Set(
        items
          .map((i) => i.date?.slice(0, 4))
          .filter(Boolean) as string[]
      ),
    ],
    [items]
  );

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const year = item.date?.slice(0, 4);
        return (
          (selectedCameras.length === 0 ||
            (item.camera && selectedCameras.includes(item.camera))) &&
          (selectedYears.length === 0 ||
            (year && selectedYears.includes(year)))
        );
      }),
    [items, selectedCameras, selectedYears]
  );

  const isFiltering = selectedCameras.length > 0 || selectedYears.length > 0;

  const toggleFilter = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const clearAll = () => {
    setSelectedCameras([]);
    setSelectedYears([]);
  };

  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );

  useKey("Escape", () => setLightboxIndex(null));
  useKey("ArrowRight", next);
  useKey("ArrowLeft", prev);

  const lightboxItem =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <div className="mt-3 mb-4 flex flex-wrap items-center gap-2">
        {cameras.map((camera) => {
          const active = selectedCameras.includes(camera);
          return (
            <button
              key={camera}
              onClick={() => toggleFilter(setSelectedCameras, camera)}
              className={cn(
                "bg-muted flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors",
                active
                  ? "text-link bg-muted/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {isPhone(camera) ? (
                <Smartphone className="size-3.5" aria-hidden />
              ) : (
                <Camera className="size-3.5" aria-hidden />
              )}
              {camera}
              {active && <X className="size-3" aria-hidden />}
            </button>
          );
        })}

        {years.map((year) => {
          const active = selectedYears.includes(year);
          return (
            <button
              key={year}
              onClick={() => toggleFilter(setSelectedYears, year)}
              className={cn(
                "bg-muted flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors",
                active
                  ? "text-link bg-muted/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              <Calendar className="size-3.5" aria-hidden />
              {year}
              {active && <X className="size-3" aria-hidden />}
            </button>
          );
        })}

        {isFiltering && (
          <button
            onClick={clearAll}
            className="text-muted-foreground hover:text-foreground cursor-pointer rounded px-2 py-1 text-xs font-semibold transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="columns-1 gap-4 md:columns-2">
        {filtered.map((item, index) => (
          <button
            key={item.src}
            onClick={() => setLightboxIndex(index)}
            className="group mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl border border-border"
          >
            {item.video ? (
              <>
                <video
                  src={item.video}
                  poster={item.videoPoster ?? item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute right-2 top-2 z-10 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
                  ▶ video
                </span>
              </>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
            className="text-white/70 hover:text-white absolute top-4 right-4 cursor-pointer transition-colors"
          >
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="text-white/70 hover:text-white absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
          >
            <ChevronLeft className="size-8" />
          </button>
          <figure
            className="flex max-h-full flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.video ? (
            <video
              src={lightboxItem.video}
              poster={lightboxItem.videoPoster ?? lightboxItem.src}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
          ) : (
            <img
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
          )}
            <figcaption className="flex flex-col items-center gap-1 text-center text-sm text-white/80">
              {lightboxItem.caption && (
                <span className="font-medium text-white">
                  {lightboxItem.caption}
                </span>
              )}
              <span className="font-mono text-xs text-white/60">
                {[lightboxItem.location, lightboxItem.date, lightboxItem.camera]
                  .filter(Boolean)
                  .join(" — ")}
              </span>
              <span className="font-mono text-xs text-white/40">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="text-white/70 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      )}
    </>
  );
}
