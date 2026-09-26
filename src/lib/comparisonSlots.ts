import { TRADITION_IDS } from './rules.ts';
export const SLOT_PARAM = 'slots';
export function comparisonSlots(ids: string[], raw: string | null): string[] {
  const fallback = [ids[0] ?? '', ids[1] ?? '', ids[2] ?? ''];
  if (raw === null) return fallback;
  const slots = raw.split(',');
  if (slots.length !== 3 || slots.some((id) => id && !TRADITION_IDS.some((known) => known === id))) return fallback;
  const selected = slots.filter(Boolean);
  return new Set(selected).size === selected.length && selected.join(',') === ids.join(',') ? slots : fallback;
}
export function replaceComparisonSlot(slots: string[], index: number, id: string): string[] {
  if (index < 0 || index > 2 || !Number.isInteger(index)) return slots;
  if (id && (!TRADITION_IDS.some((known) => known === id) || slots.some((value, i) => i !== index && value === id))) return slots;
  return slots.map((value, i) => i === index ? id : value);
}
