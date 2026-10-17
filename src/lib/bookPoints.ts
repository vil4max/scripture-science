// The points the book «Homo religiosus» adds to each religion or history row:
// one file per tradition in src/data/book-points/ (docs/tasks/site-m38-korytko-integration.md).
import type { BookPointKind } from './book';
import type { CatalogProof } from './sourceCatalog';

export interface BookPoint {
  tradition: string;
  kind: BookPointKind;
  text: string;
  proof: CatalogProof[];
}

const files = import.meta.glob<BookPoint[]>('../data/book-points/*.json', { eager: true, import: 'default' });
export const BOOK_POINTS: BookPoint[] = Object.values(files).flat();
