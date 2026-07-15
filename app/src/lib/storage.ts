/**
 * localStorage helpers that are safe during prerender.
 *
 * These must never be called from a useState initialiser. Prerendered HTML is
 * one shared file, so the server has no user's cart; if the client's first
 * render read localStorage it would produce different markup and hydration
 * would fail. Read in an effect after mount instead — the state then updates
 * on the client only, which is exactly what per-user data should do.
 */

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or private mode — the cart still works for this session.
  }
}

export function clearStored(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}
