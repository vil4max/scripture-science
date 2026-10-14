// Display-only typography for data strings; the stored text stays as the
// sources and editors wrote it (site audit 2026-10-10, T4-4 and T4-16).

const NBSP = ' ';

// An excerpt the page wraps in «» shows its own quotation marks as „“.
// Converted one by one, so a truncated excerpt with an unclosed mark works.
export function innerQuotes(text: string): string {
  return text.replace(/«/g, '„').replace(/»/g, '“');
}

// Keeps short pieces on one line on a phone: era marks, a number with its
// unit, a numbered Bible book, a paragraph sign and the dash after a word.
export function nbsp(text: string): string {
  return text
    .replace(/Р\. Х\./g, `Р.${NBSP}Х.`)
    .replace(/С\. М\./g, `С.${NBSP}М.`)
    .replace(/(\d) (гг?\.|вв?\.|млн|тыс\.)/g, `$1${NBSP}$2`)
    .replace(/(^|[\s(«])([1-4]) (?=[А-ЯЁ][а-яё]{1,4} \d)/g, `$1$2${NBSP}`)
    .replace(/(§§?) (?=\d)/g, `$1${NBSP}`)
    .replace(/(\S) — /g, `$1${NBSP}— `);
}
