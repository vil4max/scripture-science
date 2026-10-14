// One label per catalogue entry: the work's name without passage numbers,
// taken from its most frequent title (site audit 2026-10-10, S4-2).
export function catalogLabel(proofs: { title: string }[]): string {
  const counts = new Map<string, number>();
  for (const { title } of proofs) {
    const base = title.replace(/,?\s*§{1,2}\s*\d[\s\S]*$/, '').replace(/[,;\s]+$/, '').trim() || title;
    counts.set(base, (counts.get(base) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)[0][0];
}

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

// «2026-10-01» (or a parsed date) → «1 октября 2026» (S4-16).
export function formatAccessed(value: string | Date): string {
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
  const [year, month, day] = iso.split('-').map(Number);
  return month ? `${day} ${MONTHS[month - 1]} ${year}` : iso;
}

// Several access dates of one source, sorted and without repeats.
export function accessedRange(values: (string | Date)[]): string {
  const days = [...new Set(values.map((value) => (value instanceof Date ? value.toISOString() : String(value)).slice(0, 10)))].sort();
  return days.length > 1 ? `${formatAccessed(days[0])} — ${formatAccessed(days.at(-1)!)}` : formatAccessed(days[0]);
}
