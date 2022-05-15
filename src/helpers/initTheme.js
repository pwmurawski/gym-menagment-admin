export default function initTheme() {
  const theme =
    window.localStorage.getItem("theme") ??
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "themeDark"
      : "";

  return theme;
}
