/** Normalized OG icon node layout (0–1 space) for neural morph */

export type Vec2 = { x: number; y: number };

const TAU = Math.PI * 2;

function ring(cx: number, cy: number, r: number, count: number, start = 0): Vec2[] {
  return Array.from({ length: count }, (_, i) => {
    const a = start + (i / count) * TAU;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });
}

function arc(
  cx: number,
  cy: number,
  r: number,
  count: number,
  a0: number,
  a1: number
): Vec2[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : i / (count - 1);
    const a = a0 + (a1 - a0) * t;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });
}

/** Approximate interlocking OG mark as target positions */
export function createOGTargets(): Vec2[] {
  const O = [
    ...ring(0.34, 0.48, 0.2, 18),
    ...ring(0.34, 0.48, 0.12, 10),
    { x: 0.34, y: 0.48 },
    { x: 0.28, y: 0.42 },
    { x: 0.4, y: 0.42 },
    { x: 0.28, y: 0.54 },
    { x: 0.4, y: 0.54 },
  ];

  const G = [
    ...arc(0.66, 0.48, 0.2, 14, -Math.PI * 0.85, Math.PI * 0.95),
    ...arc(0.66, 0.48, 0.12, 8, -Math.PI * 0.7, Math.PI * 0.75),
    { x: 0.78, y: 0.48 },
    { x: 0.72, y: 0.48 },
    { x: 0.74, y: 0.42 },
    { x: 0.66, y: 0.48 },
    { x: 0.7, y: 0.56 },
    { x: 0.62, y: 0.58 },
  ];

  const bridge = [
    { x: 0.48, y: 0.56 },
    { x: 0.52, y: 0.54 },
    { x: 0.55, y: 0.5 },
    { x: 0.5, y: 0.48 },
  ];

  return [...O, ...G, ...bridge];
}

export function randomInUnit(): Vec2 {
  return { x: Math.random(), y: Math.random() };
}

export function dist(a: Vec2, b: Vec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export const BRAND_HEX = {
  sky: "#00AEEF",
  deep: "#003B73",
  navy: "#051937",
  orange: "#F15A24",
  gold: "#FBB03B",
} as const;

export function nodeColor(x: number): string {
  if (x < 0.42) return BRAND_HEX.sky;
  if (x < 0.55) return BRAND_HEX.gold;
  return BRAND_HEX.orange;
}
