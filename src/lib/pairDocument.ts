import { getCollection } from 'astro:content';
import correctionsData from '../data/corrections-orthodoxy-jw.json';
import { createArchiveLinker } from './archive-links';
import { getCheckedTopics, getOrderedTraditions, getSection } from './content';
import { createCorrector, parseCorrections } from './corrections';

// Both presentations use the same corrected content; the archive keeps its fidelity gate.
export async function getPairDocument() {
  const traditionIds = ['orthodoxy', 'jw'];

  const traditions = await getOrderedTraditions(traditionIds);
  const topics = await getCheckedTopics(traditionIds);

  const sectionIds = [
    'history',
    'sources',
    'common',
    'theology',
    'literature',
    'structure',
    'dynamics',
    'summary',
    'glossary',
    'refs',
  ] as const;
  const [nav, header, ...sections] = await Promise.all(
    ['nav', 'header', ...sectionIds].map((id) => getSection(id)),
  );

  // docs/tasks/site-m7-pair-corrections.md: facts that verification found
  // outdated are corrected visibly at render time, never written back into the
  // migrated data files, which stay reproducible by scripts/migrate_source.py.
  // Every migrated string passes through the corrector - HTML fragments get the
  // marks, plain-text fields are only checked - so the build fails unless each
  // correction's text occurs exactly once in the whole document.
  const corrections = parseCorrections(correctionsData);
  const corrector = createCorrector(corrections);
  const navHtml = corrector.html(nav.data.html);
  const headerHtml = corrector.html(header.data.html);
  const toArchive = createArchiveLinker((await getCollection('sources')).map((s) => s.data));
  const sectionHtml = Object.fromEntries(
    sections.map((s) => [s.id, toArchive(corrector.html(s.data.html))]),
  );
  const correctedTopics = topics.map((topic) => ({
    ...topic,
    data: {
      ...topic.data,
      title: corrector.text(topic.data.title),
      positions: Object.fromEntries(
        Object.entries(topic.data.positions).map(([id, position]) => [
          id,
          {
            ...position,
            label: corrector.text(position.label),
            thesis: corrector.text(position.thesis),
            points: position.points.map((point) => ({
              ...point,
              ref: point.ref && corrector.text(point.ref),
              html: corrector.html(point.html),
            })),
          },
        ]),
      ),
      extras: corrector.html(topic.data.extras),
    },
  }));
  corrector.assertEachAppliedOnce();

  return { traditions, correctedTopics, sectionHtml, corrections, navHtml, headerHtml };
}
