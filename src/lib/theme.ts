export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export function resolveTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme();
}

/** Inline boot script — runs before paint to avoid a light/dark flash. */
export const themeBootScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.classList.toggle('light',t==='light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
