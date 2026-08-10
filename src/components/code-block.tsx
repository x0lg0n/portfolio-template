"use client";

import CodeCopyButton from "@/components/code-copy-button";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  lang = "text",
  filename,
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const out = await codeToHtml(code, {
          lang,
          themes: {
            light: "github-light-default",
            dark: "github-dark-default",
          },
          defaultColor: "light",
        });
        if (!cancelled) setHtml(out);
      } catch {
        if (!cancelled) setHtml(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div
      className={`not-prose my-5 overflow-hidden rounded-lg border border-border text-sm ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {filename ?? lang}
        </span>
        <CodeCopyButton code={code} />
      </div>
      <div className="overflow-x-auto">
        {html ? (
          <div
            className="min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="overflow-x-auto bg-muted/20 p-4 font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}