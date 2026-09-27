import assessments from '../data/orthodox-assessments.json' with { type: 'json' };
import { TOPIC_ORDER, TRADITION_IDS } from './rules.ts';

export function validateAssessments(records: typeof assessments): void {
  const expected = TRADITION_IDS.filter(id => id !== 'orthodoxy').flatMap(id => TOPIC_ORDER.map(topic => `${id}:${topic}`));
  if (records.length !== expected.length || new Set(records.map(record => record.id)).size !== expected.length) throw new Error('Expected 105 unique Orthodox assessments');
  for (const id of expected) {
    const record = records.find(record => record.id === id);
    if (!record || record.id !== `${record.tradition}:${record.topic}` || !record.difference.trim() || !record.response.trim() || !record.authority || !record.proof.length || !record.positionProof.length) throw new Error(`Incomplete assessment: ${id}`);
    for (const source of [...record.proof, ...record.positionProof]) if (!/^https?:\/\//.test(source.url) || !source.title || !source.excerpt || !source.accessed) throw new Error(`Missing evidence: ${id}`);
  }
}
validateAssessments(assessments);
export function orthodoxAssessment(tradition: string, topic: string) {
  return assessments.find(record => record.tradition === tradition && record.topic === topic);
}
export { assessments };
