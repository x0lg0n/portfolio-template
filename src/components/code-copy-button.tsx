"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

export default function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="hover:text-foreground text-muted-foreground transition-colors"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}