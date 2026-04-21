const SAFE_URL_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

// Allowlist URL transform for ReactMarkdown. This is stricter than ReactMarkdown's default
// (which only blocks a small set of known-bad schemes) and is explicit about what we accept.
export function safeMarkdownUrlTransform(url: string): string | null {
  const trimmed = url.trim();
  if (trimmed.length === 0) return null;

  // Relative URLs and fragment/query-only URLs are always safe.
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('?') ||
    trimmed.startsWith('.')
  ) {
    return trimmed;
  }

  // Scheme-relative URLs (//example.com/...) are treated as https.
  if (trimmed.startsWith('//')) {
    return trimmed;
  }

  // Any URL with a scheme must use one we allow.
  try {
    const parsed = new URL(trimmed);
    return SAFE_URL_SCHEMES.has(parsed.protocol) ? trimmed : null;
  } catch {
    // Not a parseable absolute URL — treat as a relative path.
    return trimmed;
  }
}
