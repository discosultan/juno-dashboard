export const SEC_MS = 1000;
export const MIN_MS = 60_000;
export const HOUR_MS = 3_600_000;
export const DAY_MS = 86_400_000;
export const WEEK_MS = 604_800_000;
export const MONTH_MS = 2_629_746_000;
export const YEAR_MS = 31_556_952_000;

const INTERVAL_FACTORS: [string, number][] = [
  ["y", YEAR_MS],
  ["M", MONTH_MS],
  ["w", WEEK_MS],
  ["d", DAY_MS],
  ["h", HOUR_MS],
  ["m", MIN_MS],
  ["s", SEC_MS],
  ["ms", 1],
];
const INTERVAL_FACTORS_MAP = Object.fromEntries(INTERVAL_FACTORS);

export function strfinterval(interval: number): string {
  let result = "";

  let remainder = interval;
  for (const [letter, factor] of INTERVAL_FACTORS) {
    const quotient = Math.floor(remainder / factor);
    remainder = remainder % factor;
    if (quotient > 0) {
      result += `${quotient}${letter}`;
    }
    if (remainder === 0) {
      break;
    }
  }

  return result.length === 0 ? "0ms" : result;
}

export function strpinterval(repr: string): number {
  let result = 0;
  for (const group of repr.match(/\d+[a-zA-Z]+/g) || []) {
    result += calcIntervalGroup(group);
  }
  return result;
}

function calcIntervalGroup(group: string): number {
  for (let i = 1; i < group.length; i++) {
    if (isAlpha(group[i])) {
      return Number(group.substring(0, i)) * INTERVAL_FACTORS_MAP[group.substring(i)];
    }
  }
  throw new Error(`Invalid interval group: ${group}`);
}

function isAlpha(c: string) {
  // https://stackoverflow.com/a/32567789/1466456
  return c.toLowerCase() !== c.toUpperCase();
}

export function strftimestamp(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

export function strptimestamp(repr: string): number {
  return new Date(repr).getTime();
}

export function timeMs(): number {
  return Date.now();
}

// To convert a Date to timestamp, use `Date.getTime(this)`.
