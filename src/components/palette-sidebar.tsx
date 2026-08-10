"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, X } from "lucide-react";

import {
  ACCENTS,
  THEME_LABELS,
  THEME_SWATCHES,
  usePalette,
} from "@/components/palette-provider";
import { cn } from "@/lib/utils";

const BASE_THEMES = ["light", "dark"] as const;
const CTP_THEMES = ["latte", "frappe", "macchiato", "mocha"] as const;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Gallery", href: "/gallery" },
];

export default function PaletteSidebar() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme, accent, setAccent, isDark } = usePalette();
  const pathname = usePathname();

  const accentName = ACCENTS.find((a) => a.color === accent)?.name ?? null;

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "k" || e.key === "K") {
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-dashed border-border px-4">
          <span className="font-heading text-base font-bold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigate
          </div>
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex-shrink-0 border-t border-dashed border-border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Palette className="size-3.5" aria-hidden />
              Theme
            </span>
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-link">
              {THEME_LABELS[theme]}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {BASE_THEMES.map((name) => (
              <ThemeButton
                key={name}
                name={name}
                label={THEME_LABELS[name]}
                swatch={THEME_SWATCHES[name]}
                selected={theme === name}
                onSelect={() => setTheme(name)}
              />
            ))}
            <div className="my-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              <span>Catppuccin</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            {CTP_THEMES.map((name) => (
              <ThemeButton
                key={name}
                name={name}
                label={THEME_LABELS[name]}
                swatch={THEME_SWATCHES[name]}
                selected={theme === name}
                onSelect={() => setTheme(name)}
              />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-dashed border-border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span
                className="size-3.5 rounded-full border border-border"
                style={{ backgroundColor: accent ?? "var(--link)" }}
              />
              Color
            </span>
            <button
              onClick={() => setAccent(null)}
              className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-link transition-colors hover:border-link/40"
              aria-label="Reset accent color"
            >
              {accentName ?? "Default"}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ACCENTS.map((a) => {
              const selected = accent === a.color;
              return (
                <button
                  key={a.name}
                  title={a.name}
                  aria-label={a.name}
                  aria-pressed={selected}
                  onClick={() => setAccent(selected ? null : a.color)}
                  className={cn(
                    "size-5 rounded-full border border-border transition-transform hover:scale-110",
                    selected && "ring-2 ring-foreground/60 ring-offset-2 ring-offset-sidebar"
                  )}
                  style={{
                    backgroundColor: isDark ? a.color : a.lightColor,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-dashed border-border px-4 py-3 font-mono text-[11px] text-muted-foreground">
          press <span className="text-link">K</span> to toggle this menu
        </div>
      </aside>
    </>
  );
}

function ThemeButton({
  name,
  label,
  swatch,
  selected,
  onSelect,
}: {
  name: string;
  label: string;
  swatch: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      key={name}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        selected
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      )}
      aria-pressed={selected}
    >
      <span
        className="size-3.5 rounded-full border border-border shadow-sm"
        style={{ backgroundColor: swatch }}
      />
      {label}
      {selected ? (
        <span className="ml-auto text-xs text-link">current</span>
      ) : null}
    </button>
  );
}