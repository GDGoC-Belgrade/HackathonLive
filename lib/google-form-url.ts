export function isValidGoogleFormUrl(value: string): boolean {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return false;
    }

    if (url.hostname === "forms.gle") {
      return url.pathname.length > 1;
    }

    return (
      url.hostname === "docs.google.com" && url.pathname.startsWith("/forms/")
    );
  } catch {
    return false;
  }
}