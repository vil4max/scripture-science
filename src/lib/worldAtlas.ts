import christianTraditions from '../data/world-christian-traditions.json' with { type: 'json' };
import population from '../data/world-countries.json' with { type: 'json' };
import composition from '../data/world-composition.json' with { type: 'json' };

export const WORLD_COLORS: Record<string, string> = {
  christians: '--world-christians', muslims: '--t-islam', unaffiliated: '--world-unaffiliated',
  hindus: '--world-hindus', buddhists: '--world-buddhists', 'other-religions': '--world-other-religions', jews: '--t-judaism',
  catholics: '--t-catholicism', protestants: '--t-protestantism', orthodox: '--t-orthodoxy', 'other-christians': '--world-other-christians',
};
export const TRADITION_LABELS: Record<string, string> = {
  catholics: 'Католики', protestants: 'Протестанты',
  orthodox: 'Православные и древневосточные церкви', 'other-christians': 'Другие христианские направления',
};
export type AtlasMode = 'religions' | 'christian';
export interface AtlasRow { id: string; label: string; share: number; }
export const worldRows: AtlasRow[] = composition.map(({ id, label, share }) => ({ id, label, share }));
const branches = composition.find((group) => group.id === 'christians')!.breakdown!;
const traditionRows = christianTraditions.countries as Record<string, number[]>;

export function largestGroup(counts: number[], groups: string[]) {
  if (!counts.length || counts.length !== groups.length || counts.some((n) => !Number.isFinite(n) || n < 0)) return null;
  const max = Math.max(...counts);
  return max > 0 && counts.filter((n) => n === max).length === 1 ? groups[counts.indexOf(max)] : null;
}
export function formatShare(share: number) {
  if (!Number.isFinite(share) || share < 0) return '—';
  return share > 0 && share < 0.1 ? '<0,1 %' : `${share.toFixed(1).replace('.', ',')} %`;
}
export function atlasLegend(mode: AtlasMode) {
  return mode === 'religions' ? worldRows.map(({ id, label }) => ({ id, label }))
    : christianTraditions.traditions.map((id) => ({ id, label: TRADITION_LABELS[id] }));
}

// Each mode owns its original year and denominator. Historical branch counts
// must never be multiplied by the newer population totals.
export function atlasView(mode: AtlasMode, countryId = '') {
  const country = population.countries.find((entry) => entry.id === countryId);
  let rows: AtlasRow[] = [];
  if (!countryId) {
    rows = mode === 'religions' ? worldRows : branches.map(({ id, share }) => ({ id, label: TRADITION_LABELS[id], share }));
  } else if (country) {
    if (mode === 'religions' && country.total > 0) {
      rows = population.groups.map((id, index) => ({ id, label: worldRows.find((group) => group.id === id)!.label, share: country.counts[index] / country.total * 100 }));
    } else if (mode === 'christian') {
      // Curaçao was stored as a Netherlands Antilles proxy. Preserve that raw
      // record, but do not publish it as a country-specific estimate.
      const counts = countryId === 'CUW' ? undefined : traditionRows[countryId];
      const total = counts?.reduce((sum, count) => sum + count, 0) ?? 0;
      if (counts && total > 0) rows = christianTraditions.traditions.map((id, index) => ({ id, label: TRADITION_LABELS[id], share: counts[index] / total * 100 }));
    }
  }
  return {
    title: country?.name ?? (countryId ? 'Нет сопоставленных данных' : 'Весь мир'),
    year: mode === 'religions' ? population.year : christianTraditions.year,
    denominator: mode === 'religions' ? 'population' : 'christians',
    rows: [...rows].sort((a, b) => b.share - a.share),
    largest: largestGroup(rows.map((row) => row.share), rows.map((row) => row.id)),
  };
}
