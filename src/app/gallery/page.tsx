import { PageHeader } from "@/components/page-header";
import GalleryGrid from "@/components/gallery-grid";
import { DATA } from "@/data/resume";
import { galleryItems } from "@/data/gallery";

export const metadata = {
  title: "Gallery — Siddhartha",
  description:
    "Best captured moments from Siddhartha's travels and daily life.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <PageHeader
        path={["gallery"]}
        title="Gallery"
        count={galleryItems.length}
        description="A collection of my best captured moments."
      />

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
          <GalleryGrid items={galleryItems} />
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
