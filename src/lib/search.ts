export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ru').replaceAll('ё', 'е');
}

export function searchWords(query: string): string[] {
  return normalizeSearch(query).match(/[\p{L}\p{N}]+/gu)?.map((word) =>
    word.length > 4 ? word.replace(/(ами|ями|ого|ему|ыми|ими|ий|ый|ая|ое|ие|ые|ой|ей|ам|ям|ах|ях|ом|ем|ую|юю|ы|и|а|я|у|ю|е|о)$/, '') : word,
  ) ?? [];
}

export function matchesSearch(text: string, query: string): boolean {
  const normalized = normalizeSearch(text);
  return searchWords(query).every((word) => normalized.includes(word));
}
