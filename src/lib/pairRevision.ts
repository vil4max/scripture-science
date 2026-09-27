import type { CollectionEntry } from 'astro:content';

const replacements: Array<[string, string]> = [
  ['Боговоплощение сделало Бога изобразимым', 'Христа изображают по Его человечеству; Божественная сущность не изображается'],
  ['В православном богослужении — церковнославянский текст', 'В практике Русской Православной Церкви широко употребляется церковнославянский текст'],
  ['Незнание часа относят к человеческой природе.', 'Слова о незнании часа нельзя отделять от исповедания единой Ипостаси Христа в двух природах.'],
  ['православные читают эти места буквально и видят в них учение о бессмертной душе', 'Церковь видит в этих местах свидетельство продолжающейся жизни души, учитывая также образный язык притчи и Апокалипсиса'],
  ['На jw.org перечислены 11 человек, штаб-квартира в Уорике (США).', 'Состав этой группы публикуется организацией отдельно; её центр находится в Уорике (США).'],
  ['Большинство библеистов, в том числе православных, считают вставку поздней;', 'Текстологический вопрос о происхождении этого чтения отличен от вопроса о догмате;'],
  ['«Троицу» считают поздним названием того, что уже есть в Писании', 'термин «Троица» выражает веру, уже засвидетельствованную Писанием'],
];

/** Public edition; the migrated source remains byte-for-byte reproducible. */
export function revisePairTopic(topic: CollectionEntry<'topics'>): CollectionEntry<'topics'> {
  const revise = (value: string) => replacements.reduce((text, [from, to]) => text.replaceAll(from, to), value);
  return { ...topic, data: { ...topic.data,
    positions: Object.fromEntries(Object.entries(topic.data.positions).map(([id, position]) => [id, {
      ...position,
      thesis: topic.data.order === 10 && id === 'orthodoxy' ? 'Перевод проверяется по тексту и апостольскому исповеданию Церкви' : revise(position.thesis),
      points: position.points.map(point => ({ ...point, html: revise(point.html) })),
    }])),
    extras: revise(topic.data.extras).replaceAll('<b>Где спор:</b>', '<b>В чём отличие и православный ответ:</b>'),
  } };
}
