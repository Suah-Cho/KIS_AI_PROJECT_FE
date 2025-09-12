export type ThemeOption = "light" | "dark" ;

const KEY_OPTION = "theme.option";
const KEY_CUSTOM = "theme.customColor";

const mql =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

export function getSavedTheme() {
  const option = (localStorage.getItem(KEY_OPTION) as ThemeOption) || "light";
  const customColor = localStorage.getItem(KEY_CUSTOM) || "#19c37d";
  return { option, customColor };
}

function setDark(isDark: boolean) {
  const el = document.documentElement;
  el.classList.toggle("dark", isDark);      // Tailwind dark 변형
  el.setAttribute("data-theme", isDark ? "dark" : "light");
}

function setAccent(color: string) {
  document.documentElement.style.setProperty("--accent", color);
}

export function applyTheme(option: ThemeOption, customColor?: string) {
  localStorage.setItem(KEY_OPTION, option);
  // if (option === "custom" && customColor) {
  //   localStorage.setItem(KEY_CUSTOM, customColor);
  // }
  // 미리보기와 동일하게 DOM 반영
  previewTheme(option, customColor);
}

export function initTheme() {
  const { option, customColor } = getSavedTheme();
  applyTheme(option, customColor);

  const onChange = (e: MediaQueryListEvent) => {
    const current = localStorage.getItem(KEY_OPTION) as ThemeOption | null;
  };
  mql?.addEventListener?.("change", onChange);
  return () => mql?.removeEventListener?.("change", onChange);
}

export function previewTheme(option: ThemeOption, customColor?: string) {
  const sysDark = !!mql?.matches;
  const isDark = option === "dark" ? true : option === "light" ? false : sysDark;
  setDark(isDark);

  const savedCustom = localStorage.getItem(KEY_CUSTOM) || "#19c37d";
  const currentAccent =
    getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#6366f1";
  const color = option === "light" ? (customColor || savedCustom) : currentAccent;
  setAccent(color);
}