"use client";

import * as React from "react";

export const THEMES = [
  "light",
  "dark",
  "latte",
  "frappe",
  "macchiato",
  "mocha",
] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  latte: "Latte",
  frappe: "Frappé",
  macchiato: "Macchiato",
  mocha: "Mocha",
};

export const THEME_SWATCHES: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#18181b",
  latte: "#eff1f5",
  frappe: "#303446",
  macchiato: "#24273a",
  mocha: "#1e1e2e",
};

export function isDarkTheme(theme: Theme) {
  return theme !== "light" && theme !== "latte";
}

export const ACCENTS: { name: string; color: string; lightColor: string }[] = [
  { name: "Rosewater", color: "#f5e0dc", lightColor: "#dc8a78" },
  { name: "Flamingo", color: "#f2cdcd", lightColor: "#dd7878" },
  { name: "Pink", color: "#f5c2e7", lightColor: "#ea76cb" },
  { name: "Mauve", color: "#cba6f7", lightColor: "#8839ef" },
  { name: "Red", color: "#f38ba8", lightColor: "#d20f39" },
  { name: "Maroon", color: "#eba0ac", lightColor: "#e64553" },
  { name: "Peach", color: "#fab387", lightColor: "#fe640b" },
  { name: "Yellow", color: "#f9e2af", lightColor: "#df8e1d" },
  { name: "Green", color: "#a6e3a1", lightColor: "#40a02b" },
  { name: "Teal", color: "#94e2d5", lightColor: "#179299" },
  { name: "Sky", color: "#89dceb", lightColor: "#04a5e5" },
  { name: "Sapphire", color: "#74c7ec", lightColor: "#209fb5" },
  { name: "Blue", color: "#89b4fa", lightColor: "#1e66f5" },
  { name: "Lavender", color: "#b4befe", lightColor: "#7287fd" },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleLightDark: () => void;
  accent: string | null;
  setAccent: (color: string | null) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function PaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = React.useState<Theme | null>(null);
  const [accent, setAccentState] = React.useState<string | null>(null);

  React.useEffect(() => {
    Promise.resolve().then(() => {
      let storedTheme: string | null = null;
      let storedAccent: string | null = null;
      try {
        storedTheme = window.localStorage.getItem("palette");
        storedAccent = window.localStorage.getItem("accent");
      } catch {}
      const initial: Theme =
        storedTheme && THEMES.includes(storedTheme as Theme)
          ? (storedTheme as Theme)
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
      setThemeState(initial);
      if (storedAccent && ACCENTS.some((a) => a.color === storedAccent)) {
        setAccentState(storedAccent);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(theme);
    root.classList.toggle("dark", isDarkTheme(theme));
    try {
      window.localStorage.setItem("palette", theme);
    } catch {}
  }, [theme]);

  React.useEffect(() => {
    if (!accent) return;
    const root = document.documentElement;
    root.style.setProperty("--link", accent);
    try {
      window.localStorage.setItem("accent", accent);
    } catch {}
  }, [accent]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (accent) {
      const entry = ACCENTS.find((a) => a.color === accent);
      const color = entry
        ? isDarkTheme(theme ?? "light")
          ? entry.color
          : entry.lightColor
        : accent;
      root.style.setProperty("--link", color);
      root.style.setProperty("--primary", color);
      root.style.setProperty("--ring", color);
      root.style.setProperty("--primary-foreground", "#1e1e2e");
    } else {
      root.style.removeProperty("--link");
      root.style.removeProperty("--primary");
      root.style.removeProperty("--ring");
      root.style.removeProperty("--primary-foreground");
    }
  }, [accent, theme]);

  const value = React.useMemo<ThemeContextValue>(() => {
    const current = theme ?? "light";
    return {
      theme: current,
      isDark: isDarkTheme(current),
      setTheme: setThemeState,
      toggleLightDark: () =>
        setThemeState((prev) =>
          prev && isDarkTheme(prev) ? "light" : "dark"
        ),
      accent,
      setAccent: (color) => {
        if (!color) {
          document.documentElement.style.removeProperty("--link");
          try {
            window.localStorage.removeItem("accent");
          } catch {}
        }
        setAccentState(color);
      },
    };
  }, [theme, accent]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function usePalette() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return ctx;
}
