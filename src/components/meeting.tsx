"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Calendar } from "lucide-react";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { PulsatingButton } from "@/components/ui/pulsating-button";

export default function Meeting({ className }: { className?: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("init", { origin: "https://cal.com" });
      cal("ui", {
        theme: "auto",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <PulsatingButton
      data-cal-link={`${DATA.contact.meeting.calUsername}/30min`}
      data-cal-config='{"layout":"month_view"}'
      className={cn(
        "w-full px-3 py-2 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer",
        className
      )}
    >
      <Calendar className="w-4 h-4" /> Schedule a Meeting
    </PulsatingButton>
  );
}
