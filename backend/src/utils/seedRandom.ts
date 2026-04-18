// Mulberry32 — fast seeded PRNG
function mulberry32(seed: number) {
  return function (): number {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

function dateToSeed(dateStr: string): number {
  // "YYYY-MM-DD" → integer e.g. 20260416
  return parseInt(dateStr.replace(/-/g, ''), 10);
}

/**
 * Deterministically generate target scale values for a given date.
 * All players on the same calendar day receive identical targets.
 *
 * @param dateStr  ISO date string "YYYY-MM-DD"
 * @param count    Number of rounds (default 5)
 * @returns        Array of target percentages in the range [20, 200]
 */
export function generateDailyTargets(dateStr: string, count = 5): number[] {
  const rand = mulberry32(dateToSeed(dateStr));
  return Array.from({ length: count }, () => Math.round(rand() * 180 + 20));
}

/** Returns today's date as "YYYY-MM-DD" in Europe/Warsaw time (resets at midnight Polish time) */
export function todayUTC(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw' }).format(new Date());
}
