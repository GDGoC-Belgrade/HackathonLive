
export function isValidLinkedinUrl(value: string): boolean {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return false;
    }

    const isLinkedinHost =
      url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com");

    return isLinkedinHost && url.pathname.length > 1;
  } catch {
    return false;
  }
}
