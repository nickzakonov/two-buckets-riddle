export default function GCD(x: number, y: number): number {
  if (!x) return y;
  return GCD(y % x, x);
}
