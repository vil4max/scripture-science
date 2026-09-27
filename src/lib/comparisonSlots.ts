import { TRADITION_IDS } from './rules.ts';
import { DEFAULT_SELECTION, parseSelection } from './selection.ts';
export const SLOT_PARAM = 'slots';

function filledSlots(selected: string[], preferred: string[] = []): string[] {
  const slots = ['orthodoxy', preferred[1] ?? '', preferred[2] ?? ''];
  const candidates = [...selected, ...DEFAULT_SELECTION, ...TRADITION_IDS];
  for (let index = 1; index < slots.length; index += 1) {
    if (slots[index]) continue;
    slots[index] = candidates.find(id => id !== 'orthodoxy' && !slots.includes(id)) ?? '';
  }
  return slots;
}

export function comparisonSlots(ids: string[], raw: string | null): string[] {
  const selected = parseSelection(ids.join(','));
  const fallback = filledSlots(selected);
  if (raw === null) return fallback;
  const slots = raw.split(',');
  if (slots.length !== 3 || slots[0] !== 'orthodoxy' || slots.some(id => id && !TRADITION_IDS.some(known => known === id))) return fallback;
  const populated = slots.filter(Boolean);
  if (new Set(populated).size !== populated.length || populated.some(id => !selected.includes(id))) return fallback;
  return filledSlots(selected, slots);
}
export function replaceComparisonSlot(slots: string[], index: number, id: string): string[] {
  if (index < 1 || index > 2 || !Number.isInteger(index)) return slots;
  if (!id || !TRADITION_IDS.some(known => known === id) || slots.some((value, i) => i !== index && value === id)) return slots;
  return slots.map((value, i) => i === index ? id : value);
}
