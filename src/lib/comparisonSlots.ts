import { TRADITION_IDS } from './rules.ts';
import { parseSelection } from './selection.ts';
export const SLOT_PARAM = 'slots';
export function comparisonSlots(ids: string[], raw: string | null): string[] {
  const selected = parseSelection(ids.join(','));
  const fallback = ['orthodoxy', selected[1] ?? '', selected[2] ?? ''];
  if (raw === null) return fallback;
  const slots = raw.split(',');
  if (slots.length !== 3 || slots[0] !== 'orthodoxy' || slots.some(id => id && !TRADITION_IDS.some(known => known === id))) return fallback;
  const populated = slots.filter(Boolean);
  return new Set(populated).size === populated.length && populated.join(',') === selected.join(',') ? slots : fallback;
}
export function replaceComparisonSlot(slots: string[], index: number, id: string): string[] {
  if (index < 1 || index > 2 || !Number.isInteger(index)) return slots;
  if (id && (!TRADITION_IDS.some(known => known === id) || slots.some((value, i) => i !== index && value === id))) return slots;
  return slots.map((value, i) => i === index ? id : value);
}
