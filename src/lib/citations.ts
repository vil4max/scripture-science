export interface Citation {
  url: string;
  title: string;
  tier?: 'official' | 'reference' | 'news';
  excerpt?: string;
  accessed?: string;
}

export class Citations {
  entries: { number: number; url: string; proofs: Citation[]; references: string[] }[] = [];

  add(proof: Citation, reference = true) {
    let entry = this.entries.find((item) => item.url === proof.url);
    if (!entry) {
      entry = { number: this.entries.length + 1, url: proof.url, proofs: [], references: [] };
      this.entries.push(entry);
    }
    if (!entry.proofs.some((item) => JSON.stringify(item) === JSON.stringify(proof))) entry.proofs.push(proof);
    const id = `citation-${entry.number}-${entry.references.length + 1}`;
    if (reference) entry.references.push(id);
    return { number: entry.number, id };
  }
}

// Locals belong to one rendered page; a module-global registry would mix pages.
export function citationsFor(locals: { citations?: Citations }) {
  return locals.citations ??= new Citations();
}

export function citationTitle(proofs: Citation[]) {
  const pattern = /§{1,2}\s*(\d+(?:\s*[–—-]\s*\d+)?(?:\s*,\s*\d+(?:\s*[–—-]\s*\d+)?)*)/g;
  const groups = new Map<string, string[]>();
  for (const { title } of proofs) {
    const numbers = [...title.matchAll(pattern)].flatMap((match) => match[1].split(/\s*,\s*/));
    const base = title.replace(pattern, '').replace(/[,;\s]+$/, '').trim();
    groups.set(base, [...new Set([...(groups.get(base) ?? []), ...numbers])]);
  }
  return [...groups].map(([title, numbers]) => `${title}${numbers.length ? ` §${numbers.join(', ')}` : ''}`).join(' · ');
}
