"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn px-3 py-2 text-sm"
    >
      <Download className="size-4" aria-hidden />
      Print / PDF
    </button>
  );
}