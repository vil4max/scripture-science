import { TOPIC_ORDER } from './rules.ts';
export type ReadingMode = 'brief' | 'detail';
export function readingState(search: string, hash = '') {
  const params = new URLSearchParams(search);
  const hashTopic = hash.startsWith('#topic-') ? hash.slice(7) : '';
  const requested = TOPIC_ORDER.some((id) => id === hashTopic) ? hashTopic : params.get('topic') || '';
  return {
    mode: (params.get('mode') === 'detail' ? 'detail' : 'brief') as ReadingMode,
    topic: TOPIC_ORDER.some((id) => id === requested) ? requested : '',
  };
}
export function readingUrl(href: string, mode: ReadingMode, topic: string, hash?: string) {
  const url = new URL(href);
  url.searchParams.set('mode', mode);
  if (TOPIC_ORDER.some((id) => id === topic)) url.searchParams.set('topic', topic);
  else url.searchParams.delete('topic');
  if (hash !== undefined) url.hash = hash;
  return url.href;
}
