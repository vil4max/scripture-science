import christianTraditions from '../data/world-christian-traditions.json' with { type: 'json' };

// The map and the country panel colour a country by its largest group. The
// Christians of the 2020 data are split by tradition (owner, 2026-10-01):
// Pew's 2010 estimate gives each tradition's share of a country's Christians
// (src/data/world-christian-traditions.json); that share is applied to the
// 2020 number of Christians.
export const WORLD_COLORS: Record<string, string> = {
  christians: '--world-christians', muslims: '--t-islam', unaffiliated: '--world-unaffiliated',
  hindus: '--world-hindus', buddhists: '--world-buddhists', 'other-religions': '--world-other-religions', jews: '--t-judaism',
  catholics: '--t-catholicism', protestants: '--t-protestantism', orthodox: '--t-orthodoxy', 'other-christians': '--world-other-christians',
};
export const TRADITION_LABELS: Record<string, string> = {
  catholics: 'Католики', protestants: 'Протестанты', orthodox: 'Православные', 'other-christians': 'Другие христиане',
};
const TRADITION_IDS = christianTraditions.traditions;

type CountryRow = { id: string; counts: number[] };
const traditionRows = christianTraditions.countries as Record<string, number[]>;

// The country's counts with Christians replaced by the four traditions, in
// the group order [catholics, protestants, orthodox, other-christians, ...the
// six other groups]. A country without a tradition row keeps its Christians
// as one group and is reported with `split: false`.
export function splitGroups(groups: string[], country: CountryRow) {
  const christianIndex = groups.indexOf('christians');
  const christians = country.counts[christianIndex];
  const row = traditionRows[country.id];
  const total = row ? row.reduce((sum, n) => sum + n, 0) : 0;
  const ids = groups.filter((id) => id !== 'christians');
  const others = ids.map((id) => country.counts[groups.indexOf(id)]);
  if (!row || total <= 0) {
    return { ids: groups, counts: country.counts, split: false };
  }
  const parts = row.map((n) => (christians * n) / total);
  return { ids: [...TRADITION_IDS, ...ids], counts: [...parts, ...others], split: true };
}

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

// Rows of the world panel: the group shares of world-composition.json with
// Christians replaced by the four traditions (their sum over all countries,
// as a share of the countries' total population).
export function worldRows(
  groups: { id: string; label: string; share: number }[],
  data: { groups: string[]; countries: { id: string; counts: number[]; total: number }[] },
) {
  const world = data.countries.reduce((sum, country) => sum + country.total, 0);
  const sums = new Map<string, number>();
  for (const country of data.countries) {
    const split = splitGroups(data.groups, country);
    if (!split.split) continue;
    split.ids.forEach((id, index) => { if (id in TRADITION_LABELS) sums.set(id, (sums.get(id) ?? 0) + split.counts[index]); });
  }
  const labels: Record<string, string> = { ...TRADITION_LABELS };
  return groups.flatMap((group) => group.id !== 'christians'
    ? [{ id: group.id, label: group.label, share: group.share }]
    : TRADITION_IDS.map((id) => ({ id, label: labels[id], share: ((sums.get(id) ?? 0) / world) * 100 })));
}
