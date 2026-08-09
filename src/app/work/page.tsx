import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import WorkSection from "@/components/section/work-section";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Work Experience",
};

export default function WorkPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <PageHeader
        path={["work"]}
        title="Work"
        count={DATA.work.length}
        description="Places where I've shipped code and grown as an engineer."
      />
      <WorkSection />
    </main>
  );
}