export const WORLD_COLORS: Record<string, string> = {
  christians: '--world-christians', muslims: '--t-islam', unaffiliated: '--world-unaffiliated',
  hindus: '--world-hindus', buddhists: '--world-buddhists', 'other-religions': '--world-other-religions', jews: '--t-judaism',
};
export function largestGroup(counts: number[], groups: string[]) {
  if (!counts.length || counts.length !== groups.length || counts.some((n) => !Number.isFinite(n) || n < 0)) return null;
  const max = Math.max(...counts);
  return max > 0 && counts.filter((n) => n === max).length === 1 ? groups[counts.indexOf(max)] : null;
}
export function formatShare(share: number) {
  return share > 0 && share < 0.1 ? '<0,1 %' : `${share.toFixed(1).replace('.', ',')} %`;
}
export function countryShare(count: number, total: number) {
  return formatShare((count / total) * 100);
}
