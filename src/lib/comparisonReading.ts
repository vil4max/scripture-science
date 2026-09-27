import { TOPIC_ORDER } from './rules.ts';
export function readingState(search: string, hash = '') {
  const params = new URLSearchParams(search);
  const hashTopic = hash.startsWith('#topic-') ? hash.slice(7) : '';
  const requested = TOPIC_ORDER.some((id) => id === hashTopic) ? hashTopic : params.get('topic') || '';
  return {
    topic: TOPIC_ORDER.some((id) => id === requested) ? requested : '',
  };
}
export function readingUrl(href: string, topic: string, hash?: string) {
  const url = new URL(href);
  url.searchParams.delete('mode');
  url.searchParams.delete('topic');
  if (hash !== undefined) url.hash = hash;
  else if (!url.hash && TOPIC_ORDER.some((id) => id === topic)) url.hash = `topic-${topic}`;
  return url.href;
}
