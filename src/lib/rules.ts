// Pure rule functions for the comparison data model. No astro:* imports, so
// these run directly under Node's stripped-types execution (see
// scripts/test-rules.test.ts and scripts/matrix.test.ts) as well as inside
// the Astro build.

// The eight traditions the site compares (docs/tasks/site-m3-matrix-content.md).
// A matrix file whose `id` is outside this set fails `z.enum` in
// src/content.config.ts, which is what makes an unknown tradition id fail
// the build.
export const TRADITION_IDS = [
  'judaism',
  'orthodoxy',
  'catholicism',
  'islam',
  'protestantism',
  'lds',
  'adventism',
  'jw',
] as const;

export type TraditionId = (typeof TRADITION_IDS)[number];

// The comparison topics, in the order docs/tasks/site-m3-matrix-content.md
// requires every matrix file to use.
export const TOPIC_ORDER = [
  'god',
  'name-of-god',
  'jesus',
  'spirit',
  'scripture',
  'authority',
  'salvation',
  'afterlife',
  'end-times',
  'worship',
  'images',
  'holy-days',
  'fasting',
  'organisation',
  'rules',
] as const;

export type TopicId = (typeof TOPIC_ORDER)[number];

export const TOPIC_INTROS: Partial<Record<TopicId, string>> = {
  spirit: 'Христианский вопрос о Святом Духе; рядом — понимание духа Божия в других традициях.',
  images: 'Иконы, священные изображения и отношение к ним в богослужении.',
  scripture: 'Какие книги признаются священными. Канон — их перечень; перевод — передача текста на другом языке.',
};

export const TOPIC_GROUPS = [
  { id: 'revelation', title: 'Бог и откровение', topics: TOPIC_ORDER.slice(0, 6) },
  { id: 'human', title: 'Человек и спасение', topics: TOPIC_ORDER.slice(6, 9) },
  { id: 'life', title: 'Религиозная жизнь', topics: TOPIC_ORDER.slice(9) },
];


// Labels of the unity mark on a position or a dispute part
// (docs/tasks/site-m20-unity-marks.md).
export const UNITY_LABEL_RU = {
  shared: 'Общая позиция традиции',
  divided: 'Единого мнения нет',
} as const;

// Russian titles for the topics: the fourteen of
// docs/tasks/site-m3-matrix-content.md plus «Пост и аскетика», split off
// from the special rules (owner, 2026-09-26; docs/tasks/site-m18-fasting.md).
export const TOPIC_TITLES_RU: Record<TopicId, string> = {
  god: 'Бог',
  'name-of-god': 'Имя Бога',
  jesus: 'Иисус Христос, пророки, Мессия',
  spirit: 'Святой Дух (дух Божий)',
  scripture: 'Писание и канон',
  authority: 'Предание и толкование',
  salvation: 'Спасение',
  afterlife: 'Душа, смерть и посмертие',
  'end-times': 'Конец времён',
  worship: 'Богослужение и обряды',
  images: 'Иконы',
  'holy-days': 'Праздники',
  fasting: 'Пост и аскетика',
  organisation: 'Устройство и духовенство',
  rules: 'Особые правила (пища, кровь, армия, государство)',
};

/**
 * docs/tasks/site-m3-matrix-content.md: every matrix file must carry all
 * comparison topics, in this exact order. Throwing here (rather than sorting
 * or padding silently) is what fails `npm run build` on a matrix file that
 * skips, reorders or duplicates a topic.
 */
export function checkMatrixTopicOrder(topicIds: readonly string[]): void {
  if (topicIds.length !== TOPIC_ORDER.length) {
    throw new Error(
      `Matrix file has ${topicIds.length} topics, expected all ${TOPIC_ORDER.length}: ${TOPIC_ORDER.join(', ')}`,
    );
  }
  for (let i = 0; i < TOPIC_ORDER.length; i++) {
    if (topicIds[i] !== TOPIC_ORDER[i]) {
      throw new Error(
        `Matrix file topic ${i + 1} is "${topicIds[i]}", expected "${TOPIC_ORDER[i]}" (docs/tasks/site-m3-matrix-content.md order)`,
      );
    }
  }
}

// docs/tasks/site-m5-reading-polish.md W3 "Colours": the home page's reading
// layout uses one shared `--t-*` accent per tradition, including Orthodoxy
// and Jehovah's Witnesses, which otherwise carry the pair page's own legacy
// `--o`/`--j` tokens (src/data/traditions.yaml, src/styles/orthodoxy-jw.css) -
// tokens the home page's layout never loads, so a chip using them renders
// empty (Problems seen #4). The pair page keeps using `traditions.yaml`'s own
// `color` field untouched; only home-page callers (src/pages/index.astro,
// src/pages/sources.astro) should build their `colorById` map from this
// canonical table instead.
export const TRADITION_COLOR_TOKEN: Record<TraditionId, string> = {
  judaism: '--t-judaism',
  orthodoxy: '--t-orthodoxy',
  catholicism: '--t-catholicism',
  islam: '--t-islam',
  protestantism: '--t-protestantism',
  lds: '--t-lds',
  adventism: '--t-adventism',
  jw: '--t-jw',
};

