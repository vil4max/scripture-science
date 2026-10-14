// Every proof the site shows, grouped by URL for the source pages: the index
// (sources/) reads the topic and tradition views, the filterable catalogue
// (sources/catalog/) lists them all (site audit 2026-10-10, S3-2, S4-1, S4-6).
import { getCollection } from 'astro:content';
import { assessments } from './orthodox';
import { getFamilies } from './families';
import { buildSourceCatalog, collectAnalysisSources, collectProofs, sourceAnchor, type CatalogEntry, type CatalogRecord } from './sourceCatalog';
import { getAnalyses } from './analysis';
import { getDisputes, getOrderedMatrix, getOrderedViews, getTerms } from './content';
import countries from '../data/world-countries.json';
import hierarchy from '../data/world-hierarchy-2026.json';
import history from '../data/history-overview.json';
import biblical from '../data/biblical-timeline.json';
import otherTraditions from '../data/other-traditions.json';
import world from '../data/world-composition.json';
import lineage from '../data/lineage.json';
import bible from '../data/bible-guide.json';
import overview from '../data/family-overview.json';

let cached: Promise<CatalogEntry[]> | undefined;

export function getSiteSourceCatalog(): Promise<CatalogEntry[]> {
  cached ??= build();
  return cached;
}

async function build(): Promise<CatalogEntry[]> {
  const traditions = await getOrderedMatrix();
  const namesById = new Map(traditions.map((entry) => [entry.id, entry.data.name]));
  const views = await getOrderedViews();
  const disputes = await getDisputes();
  const terms = await getTerms();
  const analyses = (await getAnalyses()).map((entry) => entry.data);

  // Keep claim attribution before grouping by URL and deduplicating complete proof tuples.
  const raw: CatalogRecord[] = collectAnalysisSources(analyses, namesById);
  raw.push({ proof: countries.proof as CatalogRecord['proof'], usage: { section: 'Карта религиозной принадлежности' } });

  for (const tradition of traditions) {
    const t = tradition.data;
    const traditionName = t.name;
    for (const p of t.since.proof) raw.push({ proof: p, usage: { traditionId: tradition.id, traditionName, section: 'с …' } });
    for (const p of t.scripture.proof) raw.push({ proof: p, usage: { traditionId: tradition.id, traditionName, section: 'Писание' } });
    for (const p of t.adherents.proof) raw.push({ proof: p, usage: { traditionId: tradition.id, traditionName, section: 'Численность' } });
    for (const p of t.self_view.proof) raw.push({ proof: p, usage: { traditionId: tradition.id, traditionName, section: 'Сама о себе' } });
    for (const position of t.positions) {
      for (const p of collectProofs(position)) {
        raw.push({ proof: p, usage: { traditionId: tradition.id, traditionName, topic: position.topic, section: 'Сравнение' } });
      }
    }
  }

  for (const view of views) {
    for (const doc of view.data.documents) {
      for (const p of collectProofs(doc)) {
        raw.push({ proof: p, usage: { traditionId: view.id, traditionName: view.data.tradition, section: `взгляд на: ${doc.about.join(', ')}` } });
      }
    }
  }

  for (const dispute of disputes) {
    for (const part of [...dispute.data.challenges, ...dispute.data.answers]) {
      const traditionName = namesById.get(part.tradition);
      for (const p of collectProofs(part)) {
        raw.push({ proof: p, usage: { traditionId: part.tradition, traditionName, topic: dispute.data.topic, section: `спорный вопрос «${dispute.data.title}»` } });
      }
    }
  }

  for (const term of terms) {
    for (const p of term.data.proof) raw.push({ proof: p, usage: { section: `термин «${term.data.term}»` } });
  }

  for (const family of getFamilies()) {
    for (const proof of family.proof) raw.push({ proof, usage: { traditionId: family.tradition, traditionName: namesById.get(family.tradition), section: 'Классификация' } });
  }
  for (const [section, data] of [
    ['Библейская линия: выбранная хронология', biblical], ['Авраамические религии', overview], ['Вводная история', history], ['Другие традиции', otherTraditions],
    ['Библия', bible],
    ['Население мира', world], ['Религии и конфессии, оценка 2026', hierarchy], ['Подробная хронология', lineage],
  ] as const) {
    for (const proof of collectProofs(data)) raw.push({ proof, usage: { section } });
  }

  for (const record of assessments) {
    for (const [role, proofs] of [['tradition', record.positionProof], ['answer', record.proof]] as const) {
      for (const proof of collectProofs(proofs)) raw.push({ proof, usage: {
        traditionId: record.tradition, traditionName: namesById.get(record.tradition), topic: record.topic, section: 'Православная оценка', role,
      } });
    }
  }

  // The comparison's own questions, the worship page, the full prayers and
  // the basics carry evidence too (S4-1).
  for (const entry of await getCollection('extraQuestions')) {
    const section = `вопрос «${entry.data.question}»`;
    for (const proof of entry.data.orthodox.proof) raw.push({ proof, usage: { traditionId: 'orthodoxy', traditionName: namesById.get('orthodoxy'), section, role: 'church' } });
    for (const [tradition, side] of Object.entries(entry.data.traditions)) {
      for (const proof of side.proof) raw.push({ proof, usage: { traditionId: tradition, traditionName: namesById.get(tradition), section } });
    }
  }
  for (const prayer of await getCollection('prayers')) {
    for (const proof of collectProofs(prayer.data)) raw.push({ proof, usage: { section: `молитва «${prayer.data.title}»` } });
  }
  for (const part of await getCollection('basics')) {
    for (const proof of part.data.proof) raw.push({ proof, usage: { section: `«С чего начать»: ${part.data.title}` } });
  }

  const entries = buildSourceCatalog(raw);
  if (new Set(entries.map((entry) => sourceAnchor(entry.url))).size !== entries.length) throw new Error('Duplicate source anchor');
  return entries;
}
