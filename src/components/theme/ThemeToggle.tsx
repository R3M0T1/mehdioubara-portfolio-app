"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/pouf/controls";
import { Icon } from "@/components/pouf/Icon";
import {
  applyTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

type Props = {
  labelToLight: string;
  labelToDark: string;
};

export function ThemeToggle({ labelToLight, labelToDark }: Props) {
  const reduceMotion = useReducedMotion();
  const switchRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(resolveTheme());
    setReady(true);
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? labelToLight : labelToDark;

  const setThemeAnimated = (next: Theme) => {
    const root = document.documentElement;
    const preferReduced =
      !!reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const commit = () => {
      applyTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* ignore quota / private mode */
      }
      setTheme(next);
    };

    const origin =
      switchRef.current?.querySelector(".pouf-switch") ?? switchRef.current;
    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Percentages stay correct inside the view-transition snapshot layer.
    root.style.setProperty("--theme-x", `${(x / window.innerWidth) * 100}%`);
    root.style.setProperty("--theme-y", `${(y / window.innerHeight) * 100}%`);
    root.style.setProperty("--theme-r", `${Math.ceil(endRadius)}px`);

    if (preferReduced || typeof document.startViewTransition !== "function") {
      commit();
      return;
    }

    root.dataset.themeTransition = next === "dark" ? "to-dark" : "to-light";

    const transition = document.startViewTransition(commit);
    transition.finished.finally(() => {
      delete root.dataset.themeTransition;
    });
  };

  return (
    <div className="theme-switch" ref={switchRef}>
      <motion.span
        className="theme-switch__glyph"
        aria-hidden
        initial={false}
        animate={{
          opacity: isDark ? 0.35 : 1,
          scale: isDark ? 0.85 : 1,
          rotate: isDark ? -18 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        <Icon name="sun" size="sm" />
      </motion.span>

      <Switch
        checked={isDark}
        onChange={(checked) => setThemeAnimated(checked ? "dark" : "light")}
        label={label}
        disabled={!ready}
      />

      <motion.span
        className="theme-switch__glyph"
        aria-hidden
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0.35,
          scale: isDark ? 1 : 0.85,
          rotate: isDark ? 0 : 18,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        <Icon name="moon" size="sm" />
      </motion.span>
    </div>
  );
}
