export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidWsUrl(url: string): boolean {
  return isValidUrl(url) && (url.startsWith('ws://') || url.startsWith('wss://'));
}