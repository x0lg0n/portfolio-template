import { KineticText } from "@/components/ui/kinetic-text";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 py-24">
      <span className="absolute top-0 left-0 z-10 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
      <span className="absolute top-0 right-0 z-10 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
      <span className="absolute bottom-0 left-0 z-10 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
      <span className="absolute bottom-0 right-0 z-10 w-4 h-4 border-b-2 border-r-2 border-primary/40" />

      <p className="font-mono text-sm text-muted-foreground">
        $ find / -name &quot;{`{{path}}`}&quot;
      </p>

      <KineticText
        text="404"
        className="font-heading font-bold tracking-tight text-7xl md:text-8xl text-foreground/90"
      />

      <div className="space-y-2 text-center">
        <p className="text-lg font-medium text-foreground">
          ERROR: no match found
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
          Try another query or escape to the homepage.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <span aria-hidden>cd ~</span>
          <span className="sr-only">Homepage</span>
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <span aria-hidden>cat blog.md</span>
          <span className="sr-only">Blog</span>
        </Link>
      </div>

      <p className="font-mono text-xs text-muted-foreground/60">
        (exit code 404)
      </p>
    </section>
  );
}
