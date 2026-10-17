// The printed book «Homo religiosus» (docs/tasks/site-m37-korytko-book.md):
// its proofs point at the site's own page for the book, which carries the
// bibliographic record, and name the chapter and page in the title.
export const BOOK_PATH = 'books/homo-religiosus/';
export const BOOK_URL = `https://vil4max.github.io/scripture-science/${BOOK_PATH}`;
export const BOOK_TITLE = 'Прот. Олег Корытко. Homo religiosus: на путях поиска истины (2017)';

export interface BookLocator { chapter: string; page: number; }

// The themes a religion's points are grouped under once there are many (M38).
export const BOOK_POINT_KINDS = {
  history: 'История',
  texts: 'Священные книги и тексты',
  practice: 'Обычаи и практика',
  currents: 'Направления и школы',
  teaching: 'Учение в изложении автора',
  bible: 'Связи с Библией и христианской историей',
  russia: 'В России',
} as const;
export type BookPointKind = keyof typeof BOOK_POINT_KINDS;

// The preface and the conclusion are not numbered chapters.
const PARTS: Record<string, string> = { 'от автора': 'preface', 'заключение': 'conclusion' };

/** «…, гл. XXIII, с. 695» → { chapter: 'XXIII', page: 695 }; «…, от автора, с. 5» → 'preface'. */
export function bookLocator(title: string): BookLocator | undefined {
  const match = title.match(/, (?:гл\. ([IVXLC]+)|(от автора|заключение)), с\. (\d+)$/);
  return match ? { chapter: match[1] ?? PARTS[match[2]], page: Number(match[3]) } : undefined;
}

/** The title of a proof from page `page` of chapter `chapter` (a numeral, 'preface' or 'conclusion'). */
export function bookProofTitle(chapter: string, page: number): string {
  const part = Object.entries(PARTS).find(([, key]) => key === chapter)?.[0] ?? `гл. ${chapter}`;
  return `${BOOK_TITLE}, ${part}, с. ${page}`;
}
