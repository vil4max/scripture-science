export function citationTitle(proofs: { title: string }[]) {
  const pattern = /§{1,2}\s*(\d+(?:\s*[–—-]\s*\d+)?(?:\s*,\s*\d+(?:\s*[–—-]\s*\d+)?)*)/g;
  const groups = new Map<string, string[]>();
  for (const { title } of proofs) {
    const numbers = [...title.matchAll(pattern)].flatMap((match) => match[1].split(/\s*,\s*/));
    const base = title.replace(pattern, '').replace(/[,;\s]+$/, '').trim();
    groups.set(base, [...new Set([...(groups.get(base) ?? []), ...numbers])]);
  }
  return [...groups].map(([title, numbers]) => `${title}${numbers.length ? ` §${numbers.join(', ')}` : ''}`).join(' · ');
}