// A tradition's `since.label` may hold several dated steps separated by
// "; " (Orthodoxy and Catholicism: Pentecost, then the 1054 separation from
// each other); pages show one step per line. The owner, 2026-09-26:
// Orthodoxy is the undivided Church until the Great Schism, so the first
// line is its start, not a label "separate church since 1054".
export function sinceLines(label: string): string[] {
  return label.split('; ').map((line) => line.trim()).filter(Boolean);
}

export interface TraditionForOrdering {
  since: { year: number };
  // Used to break a tie in `since.year` that has its own documented answer
  // (see EAST_BEFORE_WEST_TIE below); optional so a caller without full
  // matrix data still sorts, just without that answer.
  id?: string;
  // Russian name used to break a tie `id` does not resolve
  // (docs/tasks/site-m2-main-page.md W1: "ties break by Russian name
  // (localeCompare('ru'))"). Optional so a caller without a name yet (or
  // without full matrix data - see src/lib/content.ts) falls back to a
  // stable sort instead of an invented order.
  name?: string;
}

// EDITORIAL.md principle 2 says only "the older one comes first" - silent on
// an exact tie. Orthodoxy and Catholicism tie at 33 (both continue the
// undivided Church of that year) and split from each other at 1054, neither
// preceding the other; the plain Russian-name tie-break happened to read as
// a seniority claim the data does not support («Католичество» before
// «Православие» merely alphabetically). On this one known tie, the Eastern
// side comes first, as accounts of the Schism themselves order it (owner,
// 2026-09-26: «восточная перед западной»); any other tie still falls back
// to the Russian name.
const EAST_BEFORE_WEST_TIE: Record<string, number> = { orthodoxy: 0, catholicism: 1 };

/**
 * EDITORIAL.md principle 2: wherever traditions stand side by side, the
 * older one comes first. Never hard-code an order in a component - always
 * derive it from `since.year` (and, on a tie, `name`) through this function.
 *
 * Age is the start of a tradition's historical line (docs/DECISIONS.md,
 * "Order traditions by the start of their line"): Orthodoxy and Catholicism
 * both continue the undivided Church of about 33, so they tie there and come
 * before Islam, although each is a separate church only from 1054.
 */
export function orderByAge<T extends TraditionForOrdering>(traditions: T[]): T[] {
  return [...traditions].sort((a, b) => {
    if (a.since.year !== b.since.year) return a.since.year - b.since.year;
    const aTie = a.id !== undefined ? EAST_BEFORE_WEST_TIE[a.id] : undefined;
    const bTie = b.id !== undefined ? EAST_BEFORE_WEST_TIE[b.id] : undefined;
    if (aTie !== undefined && bTie !== undefined) return aTie - bTie;
    if (a.name !== undefined && b.name !== undefined) return a.name.localeCompare(b.name, 'ru');
    return 0;
  });
}

export interface PositionForSummary {
  status: 'verified' | 'todo';
  summary: string;
}

/**
 * docs/tasks/site-m5-reading-polish.md W3: a `todo` position's `summary`
 * field is where a content writer's internal research note lives until the
 * source is confirmed (e.g. src/data/matrix/lds.yaml: "Требует проверки:
 * страница-источник не открылась в этой сессии (см. поле todo).") - never
 * meant to reach a reader. Every renderer of a position must call this
 * instead of reading `summary` directly: it returns `null` for a `todo`
 * position (the caller then shows only the neutral "Источник уточняется"
 * flag) and the summary text for a verified one.
 */
export function positionSummaryText(position: PositionForSummary): string | null {
  return position.status === 'todo' ? null : position.summary;
}

export interface TopicForCheck {
  title: string;
  positions: Record<string, unknown>;
}

/**
 * A topic must carry a position for every tradition being compared, and
 * name no tradition outside that set. Throwing here (rather than silently
 * dropping a side) is what makes a missing position fail `npm run build`.
 */
export function checkTopic(topic: TopicForCheck, traditionIds: string[]): void {
  const positionIds = Object.keys(topic.positions);
  for (const id of traditionIds) {
    if (!positionIds.includes(id)) {
      throw new Error(`Topic "${topic.title}" is missing a position for tradition "${id}"`);
    }
  }
  for (const id of positionIds) {
    if (!traditionIds.includes(id)) {
      throw new Error(`Topic "${topic.title}" names unknown tradition "${id}"`);
    }
  }
}
