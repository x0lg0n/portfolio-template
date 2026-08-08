import Image from "next/image";

import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { galleryItems } from "@/data/gallery";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Gallery — Siddhartha",
  description:
    "Best captured moments from Siddhartha's travels and daily life.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section className="w-full py-20">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-col gap-y-3">
              <p className="font-mono text-sm text-muted-foreground">
                $ ls ./moments
              </p>
              <h1 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
                Gallery
              </h1>
              <p className="text-muted-foreground md:text-lg/relaxed text-balance">
                A collection of my best captured moments.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {galleryItems.length === 0 ? (
        <section>
          <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No moments yet. Drop your photos in
              <code className="mx-1 font-mono text-foreground">
                public/images/gallery/
              </code>
              and add entries in
              <code className="mx-1 font-mono text-foreground">
                src/data/gallery.ts
              </code>
              .
            </p>
          </div>
        </section>
      ) : (
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <BlurFade
                key={item.src}
                delay={BLUR_FADE_DELAY * (index + 1)}
                className="group relative overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5 p-4 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {item.caption && (
                    <span className="text-sm font-medium">{item.caption}</span>
                  )}
                  <span className="flex gap-3 text-xs text-white/70 font-mono">
                    {item.location && <span>{item.location}</span>}
                    {item.date && <span>{item.date}</span>}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>
      )}

      <footer className="py-6 text-center text-xs text-muted-foreground font-mono">
        <p>
          {DATA.name} — {galleryItems.length} moment
          {galleryItems.length === 1 ? "" : "s"} captured
        </p>
      </footer>
    </main>
  );
}
