export interface ProfileSource {
  url: string;
  title: string;
  tier?: 'official' | 'reference' | 'news';
}

export function profileSources(citations: ProfileSource[], catalog: ProfileSource[]) {
  const byUrl = new Map<string, { url: string; title: string; tiers: NonNullable<ProfileSource['tier']>[] }>();
  const metadata = new Map(catalog.map((source) => [source.url, source]));
  for (const source of citations) {
    const known = source.tier ? source : metadata.get(source.url) ?? source;
    const entry = byUrl.get(source.url) ?? { url: source.url, title: known.title, tiers: [] };
    if (known.tier && !entry.tiers.includes(known.tier)) entry.tiers.push(known.tier);
    byUrl.set(source.url, entry);
  }
  return [...byUrl.values()].sort((a, b) => a.title.localeCompare(b.title, 'ru'));
}
