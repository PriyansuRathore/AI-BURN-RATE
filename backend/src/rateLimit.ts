const requests = new Map<string, number[]>();

export function isRateLimited(key: string, maxRequests = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const bucket = requests.get(key) ?? [];
  const fresh = bucket.filter((timestamp) => now - timestamp < windowMs);
  fresh.push(now);
  requests.set(key, fresh);
  return fresh.length > maxRequests;
}
