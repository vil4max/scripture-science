import { getCollection } from 'astro:content';
import { withBase } from './paths';
import { TOPIC_TITLES_RU, type TopicId } from './rules';

// Each tradition's profile (/traditions/<id>/; Orthodoxy's is /orthodoxy/) is its detailed page: curated
// analysis cards where src/data/analyses/<id>.yaml exists, otherwise the
// topic-by-topic positions with their evidence. The comparison keeps theses
// and links here (owner, 2026-10-01; docs/tasks/site-m33-jw-analysis.md).
export async function getAnalyses() {
  return getCollection('analyses');
}

export function hasAnalysisPage(tradition: string) {
  return tradition !== 'orthodoxy';
}

export function profileHref(tradition: string, anchor = '') {
  const path = tradition === 'orthodoxy' ? 'orthodoxy/' : `traditions/${tradition}/`;
  return withBase(`${path}${anchor ? `#${anchor}` : ''}`);
}

// Links a comparison topic gives to the tradition's profile, in page order.
export async function analysisCardsForTopic(tradition: string, topic: string) {
  if (!hasAnalysisPage(tradition)) return [];
  const curated = (await getAnalyses()).find((entry) => entry.data.tradition === tradition);
  if (!curated) {
    return [{ id: `topic-${topic}`, title: TOPIC_TITLES_RU[topic as TopicId], href: profileHref(tradition, `topic-${topic}`) }];
  }
  return curated.data.groups
    .flatMap((group) => group.cards)
    .filter((card) => card.topic === topic)
    .map((card) => ({ id: card.id, title: card.title, href: profileHref(tradition, card.id) }));
}
