// The Nicene-Constantinopolitan Creed as the key to the Orthodox side of the
// comparison (owner, 2026-10-09): the short confession of the Orthodox faith,
// quoted per question from Filaret's catechism, §67.
import creed from '../data/creed.json' with { type: 'json' };
import { TOPIC_ORDER, type TopicId } from './rules.ts';

export interface CreedArticle { n: number; text: string }

export const CREED_SOURCE = creed.source;
export const CREED_ARTICLES: CreedArticle[] = creed.articles;
const TOPIC_ARTICLES = creed.topics as Partial<Record<TopicId, number[]>>;

/**
 * The comparison's first part follows the Creed (owner, 2026-10-09): its
 * questions in Creed order, then «Другие различия» — the topics outside it.
 */
export const CREED_TOPICS = Object.keys(TOPIC_ARTICLES) as TopicId[];
export const OTHER_TOPICS = TOPIC_ORDER.filter((topic) => !CREED_TOPICS.includes(topic));

// Questions outside the fifteen topics that the Creed names, e.g. the
// Theotokos in article 3 («и Марии Девы»).
const EXTRA_ARTICLES = creed.extras as Record<string, number[]>;

/**
 * Where those questions stand in the Creed part (owner, 2026-10-09): the
 * Theotokos after Jesus Christ, the names of the Church and the other
 * communities after the Church, Baptism — a like rite with a different
 * meaning — after the Sacraments. Each appears once its entry exists in
 * src/data/extra-questions.yaml.
 */
export const CREED_EXTRAS_AFTER: Partial<Record<TopicId, string[]>> = {
  jesus: ['theotokos'],
  organisation: ['church-names'],
  worship: ['baptism'],
};

/** The Creed articles a comparison question rests on; none for practice-only topics. */
export function creedArticlesFor(question: TopicId | string): CreedArticle[] {
  const numbers = TOPIC_ARTICLES[question as TopicId] ?? EXTRA_ARTICLES[question] ?? [];
  return numbers.map((n) => {
    const article = CREED_ARTICLES.find((item) => item.n === n);
    if (!article) throw new Error(`Unknown Creed article ${n} for ${question}`);
    return article;
  });
}

