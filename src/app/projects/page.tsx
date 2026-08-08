import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProjectsSection from "@/components/section/projects-section";
import { SlabTitle } from "@/components/slab-title";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-8 relative">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SlabTitle title="Projects" />
        <Link href="/" className="btn px-3 py-2 text-sm">
          <ArrowLeft className="size-4" aria-hidden />
          Home
        </Link>
      </div>
      <ProjectsSection />
    </main>
  );
}
